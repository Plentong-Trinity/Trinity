"use client"

import React from "react"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/for-referencing/mode-toggle"
import { getRoleFromToken, hasToken, isTokenExpired, removeToken } from "@/lib/auth"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"
  const navRef = useRef<HTMLElement | null>(null)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const updateHeight = () => {
      if (navRef.current) {
        const height = navRef.current.offsetHeight
        document.documentElement.style.setProperty("--navbar-height", `${height}px`)
      }
    }
    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const syncAuthState = () => {
      const tokenPresent = hasToken() && !isTokenExpired()
      setIsAuthenticated(tokenPresent)
      setUserRole(tokenPresent ? getRoleFromToken() : null)
    }

    syncAuthState()

    const onStorage = () => syncAuthState()
    const onAuthStateChanged = () => syncAuthState()

    window.addEventListener("storage", onStorage)
    window.addEventListener("auth-state-changed", onAuthStateChanged)

    return () => {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener("auth-state-changed", onAuthStateChanged)
    }
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    if (window.location.pathname !== "/") {
      window.location.href = `/#${sectionId}`
      return
    }
    const section = document.getElementById(sectionId)
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handleLogout = () => {
    removeToken()
    setIsAuthenticated(false)
    setUserRole(null)
    router.push("/login")
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHome ? (isScrolled ? "bg-background/90 backdrop-blur-md shadow-md" : "bg-transparent") : "bg-background shadow-md"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="#hero" className="flex items-center gap-2" onClick={(e) => scrollToSection(e, "hero")}>
          <div className="relative w-8 h-8">
            <Image src="/Images/ikun.jpg" alt="Church Logo" width={32} height={32} className="object-contain" />
          </div>
          <span className="text-xl font-bold text-primary">Church of St. Joseph, Plentong</span>
        </Link>

        <div className={`hidden md:flex items-center gap-6 ${isHome ? (isScrolled ? "text-black" : "text-white") : "text-black"}`}>
          <NavLinks scrollToSection={scrollToSection} userRole={userRole} isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          <ModeToggle />
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <NavLinks scrollToSection={scrollToSection} mobile onClick={() => setIsMenuOpen(false)} userRole={userRole} isAuthenticated={isAuthenticated} onLogout={() => { setIsMenuOpen(false); handleLogout(); }} />
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLinks({ mobile = false, scrollToSection, onClick, userRole, isAuthenticated, onLogout }: { mobile?: boolean; scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void; onClick?: () => void; userRole?: string | null; isAuthenticated?: boolean; onLogout?: () => void }) {
  const linkClass = mobile ? "block py-2 text-foreground hover:text-primary transition-colors" : "px-2 py-1 text-foreground hover:text-primary transition-colors"

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const openDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setIsDropdownOpen(true)
  }

  const closeDropdown = () => {
    closeTimeoutRef.current = setTimeout(() => setIsDropdownOpen(false), 100)
  }

  return (
    <>
      <a href="#about" className={linkClass} onClick={(e) => { scrollToSection(e, "about"); onClick?.(); }}>
        About
      </a>
      <a href="#mass-schedule" className={linkClass} onClick={(e) => { scrollToSection(e, "mass-schedule"); onClick?.(); }}>
        Mass Schedule
      </a>
      <a href="#contact" className={linkClass} onClick={(e) => { scrollToSection(e, "contact"); onClick?.(); }}>
        Contact
      </a>
      <Link href="/bulletin" className={linkClass} onClick={onClick}>Bulletin</Link>

      <div onMouseLeave={closeDropdown}>
        <DropdownMenu modal={false} open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild onMouseEnter={openDropdown}>
            <div className={linkClass}>Room Booking</div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-40" align="start" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
            <DropdownMenuItem asChild onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
              <Link href="/overview" className={linkClass}>Overview</Link>
            </DropdownMenuItem>

            {isAuthenticated && (userRole === "user" || userRole === "admin") && (
              <DropdownMenuItem asChild onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
                <Link href="/room-booking" className={linkClass} onClick={onClick}>Booking</Link>
              </DropdownMenuItem>
            )}
            
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isAuthenticated && userRole === "admin" && (
        <Link href="/admin" className={linkClass} onClick={onClick}>Admin</Link>
      )}

      {isAuthenticated && userRole !== "admin" && (
        <Link href="/user-dashboard" className={linkClass} onClick={onClick}>{userRole}</Link>
      )}

      {!isAuthenticated ? (
        <Link href="/login" className={linkClass} onClick={onClick}>
          <button className={linkClass + " bg-primary text-white px-4 py-2 rounded-md hover:text-black hover:bg-red-200 transition-colors"}>Login</button>
        </Link>
      ) : null}
    </>
  )
}
