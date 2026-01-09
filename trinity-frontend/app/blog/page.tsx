import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { blogPosts } from "@/lib/blog-data" // Updated import

export default function BlogIndexPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 bg-secondary/20">
        <div className="container mx-auto px-4 py-12">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Immutable Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Exploring historical truths, spiritual insights, and the ongoing battle for freedom of conscience.
            </p>
          </header>

          <div className="grid gap-8 max-w-4xl mx-auto">
            {blogPosts.map((post) => (
              <Card
                key={post.slug}
                className="bg-card/80 backdrop-blur-sm border-primary/20 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="md:flex">
                  <div className="md:w-2/5 md:flex-shrink-0">
                    <Image
                      src={post.imageUrl || "/placeholder.svg"}
                      alt={`Image for ${post.title}`}
                      width={400}
                      height={250}
                      className="object-cover w-full h-48 md:h-full"
                    />
                  </div>
                  <div className="md:w-3/5 flex flex-col p-6">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-2xl hover:text-primary transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </CardTitle>
                      <CardDescription>{post.date}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow">
                      <p className="text-muted-foreground">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter className="p-0 pt-4">
                      <Button asChild variant="link" className="px-0">
                        <Link href={`/blog/${post.slug}`}>
                          Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
