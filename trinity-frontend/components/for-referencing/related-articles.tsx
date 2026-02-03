import Link from "next/link"
import Image from "next/image"
import { blogPosts } from "@/lib/blog-data"
import type { BlogPost } from "@/lib/blog-data"

interface RelatedArticlesProps {
  currentPostSlug: string
}

export function RelatedArticles({ currentPostSlug }: RelatedArticlesProps) {
  const related = blogPosts.filter((post) => post.slug !== currentPostSlug).slice(0, 3)

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center mb-8">Read Next</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {related.map((post: BlogPost) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <div className="relative overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300">
              <Image
                src={post.imageUrl || "/placeholder.svg"}
                alt={post.title}
                width={400}
                height={225}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-lg line-clamp-2">{post.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RelatedArticles
