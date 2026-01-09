"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, BookOpen, Star, Clock } from "lucide-react"
import { SocialShare } from "@/components/social-share"
import { useModal } from "@/components/modal-context"
import { featuredBooksWithFallbacks } from "@/lib/document-data-with-github-fallbacks"

export function FeaturedBooksSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const { openModal } = useModal()

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredBooksWithFallbacks.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredBooksWithFallbacks.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredBooksWithFallbacks.length) % featuredBooksWithFallbacks.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const getFeaturedBadge = (featured: string) => {
    switch (featured) {
      case "newly-added":
        return <Badge className="bg-green-500 hover:bg-green-600 text-white">New</Badge>
      case "essential":
        return <Badge className="bg-blue-500 hover:bg-blue-600 text-white">Essential</Badge>
      case "controversial":
        return <Badge className="bg-orange-500 hover:bg-orange-600 text-white">Controversial</Badge>
      default:
        return <Badge variant="secondary">Featured</Badge>
    }
  }

  const getImportanceIcon = (importance: string) => {
    if (importance === "critical") {
      return <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
    }
    return <Clock className="h-4 w-4 text-primary" />
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Documents</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground">
            Discover essential and newly added documents that preserve critical historical truths and suppressed
            knowledge.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-lg shadow-xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredBooksWithFallbacks.map((book) => (
                <div key={book.id} className="w-full flex-shrink-0 px-2">
                  <Card className="bg-card/80 backdrop-blur-md border-primary/20 min-h-[480px] md:min-h-[420px] flex flex-col md:flex-row overflow-hidden">
                    <div className="w-full md:w-1/3 flex-shrink-0 relative bg-muted/30">
                      <Image
                        src={book.coverImageUrl || "/placeholder.svg"}
                        alt={`Cover of ${book.title}`}
                        width={250}
                        height={375}
                        className="object-cover w-full h-full md:rounded-l-lg"
                        priority={book.id === featuredBooksWithFallbacks[0].id}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-black/5 md:to-black/40"></div>
                    </div>

                    <div className="flex flex-col flex-grow p-6 md:w-2/3">
                      <CardHeader className="p-0 mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getFeaturedBadge(book.featured)}
                            {getImportanceIcon(book.importance)}
                          </div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wider">
                            {book.category.replace("-", " ")}
                          </div>
                        </div>
                        <CardTitle className="text-xl lg:text-2xl leading-tight">{book.title}</CardTitle>
                        <p className="text-sm text-muted-foreground font-medium">by {book.author}</p>
                      </CardHeader>

                      <CardContent className="p-0 flex-grow mb-4">
                        <CardDescription className="text-sm md:text-base leading-relaxed line-clamp-4 md:line-clamp-5">
                          {book.description}
                        </CardDescription>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {book.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs bg-primary/5 border-primary/20">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>

                      <div className="mt-auto space-y-3">
                        <Button className="w-full" onClick={() => openModal(book)}>
                          <BookOpen className="h-4 w-4 mr-2" />
                          Read Document
                        </Button>
                        <SocialShare
                          title={`${book.title} - Immutable Archive`}
                          description={`${book.description.substring(0, 100)}... Preserved in the Immutable Archive.`}
                          url={book.ipfsLink}
                          hashtags={[...book.tags.slice(0, 2), "ImmutableArchive", "TruthPreserved"]}
                          variant="outline"
                          size="sm"
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background rounded-full shadow-md h-10 w-10"
            onClick={prevSlide}
            aria-label="Previous book"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background rounded-full shadow-md h-10 w-10"
            onClick={nextSlide}
            aria-label="Next book"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          <div className="flex justify-center mt-8 space-x-2.5">
            {featuredBooksWithFallbacks.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ease-out
              ${index === currentIndex ? "bg-primary scale-125" : "bg-muted-foreground/40 hover:bg-muted-foreground/60"}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto bg-primary/10 backdrop-blur-sm border-primary/20 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-3">Explore Our Complete Archive</h3>
              <p className="text-muted-foreground mb-6">
                Discover countless preserved documents including historical texts, Bible translations, and suppressed
                books 📚
              </p>
              <Button
                size="lg"
                onClick={() => {
                  document.getElementById("library")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }}
                className="shadow-md hover:shadow-lg transition-shadow"
              >
                View Full Library
              </Button>
              <p className="text-xs text-muted-foreground mt-4 italic">
                "And have no fellowship with the unfruitful works of darkness, but rather reprove them."
                <span className="block text-right not-italic">— Ephesians 5:11</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
