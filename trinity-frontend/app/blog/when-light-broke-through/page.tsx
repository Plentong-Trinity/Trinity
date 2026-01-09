import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { RelatedArticles } from "@/components/related-articles" // Import the new component

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
                When Light Broke Through: A Brief Look at the Reformation That Changed Everything
              </h1>
              <p className="text-muted-foreground text-lg">
                In the sixteenth century, a spark lit a fire that still burns today.
              </p>
            </header>

            <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-foreground/90 prose-headings:text-foreground prose-strong:text-primary">
              <p>It didn’t begin with a king. It didn’t begin with a war.</p>
              <p>It began with a monk, a manuscript, and a question:</p>
              <blockquote className="border-l-4 border-primary bg-primary/5 p-4 italic text-xl my-6">
                What if salvation couldn’t be sold?
              </blockquote>
              <p>
                That question shook empires, unseated popes, and brought the Scriptures out of vaults and into the hands
                of ordinary people — in their own language.
              </p>
              <p>
                At HistoricTruth.org, we don’t believe in rewriting the past. We believe in reading it for what it was.
              </p>
              <p>
                That’s why we’re making space for timeless voices like J.H. Merle D’Aubigné, whose five-volume work on
                the Reformation remains one of the most thorough, heartfelt, and spiritually grounded histories ever
                written.
              </p>

              <hr className="my-8 border-border" />

              <h2 className="font-semibold text-2xl mt-8">1. The Reformation Was a Return to the Source</h2>
              <p>The Reformers weren’t rebels. They were returners.</p>
              <p>They returned to Scripture — not commentary, not tradition, not power.</p>
              <p>
                <strong>Sola Scriptura</strong> — Scripture alone — became a revolutionary idea.
              </p>
              <p>
                With the printing press acting as a divine disruptor, truth broke through the chokehold of gatekeeping.
              </p>
              <p>
                From Luther to Zwingli to Calvin — and countless unnamed believers — a movement was born that would
                change the face of faith and freedom forever.
              </p>

              <hr className="my-8 border-border" />

              <h2 className="font-semibold text-2xl mt-8">2. It Was a Battle for the Soul, Not Just the Church</h2>
              <p>At its core, the Reformation wasn’t just about religious institutions.</p>
              <p>It was about the human soul. About the question of grace.</p>
              <p>Could forgiveness be bought?</p>
              <p>Did intermediaries stand between you and God?</p>
              <p>Millions would come to believe that salvation was not a transaction but a gift.</p>
              <p>And for that belief, many were imprisoned, tortured, and killed.</p>

              <hr className="my-8 border-border" />

              <h2 className="font-semibold text-2xl mt-8">3. A Global, Grassroots Awakening</h2>
              <p>This was no elite uprising.</p>
              <p>It began in the homes of shepherds and spread through the streets of cities.</p>
              <p>It reached Switzerland, Germany, France, the Low Countries, and beyond.</p>
              <p>Scripture was translated. Music was written. Martyrs sang as they were burned at the stake.</p>
              <p>And yet, through it all — the Word kept moving.</p>

              <hr className="my-8 border-border" />

              <h2 className="font-semibold text-2xl mt-8">4. Why It Still Matters</h2>
              <p>Truth is not a trend.</p>
              <p>The institutions may change, but the questions don’t.</p>
              <p>Who has the authority to interpret God?</p>
              <p>Who decides what is truth?</p>
              <p>
                And today, as censorship increases, as revisionism spreads, and as esoteric philosophies infiltrate even
                spiritual spaces, the need for historic, grounded truth is greater than ever.
              </p>

              <hr className="my-8 border-border" />

              <h2 className="font-semibold text-2xl mt-8">5. Read the Source for Yourself</h2>
              <p>At HistoricTruth.org, we are hosting D’Aubigné’s full, unedited work.</p>
              <p>No edits. No revision. No agenda.</p>
              <p>Just the truth — as it was seen, sung, and suffered for.</p>
              <p>You don’t need anyone to tell you what to believe.</p>
              <p>But you do deserve to see the evidence — the real evidence — for yourself.</p>

              <hr className="my-8 border-border" />

              <h2 className="font-semibold text-2xl mt-8">6. A Final Question…</h2>
              <p>Is prophecy being fulfilled before our eyes today?</p>
              <p>
                Is liberty of conscience — once protected by the Reformers at great cost — now under threat, both from
                external forces and internal seductions?
              </p>
              <p>
                Are we watching new institutions rise, that like those before, mix power with mysticism… trading truth
                for control?
              </p>
              <p>The Reformation wasn’t just history. It’s a mirror.</p>
              <p>And the question it asked still echoes in our generation:</p>
              <blockquote className="border-l-4 border-primary bg-primary/5 p-4 italic text-xl my-6">
                Will we return to the Source… or surrender to the system?
              </blockquote>
            </div>
          </article>
          <RelatedArticles currentPostSlug="when-light-broke-through" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
