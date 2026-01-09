import Image from "next/image"
import type { Metadata } from "next"
import { SocialShare } from "@/components/social-share"
import { RelatedArticles } from "@/components/related-articles"

export const metadata: Metadata = {
  title: "What Israel is The Bible Speaking Of? | Historic Truth",
  description:
    "A comprehensive biblical investigation into God's true people. Discover the shocking truth about spiritual Israel and how it transforms our understanding of prophecy, salvation, and the final test of loyalty.",
  openGraph: {
    title: "What Israel is The Bible Speaking Of? | Historic Truth",
    description: "A comprehensive biblical investigation into God's true people and the final test of loyalty.",
    images: [
      {
        url: "https://historictruth.org/spiritual-israel.png",
        width: 1200,
        height: 630,
        alt: "Spiritual Israel - The Olive Tree",
      },
    ],
    type: "article",
    publishedTime: "2025-01-20T00:00:00Z",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Israel is The Bible Speaking Of?",
    description: "A comprehensive biblical investigation into God's true people.",
    images: ["https://historictruth.org/spiritual-israel.png"],
  },
}

export default function WhatIsraelPage() {
  const currentUrl = "https://historictruth.org/blog/what-israel-is-the-bible-speaking-of"

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src="/spiritual-israel.png"
            alt="Spiritual Israel - The Olive Tree of God's People"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">What Israel is The Bible Speaking Of?</h1>
          <p className="text-xl text-muted-foreground mb-4">
            A Comprehensive Biblical Investigation into God's True People
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <time dateTime="2025-01-20">January 20, 2025</time>
            <span>•</span>
            <span>50 min read</span>
          </div>
        </div>

        <SocialShare url={currentUrl} title="What Israel is The Bible Speaking Of?" />
      </div>

      {/* Opening Scripture */}
      <div className="mb-12 p-6 bg-muted/30 border-l-4 border-primary rounded-r-lg">
        <p className="text-lg italic mb-2">
          "For ye are all the children of God by faith in Christ Jesus. For as many of you as have been baptized into
          Christ have put on Christ. There is neither Jew nor Greek, there is neither bond nor free, there is neither
          male nor female: for ye are all one in Christ Jesus. And if ye be Christ's, then are ye Abraham's seed, and
          heirs according to the promise."
        </p>
        <p className="text-sm font-semibold text-right">- Galatians 3:26-29 (KJV)</p>
      </div>

      {/* Table of Contents */}
      <nav className="mb-12 p-6 bg-muted/50 rounded-lg border">
        <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
        <ol className="space-y-2 list-decimal list-inside">
          <li>
            <a href="#introduction" className="text-primary hover:underline">
              Introduction: A Question That Divides the Church
            </a>
          </li>
          <li>
            <a href="#christ-declaration" className="text-primary hover:underline">
              Christ's Revolutionary Declaration
            </a>
          </li>
          <li>
            <a href="#name-israel" className="text-primary hover:underline">
              The Name "Israel" - A Heavenly Origin
            </a>
          </li>
          <li>
            <a href="#jesus-israel" className="text-primary hover:underline">
              The Shocking Parallels - Jesus as the True Israel
            </a>
          </li>
          <li>
            <a href="#double-vision" className="text-primary hover:underline">
              The Double Vision Principle
            </a>
          </li>
          <li>
            <a href="#old-testament" className="text-primary hover:underline">
              Old Testament Foundations of Spiritual Israel
            </a>
          </li>
          <li>
            <a href="#new-covenant" className="text-primary hover:underline">
              The New Covenant - Made with Israel
            </a>
          </li>
          <li>
            <a href="#temple-question" className="text-primary hover:underline">
              The Temple Question - Physical or Spiritual?
            </a>
          </li>
          <li>
            <a href="#olive-tree" className="text-primary hover:underline">
              The Grafted Olive Tree
            </a>
          </li>
          <li>
            <a href="#great-deception" className="text-primary hover:underline">
              The Great Deception Revealed
            </a>
          </li>
          <li>
            <a href="#reformers" className="text-primary hover:underline">
              The Reformers' Unanimous Testimony
            </a>
          </li>
          <li>
            <a href="#modern-implications" className="text-primary hover:underline">
              Modern Implications and the Final Test
            </a>
          </li>
          <li>
            <a href="#truth-in-love" className="text-primary hover:underline">
              Speaking the Truth in Love
            </a>
          </li>
          <li>
            <a href="#conclusion" className="text-primary hover:underline">
              Conclusion: The Israel of God
            </a>
          </li>
        </ol>
      </nav>

      {/* Article Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {/* Introduction */}
        <section id="introduction" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">Introduction: A Question That Divides the Church</h2>
          <p className="mb-4">
            In the landscape of modern Christianity, perhaps no single question generates more passionate debate, more
            theological confusion, and more tragic division than this: What Israel is the Bible speaking of?
          </p>
          <p className="mb-4">
            Walk into any Christian bookstore today, and you will find shelves lined with books about the modern Middle
            East, rebuilt Jewish temples, secret raptures, and seven-year tribulations. Turn on Christian television,
            and you will hear preachers declaring that current events in the nation established in 1948 are the
            fulfillment of biblical prophecy. Attend prophecy conferences, and you will witness thousands of sincere
            believers with their eyes fixed firmly on Jerusalem, waiting for the next headline to confirm their
            eschatological expectations.
          </p>
          <p className="mb-4">
            But what if—just what if—this entire approach to biblical prophecy is built upon a foundation of sand? What
            if the very lens through which millions of Christians view end-time events has been deliberately distorted
            by forces that understood exactly how to misdirect the church's attention away from the most crucial truths
            of Scripture?
          </p>
          <p className="mb-4">
            The question before us is not merely academic. It strikes at the very heart of the gospel itself. It
            determines how we understand salvation, how we interpret prophecy, and how we comprehend God's character.
            Most importantly, it affects how we prepare for the climactic events that will soon test every soul on
            earth.
          </p>
          <p className="mb-4">
            As we embark upon this investigation, let us remember the words of our Savior: "And ye shall know the truth,
            and the truth shall make you free" (John 8:32, KJV). Truth—not popular opinion, not traditional
            interpretation, not even sincere belief—but truth alone has the power to liberate the human soul from
            deception.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Stakes Could Not Be Higher</h3>
          <p className="mb-4">
            Consider the magnitude of what hangs in the balance. If the popular interpretation of Israel in prophecy is
            correct, then millions of Christians are rightly focused on the Middle East, waiting for a rebuilt temple,
            and expecting a literal fulfillment of Old Testament promises to ethnic Jews. But if this interpretation is
            wrong—if it represents a fundamental misunderstanding of how God works in the world—then these same millions
            are being prepared for a deception of unprecedented proportions.
          </p>
          <p className="mb-4">
            History teaches us that God's people have made this mistake before. When Christ came the first time, the
            religious leaders and common people alike had their eyes fixed on the wrong things. They expected a
            political messiah who would overthrow the Romans and establish an earthly kingdom. They interpreted
            spiritual prophecies in a literal, carnal manner. The result? They crucified their own Messiah and rejected
            the very salvation they claimed to be seeking.
          </p>
          <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r">
            <p className="italic">"He came unto his own, and his own received him not" (John 1:11, KJV).</p>
          </div>
          <p className="mb-4">
            Could it be that the church today is making the same tragic error? Could it be that by focusing on literal,
            earthly interpretations of prophecy, we are missing the deeper spiritual truths that God intended to convey?
            Could it be that the enemy of souls has successfully planted a "brood parasite" in the nest of Christian
            theology—a deception so convincing that it is being nurtured and fed while biblical truth starves with
            neglect?
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">A Personal Word</h3>
          <p className="mb-4">
            Before we proceed, allow me to speak from the heart. As one whose mother was Jewish, I approach this topic
            not with any spirit of anti-Semitism or ethnic prejudice, but with a deep love for the Jewish people and a
            profound respect for their contributions to the world. Through the Jewish people, we have received the
            Scriptures, the patriarchs, the prophets, and most importantly, the Messiah Himself. As Jesus said,
            "salvation is of the Jews" (John 4:22, KJV).
          </p>
          <p className="mb-4">
            But it is precisely because of this love—and because of our Lord's command to speak the truth in love—that
            we must examine what Scripture actually teaches about Israel in prophecy. We must be willing to set aside
            popular interpretations, traditional assumptions, and even deeply held beliefs if they cannot withstand the
            clear testimony of God's Word.
          </p>
          <div className="my-6 p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded-r">
            <p className="mb-2">
              "...till we all come in the unity of the faith, and of the knowledge of the Son of God, unto a perfect
              man, unto the measure of the stature of the fulness of Christ: that we henceforth be no more children,
              tossed to and fro, and carried about with every wind of doctrine, by the sleight of men, and cunning
              craftiness, whereby they lie in wait to deceive; but speaking the truth in love, may grow up into him in
              all things, which is the head, even Christ."
            </p>
            <p className="text-sm font-semibold">- Ephesians 4:13-16 (KJV)</p>
          </div>
        </section>

        {/* Chapter 2: Christ's Revolutionary Declaration */}
        <section id="christ-declaration" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">Christ's Revolutionary Declaration</h2>
          <p className="mb-4">
            Our investigation must begin where all biblical truth begins—with the words of Jesus Christ Himself. For it
            was Christ who made the most revolutionary declaration about the nature of true worship and the identity of
            God's people that the world had ever heard.
          </p>
          <p className="mb-4">
            The setting was a well in Samaria. The participants were Jesus and a woman whose life had been marked by
            disappointment and rejection. The conversation that ensued would forever change how we understand the
            relationship between God and His people.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Question That Started It All</h3>
          <p className="mb-4">
            The Samaritan woman, perhaps testing this Jewish teacher, raised the contentious issue that had divided Jews
            and Samaritans for centuries: "Our fathers worshipped in this mountain; and ye say, that in Jerusalem is the
            place where men ought to worship" (John 4:20, KJV).
          </p>
          <p className="mb-4">
            Here was the fundamental question: Where should true worship take place? The Samaritans claimed Mount
            Gerizim. The Jews insisted on Jerusalem. Both groups were absolutely convinced that their physical location
            was essential to acceptable worship. Both were wrong.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Hour That Changed Everything</h3>
          <div className="my-6 p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-r">
            <p className="mb-2">
              "Jesus saith unto her, Woman, believe me, the hour cometh, when ye shall neither in this mountain, nor yet
              at Jerusalem, worship the Father. Ye worship ye know not what: we know what we worship: for salvation is
              of the Jews. But the hour cometh, and now is, when the true worshippers shall worship the Father in spirit
              and in truth: for the Father seeketh such to worship him. God is a Spirit: and they that worship him must
              worship him in spirit and in truth."
            </p>
            <p className="text-sm font-semibold">- John 4:21-24 (KJV)</p>
          </div>
          <p className="mb-4">Notice the profound implications of Christ's words:</p>
          <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
            <li>The transition was imminent: "The hour cometh, and now is"</li>
            <li>Physical location became irrelevant: "Neither in this mountain, nor yet at Jerusalem"</li>
            <li>Spiritual worship became paramount: "In spirit and in truth"</li>
            <li>God's character was revealed: "God is a Spirit"</li>
          </ol>
          <p className="mb-4">
            But perhaps most significantly for our study, notice what Christ said about salvation: "salvation is of the
            Jews." This was not a statement of ethnic superiority or divine favoritism. Rather, it was an acknowledgment
            of historical fact. Through the Jewish people, God had preserved His Word, raised up His prophets, and
            brought forth the Messiah. The plan of salvation had indeed come through the Jewish lineage.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Messiah Reveals Himself</h3>
          <p className="mb-4">
            The conversation reached its climax when the woman expressed her hope in the coming Messiah: "I know that
            Messias cometh, which is called Christ: when he is come, he will tell us all things" (John 4:25, KJV).
          </p>
          <p className="mb-4">
            Jesus' response was direct and unmistakable: "I that speak unto thee am he" (John 4:26, KJV).
          </p>
          <p className="mb-4">
            Here, at a well in Samaria, to a woman who was neither Jewish nor particularly religious, the Messiah
            revealed His identity and proclaimed the new era of spiritual worship. The implications were staggering. If
            worship was no longer tied to physical locations, if the "hour" had come when true worshippers would worship
            "in spirit and in truth," then what did this mean for the understanding of God's people?
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Fulfillment of Daniel's Prophecy</h3>
          <p className="mb-4">
            This transition that Christ announced was not unexpected. It had been prophesied centuries earlier by the
            prophet Daniel:
          </p>
          <div className="my-6 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r">
            <p className="mb-2">
              "Seventy weeks are determined upon thy people and upon thy holy city, to finish the transgression, and to
              make an end of sins, and to make reconciliation for iniquity, and to bring in everlasting righteousness,
              and to seal up the vision and prophecy, and to anoint the most Holy. Know therefore and understand, that
              from the going forth of the commandment to restore and to build Jerusalem unto the Messiah the Prince
              shall be seven weeks, and threescore and two weeks: the street shall be built again, and the wall, even in
              troublous times. And after threescore and two weeks shall Messiah be cut off, but not for himself: and the
              people of the prince that shall come shall destroy the city and the sanctuary; and the end thereof shall
              be with a flood, and unto the end of the war desolations are determined. And he shall confirm the covenant
              with many for one week: and in the midst of the week he shall cause the sacrifice and the oblation to
              cease, and for the overspreading of abominations he shall make it desolate, even until the consummation,
              and that determined shall be poured upon the desolate."
            </p>
            <p className="text-sm font-semibold">- Daniel 9:24-27 (KJV)</p>
          </div>
          <p className="mb-4">
            This remarkable prophecy, given approximately 500 years before Christ's birth, pinpointed the exact time
            when the Messiah would appear and be "cut off." It also predicted that He would "cause the sacrifice and the
            oblation to cease"—not by destroying the temple, but by fulfilling everything the ceremonial system had
            pointed toward.
          </p>
          <p className="mb-4">
            When Christ died on the cross, the veil of the temple was torn from top to bottom, symbolizing that the way
            into the Heavenly Sanctuary was now open to all who would come by faith. The earthly sanctuary had served
            its purpose. The transition from physical to spiritual worship was complete.
          </p>
        </section>

        {/* Chapter 3: The Name "Israel" */}
        <section id="name-israel" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">The Name "Israel" - A Heavenly Origin</h2>
          <p className="mb-4">
            To understand what the Bible means when it speaks of Israel in prophecy, we must first understand the origin
            and meaning of the name itself. This is not merely an exercise in etymology—it is fundamental to grasping
            God's purpose for His people throughout history.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Jacob's Night of Wrestling</h3>
          <p className="mb-4">
            The name "Israel" first appears in Scripture during one of the most dramatic encounters recorded in the Old
            Testament. Jacob, the grandson of Abraham, found himself alone by the brook Jabbok, facing an uncertain
            future and a potentially hostile reunion with his brother Esau.
          </p>
          <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r">
            <p className="mb-2">
              "And Jacob was left alone; and there wrestled a man with him until the breaking of the day... And he said,
              Let me go, for the day breaketh. And he said, I will not let thee go, except thou bless me. And he said
              unto him, What is thy name? And he said, Jacob. And he said, Thy name shall be called no more Jacob, but
              Israel: for as a prince hast thou power with God and with men, and hast prevailed."
            </p>
            <p className="text-sm font-semibold">- Genesis 32:24-28 (KJV)</p>
          </div>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Spiritual Significance</h3>
          <p className="mb-4">
            The name "Israel" literally means "prince with God" or "he who prevails with God." It was given to Jacob not
            because of his ethnic heritage, not because of his physical strength, and not because of his natural
            abilities. It was given to him because of his spiritual victory—his persistence in prayer, his refusal to
            let go of God's promises, and his determination to receive the divine blessing.
          </p>
          <div className="my-6 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-500 rounded-lg">
            <p className="font-semibold text-lg mb-2">Key Truth:</p>
            <p>
              The name "Israel" was first and foremost a spiritual designation, representing victory over sin through
              wrestling in prayer and claiming God's grace.
            </p>
          </div>
          <p className="mb-4">
            Jacob had been a deceiver, a schemer, a man who tried to accomplish God's purposes through human effort and
            manipulation. But in that night of wrestling, he was transformed. The old Jacob—the supplanter—died, and
            Israel—the prince with God—was born.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">From Individual to Nation</h3>
          <p className="mb-4">
            The name "Israel" was then extended to Jacob's descendants. When the children of Israel were enslaved in
            Egypt, God told Pharaoh through Moses: "Israel is my son, even my firstborn... Let my son go" (Exodus
            4:22-23, KJV).
          </p>
          <p className="mb-4">Notice the progression:</p>
          <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
            <li>First, "Israel" applied to one man who had gained spiritual victory</li>
            <li>Then, "Israel" was extended to his descendants who were called to be God's representatives on earth</li>
          </ol>
          <p className="mb-4">
            This pattern is not accidental. It reveals God's method throughout history. He begins with individuals who
            surrender their lives to Him, and then He uses them to reach others. The name "Israel" was always meant to
            represent those who, like Jacob, had wrestled with God and prevailed—those who had experienced spiritual
            transformation and were committed to following God's will.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Conditional Nature of the Covenant</h3>
          <p className="mb-4">
            It is essential to understand that the covenant God made with Israel was always conditional. The blessings
            and promises were contingent upon obedience to God's voice and faithfulness to His covenant:
          </p>
          <div className="my-6 p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded-r">
            <p className="mb-2">
              "Now therefore, if ye will obey my voice indeed, and keep my covenant, then ye shall be a peculiar
              treasure unto me above all people: for all the earth is mine: And ye shall be unto me a kingdom of
              priests, and an holy nation."
            </p>
            <p className="text-sm font-semibold">- Exodus 19:5-6 (KJV)</p>
          </div>
          <p className="mb-4">
            The key word is "if." The relationship was not based on ethnic heritage alone, but on spiritual commitment.
            Israel was to be a "kingdom of priests"—mediators between God and the nations. They were to be a "holy
            nation"—set apart for God's purposes. But these privileges came with responsibilities.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Prophetic Vision</h3>
          <p className="mb-4">
            From the very beginning, God's plan included people from all nations. The promise to Abraham was that
            through his seed, "all families of the earth" would be blessed (Genesis 12:3, KJV). The prophet Isaiah spoke
            of a time when God's house would be called "an house of prayer for all people" (Isaiah 56:7, KJV).
          </p>
          <p className="mb-4">
            Even in the Old Testament, provision was made for non-Israelites to become part of God's people:
          </p>
          <div className="my-6 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r">
            <p className="mb-2">
              "Also the sons of the stranger, that join themselves to the LORD, to serve him, and to love the name of
              the LORD, to be his servants, every one that keepeth the sabbath from polluting it, and taketh hold of my
              covenant; Even them will I bring to my holy mountain, and make them joyful in my house of prayer..."
            </p>
            <p className="text-sm font-semibold">- Isaiah 56:6-7 (KJV)</p>
          </div>
          <p className="mb-4">
            This passage is remarkable in its inclusivity. "The sons of the stranger" who join themselves to the Lord,
            keep His Sabbath, and take hold of His covenant are fully accepted as His people. The criteria are
            spiritual, not ethnic.
          </p>
        </section>

        {/* Chapter 4: Jesus as True Israel */}
        <section id="jesus-israel" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">The Shocking Parallels - Jesus as the True Israel</h2>
          <p className="mb-4">
            One of the most remarkable discoveries in Scripture is the way the New Testament presents Jesus Christ as
            the fulfillment of everything that Israel was meant to be. This is not merely a theological concept—it is
            demonstrated through a series of stunning historical parallels that cannot be dismissed as coincidence.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Matthew's Amazing Revelation</h3>
          <p className="mb-4">
            The Gospel of Matthew, written primarily for a Jewish audience, presents Jesus as the true Israel through a
            careful comparison of Christ's life with the history of ancient Israel. The parallels are so precise and
            numerous that they demand our attention.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Hosea's Prophecy and Its Dual Fulfillment</h3>
          <p className="mb-4">
            The prophet Hosea, writing around 800 B.C., declared: "When Israel was a child, then I loved him, and called
            my son out of Egypt" (Hosea 11:1, KJV). This verse originally referred to the nation of Israel's exodus from
            Egyptian bondage under Moses.
          </p>
          <p className="mb-4">
            But Matthew, under the inspiration of the Holy Spirit, applies this same prophecy to Jesus Christ:
          </p>
          <div className="my-6 p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-r">
            <p className="mb-2">
              "And was there until the death of Herod: that it might be fulfilled which was spoken of the Lord by the
              prophet, saying, Out of Egypt have I called my son."
            </p>
            <p className="text-sm font-semibold">- Matthew 2:15 (KJV)</p>
          </div>
          <p className="mb-4">
            This is a crucial principle in biblical interpretation: Prophecy can have both a literal historical
            fulfillment and a deeper spiritual fulfillment. The nation of Israel came out of Egypt, but Jesus—the true
            Israel—also came out of Egypt, fulfilling the prophecy in a more complete and perfect way.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Parallel Histories</h3>
          <p className="mb-4">
            A careful study reveals that Christ's life story actually repeats the history of ancient Israel, point by
            point—but where Israel failed, Jesus succeeded:
          </p>
          <div className="space-y-6 my-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-bold mb-2">1. The Joseph Connection</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>Old Testament:</strong> A man named Joseph has dreams and goes into Egypt to preserve his
                  family (Genesis 45:5)
                </li>
                <li>
                  <strong>New Testament:</strong> Another Joseph has dreams and goes into Egypt to preserve his family
                  (Matthew 2:13)
                </li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-bold mb-2">2. The Son Called Out of Egypt</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>Old Testament:</strong> When Israel comes out of Egypt, God calls the nation "my son" (Exodus
                  4:22)
                </li>
                <li>
                  <strong>New Testament:</strong> When Jesus comes out of Egypt, God declares "Out of Egypt have I
                  called my son" (Matthew 2:15)
                </li>
              </ul>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-bold mb-2">3. The Baptism Experience</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>Old Testament:</strong> Israel passes through the Red Sea, and Paul says they were "baptized
                  unto Moses... in the sea" (1 Corinthians 10:2)
                </li>
                <li>
                  <strong>New Testament:</strong> Jesus is baptized "to fulfill all righteousness," and God proclaims
                  Him "my beloved Son" (Matthew 3:15-17)
                </li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h4 className="font-bold mb-2">4. The Wilderness Testing</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>Old Testament:</strong> After the Red Sea crossing, Israel spends 40 years in the wilderness,
                  led by God's Spirit
                </li>
                <li>
                  <strong>New Testament:</strong> Immediately after baptism, Jesus is "led up of the Spirit into the
                  wilderness" for 40 days (Matthew 4:1-2)
                </li>
              </ul>
            </div>

            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h4 className="font-bold mb-2">5. The Response to Temptation</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>Old Testament:</strong> At the end of 40 years, Moses writes the book of Deuteronomy
                </li>
                <li>
                  <strong>New Testament:</strong> At the end of 40 days, Jesus resists Satan's temptations by quoting
                  three scriptures—all from Deuteronomy!
                </li>
              </ul>
            </div>

            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <h4 className="font-bold mb-2">6. The True Vine</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>Old Testament:</strong> God calls Israel a "vine" that He brought "out of Egypt" (Psalm 80:8)
                </li>
                <li>
                  <strong>New Testament:</strong> Jesus declares, "I am the true vine" (John 15:1)
                </li>
              </ul>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Inescapable Conclusion</h3>
          <div className="my-6 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 rounded-lg">
            <p className="font-semibold text-lg mb-2">Key Truth:</p>
            <p>
              The evidence is overwhelming: Jesus Christ is the true Israel. He is the one man who perfectly fulfilled
              everything that the nation of Israel was called to be. Where they failed, He succeeded. Where they
              disobeyed, He obeyed. Where they fell into sin, He remained sinless.
            </p>
          </div>
          <p className="mb-4">
            This is not replacement theology—it is fulfillment theology. Jesus did not replace Israel; He became the
            perfect Israel, the one through whom all the promises would be fulfilled.
          </p>
          <p className="mb-4">
            But the story does not end there. Just as the name "Israel" was extended from Jacob to his descendants, so
            the name "Israel" is extended from Jesus to all who belong to Him.
          </p>
        </section>

        {/* Chapter 5: The Double Vision Principle */}
        <section id="double-vision" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">The Double Vision Principle</h2>
          <p className="mb-4">
            Have you ever been struck so hard that you began seeing double? In the realm of biblical prophecy, the
            Christian world desperately needs this kind of "double vision"—the ability to see that there are now two
            Israels, not one.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Paul's Shocking Declaration</h3>
          <p className="mb-4">
            The apostle Paul, himself a Jew of the tribe of Benjamin, made one of the most startling statements in all
            of Scripture:
          </p>
          <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r">
            <p className="mb-2">"They are not all Israel, which are of Israel."</p>
            <p className="text-sm font-semibold">- Romans 9:6 (KJV)</p>
          </div>
          <p className="mb-4">
            Read that again slowly. Paul is saying that not everyone who is ethnically descended from Israel (Jacob) is
            truly part of God's Israel. There is a distinction between physical Israel and spiritual Israel.
          </p>
          <p className="mb-4">He continues:</p>
          <div className="my-6 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r">
            <p className="mb-2">
              "That is, They which are the children of the flesh, these are not the children of God: but the children of
              the promise are counted for the seed."
            </p>
            <p className="text-sm font-semibold">- Romans 9:8 (KJV)</p>
          </div>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Two Israels Defined</h3>
          <p className="mb-4">According to Paul's inspired teaching, there are now two distinct groups:</p>
          <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
            <li>
              <strong>Israel "according to the flesh"</strong> (Romans 9:3-4) - Those who are physical descendants of
              Abraham, Isaac, and Jacob
            </li>
            <li>
              <strong>Spiritual Israel</strong> - Those who are "children of the promise," composed of both Jews and
              Gentiles who believe in Jesus Christ
            </li>
          </ol>
          <p className="mb-4">
            This distinction is not based on ethnic prejudice or divine favoritism. It is based on the fundamental
            principle that God looks upon the heart, not upon external circumstances.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Heart Circumcision</h3>
          <p className="mb-4">Paul explains this principle further in his letter to the Romans:</p>
          <div className="my-6 p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded-r">
            <p className="mb-2">
              "For he is not a Jew, which is one outwardly; neither is that circumcision, which is outward in the flesh:
              But he is a Jew, which is one inwardly; and circumcision is that of the heart, in the spirit, and not in
              the letter; whose praise is not of men, but of God."
            </p>
            <p className="text-sm font-semibold">- Romans 2:28-29 (KJV)</p>
          </div>
          <p className="mb-4">
            This is revolutionary! Paul is saying that someone who is ethnically Jewish but lives as a lawbreaker is not
            truly a Jew in God's eyes. Conversely, a Gentile who through faith keeps "the righteousness of the law" is
            counted as a true Jew before God.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">John the Baptist's Warning</h3>
          <p className="mb-4">
            This principle was not new with Paul. John the Baptist had prepared the way for this understanding when he
            warned the Jews not to trust in their ethnic heritage for salvation:
          </p>
          <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r">
            <p className="mb-2">
              "Bring forth therefore fruits meet for repentance: And think not to say within yourselves, We have Abraham
              to our father: for I say unto you, that God is able of these stones to raise up children unto Abraham."
            </p>
            <p className="text-sm font-semibold">- Matthew 3:8-9 (KJV)</p>
          </div>
          <p className="mb-4">
            John was telling them that physical descent from Abraham was meaningless without spiritual transformation.
            God could raise up children to Abraham from stones if necessary!
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Church as the New Israel</h3>
          <p className="mb-4">
            The New Testament consistently applies the titles and promises originally given to Israel to the Christian
            church. Peter, writing to predominantly Gentile Christians, uses the exact words that God spoke to Israel at
            Mount Sinai:
          </p>
          <div className="my-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r">
            <p className="mb-2">
              <strong>To Israel:</strong> "And ye shall be unto me a kingdom of priests, and an holy nation." - Exodus
              19:6 (KJV)
            </p>
            <p className="mb-2">
              <strong>To the Church:</strong> "But ye are a chosen generation, a royal priesthood, an holy nation, a
              peculiar people." - 1 Peter 2:9 (KJV)
            </p>
          </div>
          <p className="mb-4">
            James, when writing to the church, addresses it as "the twelve tribes which are scattered abroad" (James
            1:1, KJV). The early church understood that they were the continuation and fulfillment of God's Israel.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Galatians Principle</h3>
          <p className="mb-4">
            Paul's letter to the Galatians contains perhaps the clearest explanation of spiritual Israel:
          </p>
          <div className="my-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 rounded-r">
            <p className="mb-2">
              "For ye are all the children of God by faith in Christ Jesus. For as many of you as have been baptized
              into Christ have put on Christ. There is neither Jew nor Greek, there is neither bond nor free, there is
              neither male nor female: for ye are all one in Christ Jesus. And if ye be Christ's, then are ye Abraham's
              seed, and heirs according to the promise."
            </p>
            <p className="text-sm font-semibold">- Galatians 3:26-29 (KJV)</p>
          </div>
          <p className="mb-4">Notice the progression:</p>
          <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
            <li>All believers are children of God by faith</li>
            <li>In Christ, ethnic distinctions are abolished</li>
            <li>All who belong to Christ are Abraham's seed</li>
            <li>All believers are heirs according to the promise</li>
          </ol>
          <p className="mb-4">
            This is not anti-Semitism—it is the gospel! It is the good news that God's family is open to all who will
            come by faith, regardless of their ethnic background.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Israel of God</h3>
          <p className="mb-4">Paul concludes his letter to the Galatians with this benediction:</p>
          <div className="my-6 p-4 bg-pink-50 dark:bg-pink-900/20 border-l-4 border-pink-500 rounded-r">
            <p className="mb-2">
              "And as many as walk according to this rule, peace be on them, and mercy, and upon the Israel of God."
            </p>
            <p className="text-sm font-semibold">- Galatians 6:16 (KJV)</p>
          </div>
          <p className="mb-4">
            "The Israel of God"—this is Paul's term for all believers, both Jewish and Gentile, who walk according to
            the rule of the new creation in Christ Jesus.
          </p>
        </section>

        {/* Chapter 6: Old Testament Foundations */}
        <section id="old-testament" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">Old Testament Foundations of Spiritual Israel</h2>
          <p className="mb-4">
            The concept of spiritual Israel is not a New Testament innovation imposed upon Old Testament promises.
            Rather, it has its roots deep in the Hebrew Scriptures themselves. From the very beginning, God's plan was
            to have a people who would represent Him to the world—not based on ethnic heritage alone, but on faith and
            obedience.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Abraham's Worldwide Covenant</h3>
          <p className="mb-4">
            The covenant that God made with Abraham was never intended to be limited to his physical descendants:
          </p>
          <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r">
            <p className="mb-2">
              "And I will make of thee a great nation, and I will bless thee, and make thy name great; and thou shalt be
              a blessing: And I will bless them that bless thee, and curse him that curseth thee: and in thee shall all
              families of the earth be blessed."
            </p>
            <p className="text-sm font-semibold">- Genesis 12:2-3 (KJV)</p>
          </div>
          <p className="mb-4">
            The scope is breathtaking: "all families of the earth." This was not an afterthought or a later addition to
            God's plan. From the very beginning, the Abrahamic covenant had a global dimension.
          </p>
          <p className="mb-4">Paul confirms this understanding in the New Testament:</p>
          <div className="my-6 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r">
            <p className="mb-2">
              "And the scripture, foreseeing that God would justify the heathen through faith, preached before the
              gospel unto Abraham, saying, In thee shall all nations be blessed."
            </p>
            <p className="text-sm font-semibold">- Galatians 3:8 (KJV)</p>
          </div>
          <p className="mb-4">
            The gospel was preached to Abraham! The promise that all nations would be blessed through his seed was the
            gospel in embryonic form.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The True Circumcision</h3>
          <p className="mb-4">
            Moses himself taught that true circumcision was a matter of the heart, not merely a physical ritual:
          </p>
          <div className="my-6 p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded-r">
            <p className="mb-2">
              "And the LORD thy God will circumcise thine heart, and the heart of thy seed, to love the LORD thy God
              with all thine heart, and with all thy soul, that thou mayest live."
            </p>
            <p className="text-sm font-semibold">- Deuteronomy 30:6 (KJV)</p>
          </div>
          <p className="mb-4">
            This spiritual circumcision was always the goal—a heart transformed by God's love and committed to His
            service.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Inclusive Vision of the Prophets</h3>
          <p className="mb-4">
            The Old Testament prophets consistently spoke of a time when people from all nations would worship the true
            God. Isaiah's vision was particularly expansive:
          </p>
          <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r">
            <p className="mb-2">
              "Also the sons of the stranger, that join themselves to the LORD, to serve him, and to love the name of
              the LORD, to be his servants, every one that keepeth the sabbath from polluting it, and taketh hold of my
              covenant; Even them will I bring to my holy mountain, and make them joyful in my house of prayer: their
              burnt offerings and their sacrifices shall be accepted upon mine altar; for mine house shall be called an
              house of prayer for all people."
            </p>
            <p className="text-sm font-semibold">- Isaiah 56:6-7 (KJV)</p>
          </div>
          <p className="mb-4">This passage is remarkable for several reasons:</p>
          <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
            <li>"Sons of the stranger" are fully welcomed into God's family</li>
            <li>
              The criteria are spiritual: serving God, loving His name, keeping the Sabbath, taking hold of His covenant
            </li>
            <li>Their worship is fully accepted—"their burnt offerings and their sacrifices shall be accepted"</li>
            <li>God's house is called "an house of prayer for all people"</li>
          </ol>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Remnant Principle</h3>
          <p className="mb-4">
            Throughout Old Testament history, God worked through a faithful remnant rather than the entire nation.
            During Elijah's time, when it seemed that all Israel had apostatized, God revealed that He had reserved
            "seven thousand in Israel, all the knees which have not bowed unto Baal" (1 Kings 19:18, KJV).
          </p>
          <p className="mb-4">
            This remnant principle is crucial to understanding God's method. He has always worked through those who
            remain faithful to Him, regardless of what the majority does. Ethnic heritage or national citizenship has
            never been sufficient—personal faith and obedience have always been required.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Daniel's Vision of the Kingdom</h3>
          <p className="mb-4">
            Daniel's vision of the stone cut out without hands that would grow and fill the whole earth (Daniel 2:31-45)
            depicted a kingdom that would supersede all earthly empires. This kingdom, established by the "Son of man,"
            is clearly a spiritual kingdom that would encompass all peoples, nations, and languages. This kingdom is the
            spiritual Israel.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Conditional Nature of the Promises</h3>
          <p className="mb-4">
            It is crucial to understand that the promises made to Israel were always conditional. The covenant at Mount
            Sinai began with a clear "if":
          </p>
          <div className="my-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r">
            <p className="mb-2">
              "Now therefore, if ye will obey my voice indeed, and keep my covenant, then ye shall be a peculiar
              treasure unto me above all people: for all the earth is mine: And ye shall be unto me a kingdom of
              priests, and an holy nation."
            </p>
            <p className="text-sm font-semibold">- Exodus 19:5-6 (KJV)</p>
          </div>
          <p className="mb-4">
            The blessings were contingent upon obedience. When Israel failed to meet these conditions, the promises were
            transferred to those who would fulfill them—spiritual Israel.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Jeremiah's New Covenant</h3>
          <p className="mb-4">The prophet Jeremiah spoke of a new covenant that God would make:</p>
          <div className="my-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 rounded-r">
            <p className="mb-2">
              "Behold, the days come, saith the LORD, that I will make a new covenant with the house of Israel, and with
              the house of Judah: Not according to the covenant that I made with their fathers in the day that I took
              them by the hand to bring them out of the land of Egypt; which my covenant they brake, although I was an
              husband unto them, saith the LORD: But this shall be the covenant that I will make with the house of
              Israel; After those days, saith the LORD, I will put my law in their inward parts, and write it in their
              hearts; and will be their God, and they shall be my people."
            </p>
            <p className="text-sm font-semibold">- Jeremiah 31:31-33 (KJV)</p>
          </div>
          <p className="mb-4">
            This new covenant would be different from the old one that Israel broke. It would be written on hearts, not
            on stone tablets. It would be internal, not external. And as we shall see, this new covenant is made with
            spiritual Israel—all who have the law of God written in their hearts.
          </p>
        </section>

        {/* Chapter 7: The New Covenant */}
        <section id="new-covenant" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">The New Covenant - Made with Israel</h2>
          <p className="mb-4">
            One of the most startling discoveries in Scripture is that the new covenant—the covenant under which all
            Christians are saved—is made exclusively with Israel. This fact has profound implications for understanding
            who constitutes God's people in the last days.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Shocking Truth About Salvation</h3>
          <p className="mb-4">
            Consider this carefully: God never makes a salvation covenant with Gentiles. Nowhere in Scripture do you
            find any saving covenant made with anyone but Israelites. If you want to be saved, you must become part of
            Israel—not ethnic Israel, but spiritual Israel.
          </p>
          <p className="mb-4">The book of Hebrews makes this crystal clear:</p>
          <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r">
            <p className="mb-2">
              "Behold, the days come, saith the Lord, when I will make a new covenant with the house of Israel and with
              the house of Judah... For this is the covenant that I will make with the house of Israel after those days,
              saith the Lord; I will put my laws into their mind, and write them in their hearts: and I will be to them
              a God, and they shall be to me a people."
            </p>
            <p className="text-sm font-semibold">- Hebrews 8:8, 10 (KJV)</p>
          </div>
          <p className="mb-4">
            The new covenant is made "with the house of Israel"! This is not a covenant made with Gentiles as Gentiles,
            but with those who become part of spiritual Israel through faith in Jesus Christ.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Grafting Process</h3>
          <p className="mb-4">
            Paul uses the beautiful analogy of an olive tree to explain how Gentiles become part of Israel:
          </p>
          <div className="my-6 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r">
            <p className="mb-2">
              "And if some of the branches be broken off, and thou, being a wild olive tree, wert grafted in among them,
              and with them partakest of the root and fatness of the olive tree; Boast not against the branches. But if
              thou boast, thou bearest not the root, but the root thee."
            </p>
            <p className="text-sm font-semibold">- Romans 11:17-18 (KJV)</p>
          </div>
          <p className="mb-4">The imagery is powerful:</p>
          <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
            <li>The olive tree represents Israel</li>
            <li>The root represents the covenant promises made to Abraham</li>
            <li>Natural branches represent ethnic Jews</li>
            <li>Wild branches represent Gentiles</li>
            <li>Grafting represents the process by which Gentiles become part of Israel</li>
          </ul>
          <p className="mb-4">
            When Gentiles are saved, they are not grafted into a separate tree—they are grafted into the same olive tree
            of Israel. They partake of the same root, the same nourishment, the same covenant promises.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">One Method of Salvation</h3>
          <p className="mb-4">
            This understanding eliminates any notion that God has different methods of salvation for different ethnic
            groups. Paul is emphatic:
          </p>
          <div className="my-6 p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded-r">
            <p className="mb-2">
              "Is he the God of the Jews only? is he not also of the Gentiles? Yes, of the Gentiles also: Seeing it is
              one God, which shall justify the circumcision by faith, and uncircumcision through faith."
            </p>
            <p className="text-sm font-semibold">- Romans 3:29-30 (KJV)</p>
          </div>
          <p className="mb-4">
            There is one God, one method of salvation, one covenant, one people. Jews and Gentiles are saved the same
            way—by grace through faith. But when they are saved, they both become part of the same spiritual nation:
            Israel.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Spiritual Requirements</h3>
          <p className="mb-4">
            What does it mean to become a spiritual Jew, a member of spiritual Israel? Paul explains:
          </p>
          <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r">
            <p className="mb-2">
              "For he is not a Jew, which is one outwardly; neither is that circumcision, which is outward in the flesh:
              But he is a Jew, which is one inwardly; and circumcision is that of the heart, in the spirit, and not in
              the letter; whose praise is not of men, but of God."
            </p>
            <p className="text-sm font-semibold">- Romans 2:28-29 (KJV)</p>
          </div>
          <p className="mb-4">The requirements are spiritual:</p>
          <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
            <li>Circumcision of the heart - A transformed nature</li>
            <li>Inward change - Not merely external conformity</li>
            <li>Spiritual reality - Not just ritual observance</li>
            <li>God's approval - Not human recognition</li>
          </ol>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Law Written in the Heart</h3>
          <p className="mb-4">The new covenant promise is that God will write His law in the hearts of His people:</p>
          <div className="my-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r">
            <p className="mb-2">
              "But this shall be the covenant that I will make with the house of Israel; After those days, saith the
              LORD, I will put my law in their inward parts, and write it in their hearts; and will be their God, and
              they shall be my people."
            </p>
            <p className="text-sm font-semibold">- Jeremiah 31:33 (KJV)</p>
          </div>
          <p className="mb-4">
            This is not the abolition of God's law—it is the internalization of God's law. Instead of being written on
            stone tablets, it is written on the heart. Instead of being an external requirement, it becomes an internal
            desire.
          </p>
          <p className="mb-4">Jesus confirmed this principle:</p>
          <div className="my-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 rounded-r">
            <p className="mb-2">
              "Think not that I am come to destroy the law, or the prophets: I am not come to destroy, but to fulfil.
              For verily I say unto you, Till heaven and earth pass, one jot or one tittle shall in no wise pass from
              the law, till all be fulfilled."
            </p>
            <p className="text-sm font-semibold">- Matthew 5:17-18 (KJV)</p>
          </div>
          <p className="mb-4">
            The law remains, but now it is kept through the power of the indwelling Spirit rather than through human
            effort alone.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">All Israel Shall Be Saved</h3>
          <p className="mb-4">With this understanding, we can now comprehend what Paul meant when he wrote:</p>
          <div className="my-6 p-4 bg-pink-50 dark:bg-pink-900/20 border-l-4 border-pink-500 rounded-r">
            <p className="mb-2">
              "And so all Israel shall be saved: as it is written, There shall come out of Sion the Deliverer, and shall
              turn away ungodliness from Jacob: For this is my covenant unto them, when I shall take away their sins."
            </p>
            <p className="text-sm font-semibold">- Romans 11:26 (KJV)</p>
          </div>
          <p className="mb-4">
            Some interpret this to mean that all ethnic Jews will ultimately be saved, but this would contradict every
            principle of God's dealings with humanity throughout history. God is not a respecter of persons. Salvation
            is not based on ethnic heritage but on individual choice.
          </p>
          <p className="mb-4">
            However, if Paul is speaking of spiritual Israel—all who have been grafted into the olive tree through
            faith—then the statement makes perfect sense. All spiritual Israel will indeed be saved, because spiritual
            Israel consists only of those who have accepted Jesus Christ as their Savior.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Christian Religion's Jewish Foundation</h3>
          <p className="mb-4">
            It is important to understand that Christianity is not a new religion separate from Judaism. Rather, it is
            the completion and fulfillment of the Jewish faith. The Christian religion is based on a Jewish manual
            called the Bible. Our Savior was Jewish. The apostles were Jewish. The early church was predominantly
            Jewish.
          </p>
          <p className="mb-4">Paul makes this clear:</p>
          <div className="my-6 p-4 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-500 rounded-r">
            <p className="mb-2">
              "What advantage then hath the Jew? or what profit is there of circumcision? Much every way: chiefly,
              because that unto them were committed the oracles of God."
            </p>
            <p className="text-sm font-semibold">- Romans 3:1-2 (KJV)</p>
          </div>
          <p className="mb-4">
            The Jewish people were entrusted with preserving the Scriptures, and through them the Messiah came into the
            world. We owe them a debt of gratitude that can never be repaid.
          </p>
          <p className="mb-4">
            But the completion of their mission was to introduce the Messiah to the world, which was accomplished at
            Pentecost when Jews from every nation under heaven heard the gospel and took it back to their respective
            countries (Acts 2:5).
          </p>
        </section>

        {/* Chapter 8: The Temple Question */}
        <section id="temple-question" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">The Temple Question - Physical or Spiritual?</h2>
          <p className="mb-4">
            One of the most contentious issues in modern prophetic interpretation concerns the temple. Millions of
            Christians are watching the Middle East, expecting the ancient Jewish temple to be rebuilt on the Temple
            Mount in Jerusalem. But what does the Bible actually teach about the temple in the New Testament era?
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Foundation of the Expectation</h3>
          <p className="mb-4">
            Much of the speculation about a rebuilt temple springs from one passage in Paul's second letter to the
            Thessalonians:
          </p>
          <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r">
            <p className="mb-2">
              "Let no man deceive you by any means: for that day shall not come, except there come a falling away first,
              and that man of sin be revealed, the son of perdition; Who opposeth and exalteth himself above all that is
              called God, or that is worshipped; so that he as God sitteth in the temple of God, shewing himself that he
              is God."
            </p>
            <p className="text-sm font-semibold">- 2 Thessalonians 2:3-4 (KJV)</p>
          </div>
          <p className="mb-4">
            Since the Romans destroyed the Jewish temple in A.D. 70, many assume that for this antichrist to sit in "the
            temple of God," a physical temple must be rebuilt. But let us examine what the New Testament actually
            teaches about the temple.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Jesus and the Temple</h3>
          <p className="mb-4">
            Jesus' attitude toward the physical temple was clear and unambiguous. He predicted its complete destruction:
          </p>
          <div className="my-6 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r">
            <p className="mb-2">
              "And Jesus went out, and departed from the temple: and his disciples came to him for to shew him the
              buildings of the temple. And Jesus said unto them, See ye not all these things? verily I say unto you,
              There shall not be left here one stone upon another, that shall not be thrown down."
            </p>
            <p className="text-sm font-semibold">- Matthew 24:1-2 (KJV)</p>
          </div>
          <p className="mb-4">But Jesus also spoke of a different temple—a spiritual one:</p>
          <div className="my-6 p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded-r">
            <p className="mb-2">
              "Jesus answered and said unto them, Destroy this temple, and in three days I will raise it up. Then said
              the Jews, Forty and six years was this temple in building, and wilt thou rear it up in three days? But he
              spake of the temple of his body."
            </p>
            <p className="text-sm font-semibold">- John 2:19-21 (KJV)</p>
          </div>
          <p className="mb-4">
            Jesus was transferring attention from a physical building to something greater: His body, and by extension,
            the church.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Veil is Torn</h3>
          <p className="mb-4">When Jesus died on the cross, something remarkable happened:</p>
          <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r">
            <p className="mb-2">
              "And, behold, the veil of the temple was rent in twain from the top to the bottom; and the earth did
              quake, and the rocks rent."
            </p>
            <p className="text-sm font-semibold">- Matthew 27:51 (KJV)</p>
          </div>
          <p className="mb-4">
            The veil that separated the Holy Place from the Most Holy Place was torn from top to bottom—by God's own
            hand. This symbolized that the way into God's presence was now open to all who would come through Christ.
            The earthly sanctuary had served its purpose.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The New Testament Teaching</h3>
          <p className="mb-4">
            After the cross, the New Testament writers consistently taught that the church is now God's temple:
          </p>
          <div className="my-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r">
            <p className="mb-2">
              "Know ye not that ye are the temple of God, and that the Spirit of God dwelleth in you? If any man defile
              the temple of God, him shall God destroy; for the temple of God is holy, which temple ye are."
            </p>
            <p className="text-sm font-semibold">- 1 Corinthians 3:16-17 (KJV)</p>
          </div>
          <div className="my-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 rounded-r">
            <p className="mb-2">
              "And what agreement hath the temple of God with idols? for ye are the temple of the living God; as God
              hath said, I will dwell in them, and walk in them; and I will be their God, and they shall be my people."
            </p>
            <p className="text-sm font-semibold">- 2 Corinthians 6:16 (KJV)</p>
          </div>
          <div className="my-6 p-4 bg-pink-50 dark:bg-pink-900/20 border-l-4 border-pink-500 rounded-r">
            <p className="mb-2">
              "Now therefore ye are no more strangers and foreigners, but fellowcitizens with the saints, and of the
              household of God; And are built upon the foundation of the apostles and prophets, Jesus Christ himself
              being the chief corner stone; In whom all the building fitly framed together groweth unto an holy temple
              in the Lord: In whom ye also are builded together for an habitation of God through the Spirit."
            </p>
            <p className="text-sm font-semibold">- Ephesians 2:19-22 (KJV)</p>
          </div>
          <div className="my-6 p-4 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-500 rounded-r">
            <p className="mb-2">
              "Ye also, as lively stones, are built up a spiritual house, an holy priesthood, to offer up spiritual
              sacrifices, acceptable to God by Jesus Christ."
            </p>
            <p className="text-sm font-semibold">- 1 Peter 2:5 (KJV)</p>
          </div>
          <p className="mb-4">
            The evidence is overwhelming: The church is now God's temple. It is a spiritual temple, built not with
            stones and mortar, but with living stones—believers who have been transformed by the grace of God.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Indifference of the Early Church</h3>
          <p className="mb-4">
            It is remarkable that the early disciples, nearly all of whom were Jews, showed an unusual indifference
            toward the physical temple after the cross. They understood that Jesus was the true Lamb of God, and that
            the temple's sacrificial system had been fulfilled in His death. They recognized the establishment of a new
            spiritual temple and priesthood.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Antichrist in the Temple</h3>
          <p className="mb-4">
            With this understanding, Paul's words in 2 Thessalonians 2:4 take on new meaning. The antichrist power would
            not sit in a rebuilt Jewish temple, but would seat itself over the church of God, claiming the worship and
            authority that belongs only to Jesus Christ.
          </p>
          <p className="mb-4">
            Historically, Protestant scholars have consistently applied this prophecy to the papal power and its
            influence within Christianity. The papacy has indeed seated itself in the temple of God (the church),
            claiming divine prerogatives and demanding the worship that belongs to Christ alone.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">No Biblical Promise of Rebuilding</h3>
          <p className="mb-4">
            It is crucial to understand that there is no prophecy, promise, or commandment in the Bible that says the
            temple would be rebuilt after the Romans destroyed it in A.D. 70. While it might very well be rebuilt for
            political or religious reasons, such a rebuilding would have no prophetic significance according to
            Scripture.
          </p>
          <p className="mb-4">
            Jesus' prophecy that not one stone would be left upon another seemed to be of an extremely final tone. The
            old covenant system had ended. The new covenant had begun. The physical temple had given way to the
            spiritual temple.
          </p>
        </section>

        {/* Chapter 9: The Grafted Olive Tree */}
        <section id="olive-tree" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">The Grafted Olive Tree</h2>
          <p className="mb-4">
            Paul's analogy of the olive tree in Romans 11 provides one of the clearest explanations of how Gentiles
            become part of spiritual Israel. This passage is crucial for understanding God's method of salvation and the
            unity of His people.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Natural Olive Tree</h3>
          <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r">
            <p className="mb-2">
              "And if some of the branches be broken off, and thou, being a wild olive tree, wert grafted in among them,
              and with them partakest of the root and fatness of the olive tree; Boast not against the branches. But if
              thou boast, thou bearest not the root, but the root thee."
            </p>
            <p className="text-sm font-semibold">- Romans 11:17-18 (KJV)</p>
          </div>
          <p className="mb-4">In Paul's analogy:</p>
          <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
            <li>The olive tree represents Israel—God's covenant people</li>
            <li>The root represents the covenant promises made to Abraham</li>
            <li>The natural branches represent ethnic Jews</li>
            <li>The wild branches represent Gentiles</li>
            <li>The grafting process represents salvation by faith</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Broken Branches</h3>
          <p className="mb-4">Paul explains that some of the natural branches were broken off because of unbelief:</p>
          <div className="my-6 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r">
            <p className="mb-2">
              "Well; because of unbelief they were broken off, and thou standest by faith. Be not highminded, but fear:
              For if God spared not the natural branches, take heed lest he also spare not thee."
            </p>
            <p className="text-sm font-semibold">- Romans 11:20-21 (KJV)</p>
          </div>
          <p className="mb-4">
            This is a sobering truth: ethnic heritage provides no guarantee of salvation. Natural branches can be broken
            off if they do not maintain faith. The determining factor is not genetics but faith.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Grafting of Wild Branches</h3>
          <p className="mb-4">When Gentiles are saved, they are grafted into the same olive tree:</p>
          <div className="my-6 p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded-r">
            <p className="mb-2">
              "For if thou wert cut out of the olive tree which is wild by nature, and wert grafted contrary to nature
              into a good olive tree: how much more shall these, which be the natural branches, be grafted into their
              own olive tree?"
            </p>
            <p className="text-sm font-semibold">- Romans 11:24 (KJV)</p>
          </div>
          <p className="mb-4">
            This grafting is "contrary to nature"—normally, you would graft a good branch into a wild tree to improve
            it. But God does the opposite: He grafts wild branches (Gentiles) into the good tree (Israel) to save them.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">One Tree, One People</h3>
          <p className="mb-4">
            The crucial point is that there is only one olive tree. Gentiles are not grafted into a separate tree—they
            become part of the same tree, partaking of the same root, receiving the same nourishment, enjoying the same
            covenant promises.
          </p>
          <p className="mb-4">
            This eliminates any notion of separate peoples with separate destinies. There is one tree, one root, one
            people of God.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Warning Against Pride</h3>
          <p className="mb-4">Paul warns the grafted branches against pride:</p>
          <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r">
            <p className="mb-2">
              "Boast not against the branches. But if thou boast, thou bearest not the root, but the root thee."
            </p>
            <p className="text-sm font-semibold">- Romans 11:18 (KJV)</p>
          </div>
          <p className="mb-4">
            Gentile Christians must never forget that they have been grafted into a Jewish tree. They owe their
            spiritual heritage to the Jewish people through whom the Scriptures were preserved and the Messiah came.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Possibility of Restoration</h3>
          <p className="mb-4">Paul also holds out hope for the restoration of broken natural branches:</p>
          <div className="my-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r">
            <p className="mb-2">
              "And they also, if they abide not still in unbelief, shall be grafted in: for God is able to graft them in
              again."
            </p>
            <p className="text-sm font-semibold">- Romans 11:23 (KJV)</p>
          </div>
          <p className="mb-4">
            Jewish people who accept Jesus as their Messiah can be grafted back into their own olive tree. They do not
            cease to be Jewish when they become Christians—they become completed Jews, finding the fulfillment of all
            that their heritage pointed toward.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Mystery Revealed</h3>
          <p className="mb-4">Paul calls this understanding a "mystery":</p>
          <div className="my-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 rounded-r">
            <p className="mb-2">
              "For I would not, brethren, that ye should be ignorant of this mystery, lest ye should be wise in your own
              conceits; that blindness in part is happened to Israel, until the fulness of the Gentiles be come in."
            </p>
            <p className="text-sm font-semibold">- Romans 11:25 (KJV)</p>
          </div>
          <p className="mb-4">
            The mystery is that the gospel would go to the Gentiles, and that they would become part of Israel through
            faith. This was not God's "Plan B"—it was His plan from the beginning, foreshadowed in the Old Testament and
            revealed in the New.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">All Israel Saved</h3>
          <p className="mb-4">With this understanding, Paul's conclusion makes perfect sense:</p>
          <div className="my-6 p-4 bg-pink-50 dark:bg-pink-900/20 border-l-4 border-pink-500 rounded-r">
            <p className="mb-2">
              "And so all Israel shall be saved: as it is written, There shall come out of Sion the Deliverer, and shall
              turn away ungodliness from Jacob: For this is my covenant unto them, when I shall take away their sins."
            </p>
            <p className="text-sm font-semibold">- Romans 11:26-27 (KJV)</p>
          </div>
          <p className="mb-4">
            All Israel—spiritual Israel, consisting of both Jewish and Gentile believers grafted into the same olive
            tree—will indeed be saved. This is not ethnic favoritism but spiritual reality.
          </p>
        </section>

        {/* Chapter 10: The Great Deception Revealed */}
        <section id="great-deception" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">The Great Deception Revealed</h2>
          <p className="mb-4">
            Now we come to the heart of the matter. Why is there so much confusion in the Christian world about Israel
            in prophecy? Why do millions of sincere believers have their eyes fixed on the Middle East, expecting a
            rebuilt temple and a literal fulfillment of Old Testament promises to ethnic Jews? The answer lies in one of
            the most successful deceptions ever perpetrated upon the church.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Brood Parasite</h3>
          <p className="mb-4">
            The enemy of souls has skillfully injected a "brood parasite" into the theology of the church—a deception so
            insidious that it is being nurtured and fed while biblical truth starves with neglect. This deception has
            effectively redirected the church's prophetic focus away from the critical issues of our time and toward a
            literalistic interpretation of prophecy that serves the enemy's purposes.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Foundation of Sand</h3>
          <p className="mb-4">
            The popular interpretation of end-time prophecy, which focuses heavily on a literal, ethnic Israel and a
            rebuilt temple, is built upon a foundation of sand. This interpretation has been carefully constructed over
            centuries to distract from the true meaning of Scripture and to divert attention from the critical issues of
            our time.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">It's Happened Before</h3>
          <p className="mb-4">
            History teaches us that God's people have made this mistake before. When Christ came the first time, the
            religious leaders and common people alike had their eyes fixed on the wrong things. They expected a
            political messiah who would overthrow the Romans and establish an earthly kingdom. They interpreted
            spiritual prophecies in a literal, carnal manner. The result? They crucified their own Messiah and rejected
            the very salvation they claimed to be seeking.
          </p>
          <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r">
            <p className="italic">"He came unto his own, and his own received him not" (John 1:11, KJV).</p>
          </div>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Same Mistake Today</h3>
          <p className="mb-4">
            The church today is making the same mistake that Israel made in the first century. They are looking for an
            earthly kingdom and a physical fulfillment of prophecy, while Jesus declared that the kingdom of God is
            within (Luke 17:20-21). This literalistic approach to prophecy has blinded millions to the spiritual truths
            of God's Word.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Historical Roots of the Deception</h3>
          <p className="mb-4">
            The modern understanding of prophetic Israel is not rooted in the teachings of Jesus or the apostles, nor in
            the writings of the early church fathers. It emerged much later, as a strategic maneuver during the
            Counter-Reformation.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Jesuit Architects</h3>
          <p className="mb-4">
            During the 16th century, the Catholic Church, facing the challenge of the Protestant Reformation, developed
            new interpretive strategies to defend its position. Key figures within the Jesuit order, such as Francisco
            Ribera and Cardinal Bellarmine, introduced and popularized "futurism"—the idea that most of the prophecies
            in Daniel and Revelation refer to a distant future period, typically a seven-year tribulation, involving a
            literal Israel and a rebuilt temple.
          </p>
          <p className="mb-4">
            This new interpretive framework served a critical purpose: to shift the focus away from identifying the
            papacy as the Antichrist, which was the unanimous view of the Reformers. By relegating prophetic fulfillment
            to a future period and a literal Israel, the Jesuits sought to absolve the papacy of its alleged role in
            biblical prophecy.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Infiltration Process</h3>
          <p className="mb-4">
            Over time, these futurist interpretations, initially designed to counter the Reformation, gradually
            infiltrated Protestant theology. They were adopted by various theologians and movements, often without a
            thorough examination of their historical origins or their congruence with the teachings of Scripture.
          </p>
          <p className="mb-4">
            Figures like John Nelson Darby in the 19th century played a significant role in popularizing
            dispensationalism, a form of futurism that further cemented the idea of a distinct future for ethnic Israel
            separate from the church. This theology, often disseminated through Bible schools and prophecy conferences,
            became widely accepted within evangelical circles.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Modern Result</h3>
          <p className="mb-4">
            Today, the dominant prophetic viewpoint in much of Christianity is a literalistic, futurist interpretation
            that centers on ethnic Israel. This has led to an intense focus on political events in the Middle East, the
            expectation of a rebuilt temple, and a belief that God's end-time plan is exclusively tied to the modern
            state of Israel.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Tragic Irony</h3>
          <p className="mb-4">
            The tragic irony is that while millions are looking to the Middle East for signs of the end, the true temple
            of God—the church—is being built up around the world, and the final test of loyalty is unfolding not in a
            physical building but in the hearts and minds of individuals. The deception has been so effective that it
            has caused many to miss the very signs of the times that Jesus Himself warned His followers to watch for.
          </p>
        </section>

        {/* Chapter 11: The Reformers' Testimony */}
        <section id="reformers" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">The Reformers' Unanimous Testimony</h2>
          <p className="mb-4">
            A critical, yet often overlooked, aspect of biblical prophecy is the unanimous consensus among the
            Protestant Reformers regarding the identity of the Antichrist and the fulfillment of end-time prophecies.
            Their understanding stood in stark contrast to the interpretations that later emerged and became dominant.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Historical Protestant Position</h3>
          <p className="mb-4">
            From the 16th century onwards, virtually every major Protestant Reformer identified the papacy—the office
            and institution of the Roman Catholic Church—as the Antichrist power described in Daniel and Revelation.
            This was not a fringe belief but the prevailing view within the Protestant movement.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Extensive Quotes from the Reformers</h3>
          <p className="mb-4">
            The evidence for this position is overwhelming and can be found in the writings of numerous key figures:
          </p>

          <div className="space-y-6 my-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-bold mb-2">John Wycliffe (14th Century):</h4>
              <p className="mb-2">
                "Therefore the pope is Antichrist, that same proud, worldly priest, the head of all the church
                militant."
              </p>
              <p className="text-sm">('The Marrow of the Bible', c. 1388)</p>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-bold mb-2">Jan Hus (15th Century):</h4>
              <p className="mb-2">
                "If I have ever seen in the Roman Church that which is the head of all wickedness, a limb of Antichrist,
                a publican, a devil, or a demon, it is the pope."
              </p>
              <p className="text-sm">('De Ecclesia', 1520)</p>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-bold mb-2">Martin Luther (16th Century):</h4>
              <p className="mb-2">"We here are of the conviction that the papacy is the true Antichrist."</p>
              <p className="text-sm">('On the Councils and the Church', 1539)</p>
              <p className="mb-2">"The Pope is not the successor of Peter but the successor of the devil."</p>
              <p className="text-sm">('Assertions Concerning the Pope', 1520)</p>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h4 className="font-bold mb-2">John Calvin (16th Century):</h4>
              <p className="mb-2">
                "I will call him Antichrist, because he makes himself equal with God, yea, prefers himself to God... he
                sits in the temple of God."
              </p>
              <p className="text-sm">('Institutes of the Christian Religion', Book IV, Chapter 7)</p>
            </div>

            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h4 className="font-bold mb-2">Thomas Cranmer (Archbishop of Canterbury, 16th Century):</h4>
              <p className="mb-2">
                "Wherefore the bishop of Rome is that Antichrist, that enemy of God and his Christ, that same pestilent
                serpent."
              </p>
              <p className="text-sm">('Catechism', 1548)</p>
            </div>

            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <h4 className="font-bold mb-2">John Knox (16th Century):</h4>
              <p className="mb-2">
                "The Pope is the very Antichrist, and the kingdom of the Roman Antichrist is the Pope and his Prelates."
              </p>
              <p className="text-sm">('An Answer to a Letter of a Certain Blackstaf', 1558)</p>
            </div>

            <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
              <h4 className="font-bold mb-2">Roger Williams (17th Century, Founder of Rhode Island):</h4>
              <p className="mb-2">"The Papacy is Antichristian, the Pope is Antichrist."</p>
              <p className="text-sm">('The Bloudy Tenent of Persecution', 1644)</p>
            </div>

            <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
              <h4 className="font-bold mb-2">John Wesley (18th Century):</h4>
              <p className="mb-2">"I believe the Pope to be the Antichrist."</p>
              <p className="text-sm">('Explanatory Notes Upon the New Testament', Revelation 13)</p>
            </div>

            <div className="p-4 bg-lime-50 dark:bg-lime-900/20 rounded-lg">
              <h4 className="font-bold mb-2">Westminster Confession of Faith (1646):</h4>
              <p className="mb-2">
                "There be no other head of the Church but the Lord Jesus Christ: nor can the Pope of Rome, in any sense,
                be head thereof; but is that Antichrist, that man of sin, and son of perdition, that exalts himself in
                the church..."
              </p>
              <p className="text-sm">('Chapter 25, Of the Church')</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Biblical Foundation</h3>
          <p className="mb-4">
            The Reformers' identification of the papacy as Antichrist was based on their interpretation of biblical
            prophecies, particularly those in Daniel 7, 11, and 12, and 2 Thessalonians 2, and Revelation 13. They saw
            the papacy as a blasphemous power that usurped Christ's authority, persecuted true believers, and promoted a
            false gospel.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Prophetic Time Periods</h3>
          <p className="mb-4">
            The Reformers understood the prophetic time periods mentioned in Daniel (e.g., the 1260 days, often
            interpreted as years) to refer to the duration of papal dominance. They saw the rise of the papacy in the
            early centuries of Christianity and its oppressive reign throughout the Middle Ages as the fulfillment of
            these prophecies.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Unanimous Consensus</h3>
          <p className="mb-4">
            The consensus among the Reformers was so strong that it became a defining characteristic of the Protestant
            faith. This interpretation was not a minor detail but a central tenet that fueled the Reformation itself. It
            was a matter of profound conviction based on their reading of Scripture.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Tragic Reversal</h3>
          <p className="mb-4">
            It was only later, through the influence of Jesuit scholars and the subsequent development of futurist and
            dispensationalist theology, that this unanimous Protestant understanding began to be eroded. The focus
            shifted from the papacy to a future Antichrist and a literal, ethnic Israel, effectively neutralizing the
            prophetic message that had been so crucial to the Reformation.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Relevance for Israel</h3>
          <p className="mb-4">
            Understanding the Reformers' position is crucial because it highlights a critical departure from sound
            biblical interpretation. Their identification of the Antichrist power directly impacts how we understand
            prophecy concerning Israel. If the Antichrist is a historical, papal power, then the prophecies concerning
            the "end times" are not primarily about a future literal Israel but about the ongoing spiritual conflict
            between Christ and the forces of apostasy.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Need for Restoration</h3>
          <p className="mb-4">
            Restoring the Reformers' sound biblical interpretation is essential for a correct understanding of prophecy.
            It means returning to the original Protestant understanding that the true "Israel" in end-time prophecy is
            spiritual Israel—all who are in Christ—and that the great end-time deception is not centered on a physical
            nation but on the spiritual apostasy that began centuries ago.
          </p>
        </section>

        {/* Chapter 12: Modern Implications */}
        <section id="modern-implications" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">Modern Implications and the Final Test</h2>
          <p className="mb-4">
            Understanding spiritual Israel is not merely an academic exercise; it has profound implications for our
            understanding of current events, end-time prophecy, and the final test that will face every soul on earth.
            The biblical narrative converges on a clear delineation of God's faithful people and the forces arrayed
            against them.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Remnant Described</h3>
          <p className="mb-4">
            Revelation 12 provides a powerful depiction of the faithful remnant in the end times. This remnant is
            characterized by their steadfast adherence to God's truth in the face of intense opposition.
          </p>
          <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r">
            <p className="mb-2">
              "And the dragon was wroth with the woman, and went to make war with the remnant of her seed, which keep
              the commandments of God, and have the testimony of Jesus Christ."
            </p>
            <p className="text-sm font-semibold">- Revelation 12:17 (KJV)</p>
          </div>
          <p className="mb-4">
            This remnant is not defined by ethnicity or nationality but by their obedience to God's commandments and
            their faith in Jesus.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The 144,000</h3>
          <p className="mb-4">
            Revelation 7 describes the 144,000 who are sealed by God. This group represents the complete number of God's
            redeemed people who stand firm through the final crisis. Their sealing signifies ownership by God and
            protection from His judgments. They are identified as being from the "tribes of the children of Israel"
            (Revelation 7:4), but this is symbolic language referring to the spiritual Israel—all who are born of God's
            Spirit.
          </p>
          <p className="mb-4">
            The number 144,000 (12 x 12 x 1000) suggests completeness and the fulfillment of God's covenant people from
            both Old and New Testament eras.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Commandments of God</h3>
          <p className="mb-4">
            Central to the identity of the faithful remnant and the final test is the keeping of "the commandments of
            God." This includes the Ten Commandments, particularly the fourth commandment regarding the Sabbath, which
            serves as a distinctive sign of loyalty to God as Creator.
          </p>
          <div className="my-6 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r">
            <p className="mb-2">
              "Here is the patience of the saints: here are they that keep the commandments of God, and the faith of
              Jesus."
            </p>
            <p className="text-sm font-semibold">- Revelation 14:12 (KJV)</p>
          </div>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Final Test</h3>
          <p className="mb-4">
            The ultimate test of loyalty in the end times will involve a choice between obeying human authority and
            obeying God's commandments. This test will be intensified by a powerful, deceptive force that seeks to
            compel worship according to its own dictates.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Mark of the Beast vs. the Seal of God</h3>
          <p className="mb-4">
            Revelation presents two opposing seals: the Mark of the Beast and the Seal of God. The Mark of the Beast
            represents allegiance to the beastly powers (which historically and biblically point to apostate religious
            and civil systems). The Seal of God represents true allegiance to the Creator.
          </p>
          <p className="mb-4">
            The final test will force individuals to choose which mark they will receive—a mark of submission to human
            authority that contradicts God's law, or the Seal of God, indicating loyalty to the Creator, expressed
            through obedience to His commandments.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Three Angels' Messages</h3>
          <p className="mb-4">
            Revelation 14 contains the vital messages of the three angels, which serve as a final warning and invitation
            to God's people before the end. These messages call for "the hour of his judgment" to be feared, for the
            worship of the Creator, and warn against receiving the Mark of the Beast.
          </p>
          <p className="mb-4">
            These messages are a clarion call to discern spiritual truth from deception, especially concerning worship
            and loyalty.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Global Nature of the Test</h3>
          <p className="mb-4">
            The final test will be global in scope. Through the control of economic systems and the manipulation of
            religious and political powers, a worldwide decree will be enforced, demanding allegiance to the false
            system. It will be a test of conscience and faith, challenging individuals to choose whom they will obey.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Victory of Spiritual Israel</h3>
          <p className="mb-4">
            Despite the intense opposition, Revelation assures us that God's faithful people—spiritual Israel—will
            ultimately triumph. They will stand firm, rooted in their faith in Christ and their obedience to God's law.
          </p>
          <div className="my-6 p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded-r">
            <p className="mb-2">
              "And they overcame him by the blood of the Lamb, and by the word of their testimony; and they loved not
              their lives unto the death."
            </p>
            <p className="text-sm font-semibold">- Revelation 12:11 (KJV)</p>
          </div>
          <p className="mb-4">
            This victory is achieved not through earthly power but through the sacrifice of Christ, the power of His
            Word, and a willingness to remain faithful even unto death.
          </p>
        </section>

        {/* Chapter 13: Speaking the Truth in Love */}
        <section id="truth-in-love" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">Speaking the Truth in Love</h2>
          <p className="mb-4">
            In addressing the complex and often contentious topic of Israel in prophecy, it is imperative that we do so
            with both uncompromising biblical truth and genuine Christian love. The goal is not to condemn but to
            enlighten, to call people out of deception into the liberating truth of the gospel.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Love for the Jewish People</h3>
          <p className="mb-4">
            Our investigation into spiritual Israel must be grounded in a deep and abiding love for the Jewish people.
            They are the ancestral lineage through whom God's redemptive plan unfolded, bringing forth the Scriptures,
            the patriarchs, the prophets, and ultimately, the Messiah Himself. Any discussion that lacks respect or
            compassion for them is fundamentally flawed.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">Love for All People</h3>
          <p className="mb-4">
            Equally important is our love for all people, regardless of their ethnic background. The gospel is for
            everyone—Jews and Gentiles alike. Christ's command to love our neighbor extends to all humanity, and our
            understanding of Israel should reflect this universal scope of God's redemptive plan.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">
            Avoiding the Extremes (Anti-Semitism and Ethnic Favoritism)
          </h3>
          <p className="mb-4">In discussing Israel, it is crucial to steer clear of two dangerous extremes:</p>
          <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
            <li>
              <strong>Anti-Semitism:</strong> A spirit of hatred or prejudice against Jewish people is utterly contrary
              to the Christian faith. The Bible condemns all forms of prejudice and demands love and respect for all of
              God's creation.
            </li>
            <li>
              <strong>Ethnic Favoritism:</strong> Conversely, elevating ethnic Israel above spiritual Israel, or
              suggesting that God has a separate plan for ethnic Jews apart from Christ, also misses the mark. This can
              lead to a misapplication of prophecy and a neglect of the universal nature of the gospel.
            </li>
          </ol>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Biblical Balance</h3>
          <p className="mb-4">
            The Bible strikes a careful balance. It acknowledges the historical significance of ethnic Israel and God's
            unique dealings with them, while simultaneously emphasizing that true spiritual relationship with God is
            based on faith in Christ, not on lineage. The "Israel of God" encompasses all who believe, transforming
            ethnic and social barriers into unity in Christ.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Heart of the Gospel</h3>
          <p className="mb-4">
            The core message of the gospel is unity in Christ. Ephesians 2:14-16 powerfully illustrates how Christ broke
            down the dividing wall between Jews and Gentiles, making them "one new man." This reconciliation is the
            heart of God's plan, and our understanding of Israel must align with this central truth.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Mission Imperative</h3>
          <p className="mb-4">
            Jesus commanded His followers to go into all the world and preach the gospel (Matthew 28:19-20). This
            mission includes both Jewish and Gentile people. Our love for truth should compel us to share these vital
            prophetic understandings with all, without prejudice or favoritism.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Spirit of Truth and Love</h3>
          <p className="mb-4">
            Paul's exhortation in Ephesians 4:15 guides us: "but speaking the truth in love, may grow up into him in all
            things, which is the head, even Christ." We are called to speak the truth clearly and boldly, but always
            within the framework of love. This means approaching discussions with humility, empathy, and a genuine
            desire for the well-being of those with whom we engage.
          </p>
        </section>

        {/* Chapter 14: Conclusion */}
        <section id="conclusion" className="mb-12 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6">Conclusion: The Israel of God</h2>
          <p className="mb-4">
            As we reach the end of this comprehensive investigation, the biblical answer to our original question
            becomes crystal clear:{" "}
            <strong>
              The Israel that the Bible speaks of in its end-time prophecies is spiritual Israel—all who have faith in
              Jesus Christ and, by His Spirit, keep the commandments of God.
            </strong>
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Evidence is Overwhelming</h3>
          <p className="mb-4">Throughout this study, we have examined overwhelming biblical evidence:</p>
          <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
            <li>
              Christ's own declaration that worship would no longer be tied to physical locations but would be "in
              spirit and in truth"
            </li>
            <li>
              The name "Israel" originally meant spiritual victory and was always intended to represent those who
              prevail with God
            </li>
            <li>The stunning parallels between Jesus and Israel's history, showing that Christ is the true Israel</li>
            <li>
              Paul's clear teaching that there are two Israels—one according to the flesh and one according to the
              Spirit
            </li>
            <li>The Old Testament foundations showing that God's plan always included people from all nations</li>
            <li>
              The new covenant being made exclusively with Israel—requiring Gentiles to be grafted into the olive tree
            </li>
            <li>The temple being transformed from a physical building to a spiritual house—the church</li>
            <li>The grafted olive tree demonstrating that all believers become part of the same Israel</li>
            <li>The historical deception that has obscured these truths through the Counter-Reformation strategy</li>
            <li>The Reformers' unanimous testimony identifying the true antichrist power</li>
          </ol>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Unity of God's People</h3>
          <div className="my-6 p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded-r">
            <p className="mb-2">
              "For he is our peace, who hath made both one, and hath broken down the middle wall of partition between
              us; Having abolished in his flesh the enmity, even the law of commandments contained in ordinances; for to
              make in himself of twain one new man, so making peace; And that he might reconcile both unto God in one
              body by the cross, having slain the enmity thereby."
            </p>
            <p className="text-sm font-semibold">- Ephesians 2:14-16 (KJV)</p>
          </div>
          <p className="mb-4">
            Christ has made both Jewish and Gentile believers "one new man." There is no longer a middle wall of
            partition. All who believe are part of the same spiritual nation, the same holy temple, the same royal
            priesthood.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Completed Mission</h3>
          <p className="mb-4">
            Jesus declared on the cross, "It is finished" (John 19:30, KJV). His mission to redeem humanity was
            accomplished. The work of establishing His kingdom and forming His spiritual Israel was begun and is
            inaugurated through His people.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Final Test</h3>
          <p className="mb-4">
            As we approach the end of earth's history, the question of spiritual Israel becomes increasingly important.
            The final test will not be based on ethnic heritage or national citizenship, but on loyalty to God and His
            commandments:
          </p>
          <div className="my-6 p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-r">
            <p className="mb-2">
              "Here is the patience of the saints: here are they that keep the commandments of God, and the faith of
              Jesus."
            </p>
            <p className="text-sm font-semibold">- Revelation 14:12 (KJV)</p>
          </div>
          <p className="mb-4">Those who belong to spiritual Israel will be identified by two characteristics:</p>
          <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
            <li>
              They keep the commandments of God (including the Sabbath commandment that identifies God as Creator)
            </li>
            <li>They have the faith of Jesus (trusting in His righteousness for salvation)</li>
          </ol>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Eternal Perspective</h3>
          <p className="mb-4">
            Our focus must be on eternal realities, not fleeting earthly kingdoms. The true blessings and promises of
            God are spiritual and eternal, fulfilled in Christ and available to all who believe.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Great Commission Fulfilled</h3>
          <p className="mb-4">
            The Great Commission to preach the gospel to all nations finds its ultimate fulfillment as people from every
            "tribe, and tongue, and people, and nation" (Revelation 5:9, KJV) are brought into the spiritual Israel
            through faith in Christ.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Character of God Vindicated</h3>
          <p className="mb-4">
            By establishing a spiritual Israel that transcends ethnic boundaries, God vindicates His character as a God
            of love, justice, and inclusion. His plan is not limited by human divisions but embraces all who seek Him
            with a sincere heart.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Call to Decision</h3>
          <p className="mb-4">
            As we conclude this study, each reader must make a personal decision. Will you accept the clear biblical
            teaching about spiritual Israel, or will you continue to hold to interpretations that have been influenced
            by the Counter-Reformation deception?
          </p>
          <p className="mb-4">
            Will you join the ranks of spiritual Israel—those who keep the commandments of God and have the faith of
            Jesus? Will you worship the Creator according to His Word rather than according to human tradition?
          </p>
          <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r">
            <p className="mb-2">
              "And if it seem evil unto you to serve the LORD, choose you this day whom ye will serve; whether the gods
              which your fathers served that were on the other side of the flood, or the gods of the Amorites, in whose
              land ye dwell: but as for me and my house, we will serve the LORD."
            </p>
            <p className="text-sm font-semibold">- Joshua 24:15 (KJV)</p>
          </div>

          <h3 className="text-2xl font-semibold mt-8 mb-4">The Final Word</h3>
          <div className="my-6 p-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg">
            <p className="mb-4">
              This is the glorious truth of the gospel: in Christ, we are all one. We are all Abraham's seed. We are all
              heirs according to the promise. We are all part of the Israel of God.
            </p>
            <p className="italic">
              "And if ye be Christ's, then are ye Abraham's seed, and heirs according to the promise." - Galatians 3:29
              (KJV)
            </p>
          </div>
          <p className="mb-4">
            May God help us to understand these truths, to share them in love, and to live them out in our daily lives
            as we await the soon return of our Lord and Savior Jesus Christ, who will gather His people—spiritual
            Israel—from the four corners of the earth to be with Him forever.
          </p>
          <div className="my-6 p-4 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-r">
            <p className="mb-2">
              "And he shall send his angels with a great sound of a trumpet, and they shall gather together his elect
              from the four winds, from one end of heaven to the other."
            </p>
            <p className="text-sm font-semibold">- Matthew 24:31 (KJV)</p>
          </div>
          <p className="mb-4 text-center text-xl font-semibold italic">Even so, come, Lord Jesus.</p>
        </section>

        {/* References */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">References and Further Study</h2>
          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="font-semibold mb-2">1. The Great Deception</p>
              <p className="text-sm">
                A comprehensive study of how futurism and dispensationalism entered Protestant churches through the
                Counter-Reformation strategy
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="font-semibold mb-2">2. Spiritual Israel</p>
              <p className="text-sm">Additional biblical study on this topic by Doug Batchelor and Steve Wohlberg</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="font-semibold mb-2">3. Reformers' View on Antichrist and Quotes on the Jesuits</p>
              <p className="text-sm">
                Historical documentation of Protestant identification of the papal antichrist and the development of
                futurist interpretation
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="font-semibold mb-2">4. The Sabbath Truth</p>
              <p className="text-sm">
                Biblical and historical evidence for the seventh-day Sabbath as the seal of God and the final test of
                loyalty
              </p>
            </div>
          </div>
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r">
            <p className="mb-2 italic">
              "Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the
              word of truth." - 2 Timothy 2:15 (KJV)
            </p>
            <p className="italic">"Sanctify them through thy truth: thy word is truth." - John 17:17 (KJV)</p>
          </div>
        </section>

        {/* Final Note */}
        <div className="mt-12 p-6 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-500 rounded-lg">
          <p className="italic text-center">
            This study has been prepared with deep love and respect for all people, recognizing that "God so loved the
            world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have
            everlasting life" (John 3:16, KJV). May the truth contained herein be received in the spirit of love in
            which it is offered, and may it lead all readers to a deeper understanding of God's magnificent plan of
            salvation.
          </p>
        </div>
      </div>

      {/* Social Share Bottom */}
      <div className="mt-12 pt-8 border-t">
        <SocialShare url={currentUrl} title="What Israel is The Bible Speaking Of?" />
      </div>

      {/* Related Articles */}
      <div className="mt-12">
        <RelatedArticles currentSlug="what-israel-is-the-bible-speaking-of" />
      </div>
    </article>
  )
}
