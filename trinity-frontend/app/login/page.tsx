import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { LoginSection } from "@/components/landing-page/login-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { blogPosts } from "@/lib/blog-data" // Updated import

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LoginSection/>
    </div>
  )
}
