import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import { RelatedArticles } from "@/components/for-referencing/related-articles" // Import the new component

export const metadata: Metadata = {
  title: "Echoes in the Dust: What 2,000 Years of Eyewitnesses Say About Jesus | Immutable",
  description:
    "Explore the historical evidence for early believers through the accounts of eyewitnesses, martyrs, and historians. Discover a story too consistent to be a coincidence.",
  keywords: [
    "early believers",
    "martyrs",
    "church history",
    "eyewitness accounts",
    "historical Jesus",
    "Pliny the Younger",
    "Tacitus",
    "Josephus",
    "Christian history",
  ],
  openGraph: {
    title: "Echoes in the Dust: What 2,000 Years of Eyewitnesses Say About Jesus | Immutable",
    description:
      "Explore the historical evidence for early believers through the accounts of eyewitnesses, martyrs, and historians.",
    url: "https://immutable.vercel.app/blog/echoes-in-the-dust",
    images: [
      {
        url: "https://immutable.vercel.app/echoes-in-the-dust.png",
        width: 1200,
        height: 630,
        alt: "Ancient scrolls and artifacts representing historical truth.",
        type: "image/png",
      },
    ],
  },
  twitter: {
    title: "Echoes in the Dust: What 2,000 Years of Eyewitnesses Say About Jesus | Immutable",
    description:
      "Explore the historical evidence for early believers through the accounts of eyewitnesses, martyrs, and historians.",
    images: {
      url: "https://immutable.vercel.app/echoes-in-the-dust.png",
      alt: "Ancient scrolls and artifacts representing historical truth.",
    },
  },
}

export default function BlogPostPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <article className="max-w-3xl mx-auto bg-card p-6 sm:p-8 md:p-10 rounded-lg shadow-lg border border-border">
            <header className="mb-8">
              <div className="mb-6">
                <Button variant="ghost" asChild className="-ml-4">
                  <Link href="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                  </Link>
                </Button>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 leading-tight">
                Echoes in the Dust: What 2,000 Years of Eyewitnesses, Martyrs, and Historians Say About Jesus
              </h1>
            </header>

            <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-foreground/90 prose-headings:text-foreground prose-strong:text-primary prose-a:text-primary hover:prose-a:text-primary/80">
              <h2 className="font-semibold text-2xl mt-8">1. The Strange Consistency of a Scattered People</h2>
              <p>They had no power. No buildings. No money. No safety.</p>
              <p>
                Yet within a generation, their message had spread from Jerusalem to every corner of the Roman Empire —
                carried not by military force or cultural dominance, but by word of mouth, and more often, whispers in
                the dark.
              </p>
              <p>
                What began as a small group of eyewitnesses to something they claimed was a resurrection soon became a
                movement too widespread to silence.
              </p>
              <p>Even their enemies took notice.</p>

              <hr className="my-8 border-border" />

              <h2 className="font-semibold text-2xl mt-8">2. The Records No One Could Erase</h2>
              <p>
                Pliny the Younger, a Roman governor, wrote to Emperor Trajan to ask what to do with these new believers
                — noting that they gathered before dawn and sang “hymns to Christ as to a god.”
              </p>
              <p>
                Tacitus, a Roman historian and no fan of Christians, documented Nero’s brutal persecution of them after
                the Great Fire of Rome, calling them “a class hated for their abominations.”
              </p>
              <p>
                And centuries before any religious institution had power, structure, or political influence — these
                records already existed.
              </p>
              <p>
                Even Jewish historians like Josephus, and later Muslim scholars, noted the undeniable presence and
                conviction of these early believers.
              </p>
              <blockquote className="border-l-4 border-primary bg-primary/5 p-4 italic text-xl my-6">
                This wasn’t theology. It was documentation.
              </blockquote>

              <hr className="my-8 border-border" />

              <h2 className="font-semibold text-2xl mt-8">3. The Hymns That Survived the Fire</h2>
              <p>Some of the earliest known Christian texts are actually songs.</p>
              <p>
                They carried doctrine, hope, and prophecy — hidden in melody, passed from prisoner to prisoner. Hymns
                like Phos Hilaron (“O Gladsome Light”) and Te Deum were sung underground when it was illegal to gather.
              </p>
              <p>Other songs were psalms, memorized for the moment torture would silence a voice.</p>
              <p>These weren’t people building empires.</p>
              <p>They were people preparing to die with peace in their hearts.</p>
              <p>
                And their words still survive — not just in sacred books, but on the lips of those who know them by
                memory, generations later.
              </p>

              <hr className="my-8 border-border" />

              <h2 className="font-semibold text-2xl mt-8">4. Historians of Every Stripe</h2>
              <p>What’s striking isn’t just the content — but the agreement.</p>
              <p>
                Historians from all walks of life, across continents and centuries, describe the early Christians with
                the same terms:
              </p>
              <ul className="list-disc list-inside">
                <li>Devoted</li>
                <li>Unshakable</li>
                <li>Strange</li>
                <li>Joyful in suffering</li>
                <li>Worshippers of a crucified man they called alive</li>
              </ul>
              <p>
                Whether you read the accounts of Roman pagans, Jewish scholars, Muslim chroniclers, or atheist
                anthropologists, the core is always the same:
              </p>
              <p>
                <strong>Something happened.</strong>
              </p>
              <p>And the people who believed it were willing to die rather than deny it.</p>

              <hr className="my-8 border-border" />

              <h2 className="font-semibold text-2xl mt-8">5. A Word to the Seeker</h2>
              <p>
                The scale of this conviction is staggering. Historians estimate that between 1200 AD and 1600 AD alone,
                over 100 million believers were martyred for their faith. This wasn't a fringe event; it was a
                centuries-long testament written in blood.
              </p>
              <p>You don’t need to trust a denomination, an institution, or even us.</p>
              <p>
                Just follow the trail — of blood, of song, of Scripture. You’ll find a story that is too consistent to
                be coincidence, too enduring to be invention, and too human to be myth.
              </p>
              <p>This isn’t about joining something. It’s about remembering something.</p>
              <p>
                <Link href="/">Immutable</Link> exists for people like you — thoughtful, curious, and unwilling to
                settle for comfortable lies.
              </p>
            </div>
          </article>
          <RelatedArticles currentPostSlug="echoes-in-the-dust" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
