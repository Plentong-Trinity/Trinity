"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { blogPosts } from "@/lib/blog-data"

export function HeroSection() {
  // Duplicate the blog posts for a seamless loop
  const loopedBlogPosts = [...blogPosts, ...blogPosts]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16 overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background z-0" />

      <div className="container mx-auto max-w-5xl z-10 flex flex-col items-center">
        <div className="mb-6 relative w-64 h-64 md:w-80 md:h-80">
          <Image
            src="/Images/ikun.jpg"
            alt="Immutable Logo"
            width={320}
            height={320}
            className="object-contain"
            priority
          />
        </div>

        <h1 className="text-4xl md:text-6xl p-2 font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Plentong全靠我
        </h1>

        <p className="text-xl md:text-2xl mb-8 max-w-2xl">Truth 艾斯德尔是我的😇 Reserved. Marriage Registered.</p>

        <p className="text-lg mb-10 max-w-2xl text-muted-foreground">
          A decentralized archive preserving censored history, martyrs' testimonies, Bible translations, prophecy
          records, and lost books using decentralized technology.
        </p>

        {/* Rolling Articles Section */}
        {/* Can be used as Gallery Section in the future */}
        {/* <div className="w-full max-w-6xl my-8">
          <h3 className="text-lg font-bold text-primary mb-4 text-center">MUST READS</h3>
          <div className="relative w-full overflow-hidden bg-primary/5 p-4 rounded-lg border border-primary/20 backdrop-blur-sm">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-background via-transparent to-background" />
            <div className="flex w-max animate-scroll hover-pause-animation">
              {loopedBlogPosts.map((post, index) => (
                <Link
                  key={`${post.slug}-${index}`}
                  href={`/blog/${post.slug}`}
                  className="flex-shrink-0 w-64 mx-4 group"
                >
                  <div className="relative overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src={post.imageUrl || "/placeholder.svg"}
                      alt={post.title}
                      width={256}
                      height={144}
                      className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h4 className="text-white font-semibold text-base line-clamp-2">{post.title}</h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div> */}

        {/* <div className="mb-8 p-4 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-lg max-w-2xl">
          <p className="text-sm text-muted-foreground mb-2">
            <strong className="text-primary">Access Notice:</strong> Due to regional restrictions and ISP limitations,
            some IPFS links may require alternative connection methods.
          </p>
          <p className="text-xs text-muted-foreground">
            Try mobile data networks or consider using a decentralized VPN like{" "}
            <a
              href="https://www.sentinel.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Sentinel DVPN
            </a>{" "}
            for unrestricted access to preserved documents.
          </p>
        </div> */}

        {/* <div className="flex justify-center">
          <Button size="lg" asChild>
            <a
              href="#library"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("library")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }}
            >
              Explore Library
            </a>
          </Button>
        </div> */}

        <div className="flex justify-center">
          <Button size="lg" asChild>
            <a
              href="#library"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("library")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }}
            >
              Explore Esther
            </a>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <a href="#about" aria-label="Scroll to About section">
          <ChevronDown className="h-8 w-8 text-primary" />
        </a>
      </div>
    </section>
  )
}
