"use client"

import type React from "react"
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/for-referencing/mode-toggle"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname();
  const isHome = pathname === "/";
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const updateHeight = () => {
      if (navRef.current) {
        const height = navRef.current.offsetHeight
        document.documentElement.style.setProperty('--navbar-height', `${height}px`)
      }
    }

    updateHeight()

    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    if (window.location.pathname !== "/") {
      window.location.href = `/#${sectionId}`
      return
    }
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isHome
        ? isScrolled
        ? "bg-background/90 backdrop-blur-md shadow-md"
        : "bg-transparent"
        : "bg-background shadow-md"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="#hero" className="flex items-center gap-2" onClick={(e) => scrollToSection(e, "hero")}>
          <div className="relative w-8 h-8">
            <Image
              src="/Images/ikun.jpg"
              alt="Church Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold text-primary">Church of St. Joseph, Plentong</span>
        </Link>

        <div className={`hidden md:flex items-center gap-6 
        ${isHome 
          ? isScrolled 
            ?"text-black" 
            : "text-white"
          :"text-black"}`}>
          <NavLinks scrollToSection={scrollToSection} />
          <ModeToggle />
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <NavLinks scrollToSection={scrollToSection} mobile onClick={() => setIsMenuOpen(false)} />
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLinks({ mobile = false, scrollToSection, onClick }: { mobile?: boolean; scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void; onClick?: () => void }) {
  const linkClass = mobile
    ? "block py-2 text-foreground hover:text-primary transition-colors"
    : "hover:text-primary transition-colors"

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
      <a href="#about" className={`${linkClass}`} onClick={(e) => scrollToSection(e, "about")}>
        About
      </a>
      <a href="#mass-schedule" className={linkClass} onClick={(e) => scrollToSection(e, "mass-schedule")}>
        Mass Schedule
      </a>
      <a href="#contact" className={linkClass} onClick={(e) => scrollToSection(e, "contact")}>
        Contact
      </a>
      <a href="/bulletin" className={linkClass} onClick={onClick}>
        Bulletin
      </a>
      {/* <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen} >
        <DropdownMenuTrigger asChild>
                <div className={linkClass} onClick={(e) => { e.preventDefault(); onClick?.(); }} onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>Room Booking</div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="start" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link className="max-h-60 overflow-y-auto [scrollbar-gutter:stable]"href="/blog" className={linkClass} onClick={(e) => { e.preventDefault(); onClick?.(); }} onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
              Booking
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Overview
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu> */}
      <div onMouseLeave={closeDropdown}>
        <DropdownMenu modal={false} open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild onMouseEnter={openDropdown}>
            <div className={linkClass}>Room Booking</div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-40" align="start" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
            <DropdownMenuItem asChild onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
              <Link href="/room-booking" className={linkClass}>Booking</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
              <Link href="/blog" className={linkClass}>Overview</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
              <Link href="/calender" className={linkClass}>Calender</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <a href="/login" className={linkClass} onClick={onClick}>
        <button
          className={linkClass + " bg-primary text-white px-4 py-2 rounded-md hover:text-black hover:bg-red-200 transition-colors"}
        >
          Login
        </button>
      </a>
    </>
  )
}
