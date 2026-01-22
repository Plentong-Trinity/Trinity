import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import { RelatedArticles } from "@/components/for-referencing/related-articles"

export const metadata: Metadata = {
  title: "Software Source Code Is Speech Protected by the First Amendment | Immutable",
  description:
    "The landmark Bernstein case established that software source code is speech protected by the First Amendment and that government regulations preventing its publication were unconstitutional.",
  keywords: [
    "free code",
    "source code",
    "free speech",
    "Bernstein v. US",
    "encryption rights",
    "code as speech",
    "First Amendment",
    "censorship",
    "digital freedom",
    "cryptography",
  ],
  openGraph: {
    title: "Software Source Code Is Speech Protected by the First Amendment | Immutable",
    description:
      "The landmark Bernstein case established that software source code is speech protected by the First Amendment and that government regulations preventing its publication were unconstitutional.",
    url: "https://immutable.vercel.app/blog/open-source-is-free-speech",
    images: [
      {
        url: "https://immutable.vercel.app/open-source-speech.png",
        width: 1200,
        height: 630,
        alt: "Abstract image representing code as free speech",
        type: "image/png",
      },
    ],
  },
  twitter: {
    title: "Software Source Code Is Speech Protected by the First Amendment | Immutable",
    description:
      "The landmark Bernstein case established that software source code is speech protected by the First Amendment and that government regulations preventing its publication were unconstitutional.",
    images: {
      url: "https://immutable.vercel.app/open-source-speech.png",
      alt: "Abstract image representing code as free speech",
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
                Software Source Code Is Speech Protected by the First Amendment
              </h1>
              <p className="text-muted-foreground text-lg">
                Before social media shadow bans, before AI hallucinations, before Big Tech monopolies — there was code.
              </p>
            </header>

            <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-foreground/90 prose-headings:text-foreground prose-strong:text-primary prose-a:text-primary hover:prose-a:text-primary/80">
              <p>
                And in the 1990s, a man named Daniel J. Bernstein wanted to publish it. His encryption algorithm, to be
                specific. And he believed he had the right to publish it not just as code, but as speech.
              </p>
              <p>The U.S. government disagreed.</p>
              <p>They considered his algorithm "munitions." Export-controlled. Dangerous.</p>
              <p>
                So Bernstein sued. And he won. The courts ruled that source code — when it expresses an idea — is
                speech. Protected by the First Amendment. It was a defining moment not only for cryptographers, but for
                the digital future we now live in.
              </p>
              <p>
                And yet... how many people today even remember the{" "}
                <a
                  href="https://www.eff.org/cases/bernstein-v-us-dept-justice"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bernstein case
                </a>
                ?
              </p>

              <hr className="my-8 border-border" />

              <h2 className="font-semibold text-2xl mt-8">Where Is History Being Written Today?</h2>
              <p>
                We live in a time when code powers not just servers and smartphones, but culture, narrative, even
                reality. Algorithms tell us what's trending. Platforms filter what's true. History, it seems, is now
                being edited in real time.
              </p>
              <p>But here's the good news:</p>
              <p>History is still being written. Not by institutions. But by people.</p>
              <p>Truth-tellers. Whistleblowers. Coders. Cryptographers. Artists. Builders. Rebels.</p>
              <p>
                Free code isn't just a development model. It's a <strong>value system</strong>. It's the belief that
                truth should be <strong>auditable</strong>. That knowledge should be <strong>shareable</strong>. That if
                we want to be free, we need the <strong>right to read, write, and speak</strong> — even in code.
              </p>

              <hr className="my-8 border-border" />

              <h2 className="font-semibold text-2xl mt-8">Truth Seekers, Truth Tellers</h2>
              <p>
                At <Link href="/">Immutable</Link>, we are building a platform for those who still believe that truth
                matters — and that free speech is more than a slogan.
              </p>
              <p>
                We believe in defending the precedent that <strong>knowledge is not a crime</strong>.
              </p>
              <p>
                We believe that cryptography is mathematics, that source code is speech, and that the right to publish
                encryption algorithms is fundamental to digital freedom.
              </p>
              <p>We believe that truth-seeking is a sacred act, and truth-telling is a moral responsibility.</p>

              <hr className="my-8 border-border" />

              <h2 className="font-semibold text-2xl mt-8">It Starts With Unlearning</h2>
              <p>If you've ever felt uneasy with the way you were taught...</p>
              <p>If you've sensed there's a deeper narrative beneath the headlines...</p>
              <p>If you've questioned why questioning is now forbidden...</p>
              <p>You are not alone.</p>
              <p>
                Many of us were educated in systems that elevated <strong>knowledge against knowledge</strong> — a
                philosophy that teaches people <em>what to think</em> but never <em>how to think.</em>
              </p>
              <p>We were trained to memorize, not meditate. To repeat, not reflect. To obey, not build.</p>
              <p>But now we're remembering what it means to be human.</p>
              <p>
                And maybe you're just fed up. Tired of the filters. Tired of the fog. Tired of asking permission to
                speak — or to code.
              </p>

              <hr className="my-8 border-border" />

              <h2 className="font-semibold text-2xl mt-8">It's Time to Build. And We Need Each Other.</h2>
              <p>This isn't just a digital project. It's a spiritual one.</p>
              <p>
                A platform for those ready to <strong>reclaim truth in the age of noise</strong>.
              </p>
              <p>A place for builders, readers, believers, cryptographers, and rebels.</p>
              <blockquote className="border-l-4 border-primary bg-primary/5 p-4 italic text-xl my-6">
                Because we don't need more talking points. We need free code. We need the audacity to say: "I don't know
                — let's find out together." And we need the strength to say: "That's wrong — here's the truth." We need
                the courage to publish our algorithms, share our source code, and defend the principle that mathematics
                cannot be classified.
              </blockquote>
              <p>Let's build the archive the future will need.</p>
              <p>Let's write the history they won't erase.</p>
              <p>Let's code the freedom they can't control.</p>
              <p>Together.</p>
              <p>
                <Link href="/">Immutable</Link>
              </p>
            </div>
          </article>
          <RelatedArticles currentPostSlug="open-source-is-free-speech" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
