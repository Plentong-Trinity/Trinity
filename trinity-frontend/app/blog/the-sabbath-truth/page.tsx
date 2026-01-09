import type { Metadata } from "next"
import Image from "next/image"
import { RelatedArticles } from "@/components/related-articles"
import { SocialShare } from "@/components/social-share"

export const metadata: Metadata = {
  title:
    "The Sabbath Truth: The Day God Sanctified, Rome Abolished, and Faithful Witnesses Preserved Through Blood | Immutable",
  description:
    "A comprehensive exposé tracing the golden thread of Sabbath truth from the Apostolic Church through centuries of persecution to the final crisis. Discover how the Jesuit order, Freemasonry, and Rome changed God's holy day.",
  openGraph: {
    title: "The Sabbath Truth: The Day God Sanctified, Rome Abolished, and Faithful Witnesses Preserved Through Blood",
    description:
      "A comprehensive exposé tracing Sabbath truth through centuries of persecution. Discover how Rome changed God's holy day and why faithful witnesses chose death over compromise.",
    images: [
      {
        url: "https://historictruth.org/sabbath-truth-image.png",
        width: 1200,
        height: 630,
        alt: "The Sabbath Truth - Ten Commandments and Remember the Sabbath Day",
      },
    ],
    type: "article",
    publishedTime: "2025-01-21T00:00:00Z",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Sabbath Truth: The Day God Sanctified, Rome Abolished",
    description:
      "A comprehensive exposé tracing Sabbath truth through centuries of persecution. Discover how Rome changed God's holy day.",
    images: ["https://historictruth.org/sabbath-truth-image.png"],
  },
}

export default function SabbathTruthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent leading-tight">
            The Sabbath Truth
          </h1>
          <p className="text-xl md:text-2xl text-foreground font-semibold mb-4 text-balance">
            The Day God Sanctified, Rome Abolished, and Faithful Witnesses Preserved Through Blood
          </p>
          <p className="text-lg text-muted-foreground mb-6 text-balance max-w-3xl mx-auto">
            A Comprehensive Exposé Tracing the Golden Thread of Sabbath Truth from the Apostolic Church Through
            Centuries of Persecution to the Final Crisis.
          </p>
          <p className="text-sm text-muted-foreground mb-2">By: Immutable</p>
          <p className="text-sm text-muted-foreground">January 21, 2025 • 65 min read</p>
        </header>

        {/* Featured Image */}
        <div className="mb-12 rounded-lg overflow-hidden shadow-2xl">
          <Image
            src="/sabbath-truth-image.png"
            alt="The Sabbath Truth - Remember the Sabbath Day to Keep it Holy"
            width={1200}
            height={630}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Social Share */}
        <div className="mb-12 max-w-md mx-auto">
          <SocialShare
            url="https://historictruth.org/blog/the-sabbath-truth"
            title="The Sabbath Truth: The Day God Sanctified, Rome Abolished"
            description="Discover how Rome changed God's holy Sabbath day and why faithful witnesses chose death over compromise"
            hashtags={["SabbathTruth", "BiblicalTruth", "ReligiousHistory"]}
          />
        </div>

        {/* Table of Contents */}
        <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-primary">Table of Contents</h2>
          <nav className="space-y-2">
            <a
              href="#introduction"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium"
            >
              Introduction: A Challenge That Cannot Be Ignored
            </a>
            <a
              href="#chapter-1"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-4"
            >
              Chapter 1: The Linguistic and Covenantal Foundation
            </a>
            <a
              href="#chapter-2"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-4"
            >
              Chapter 2: One Law for All People
            </a>
            <a
              href="#chapter-3"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-4"
            >
              Chapter 3: Christ and the Unchanging Law
            </a>
            <a
              href="#chapter-4"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-4"
            >
              Chapter 4: The Apostolic Witness
            </a>
            <a
              href="#chapter-5"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-4"
            >
              Chapter 5: Answering the Objections
            </a>
            <a
              href="#objection-1"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-8"
            >
              Objection 1: Colossians 2:16-17
            </a>
            <a
              href="#objection-2"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-8"
            >
              Objection 2: Acts 20:7
            </a>
            <a
              href="#chapter-6"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-4"
            >
              Chapter 6: The Prophetic Blueprint
            </a>
            <a
              href="#chapter-7"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-4"
            >
              Chapter 7: The Gradual Apostasy
            </a>
            <a
              href="#chapter-8"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-4"
            >
              Chapter 8: Witnesses in the Wilderness
            </a>
            <a
              href="#chapter-9"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-4"
            >
              Chapter 9: Rome's Stunning Admission
            </a>
            <a
              href="#chapter-10"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-4"
            >
              Chapter 10: The Mark of Papal Authority
            </a>
            <a
              href="#chapter-11"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-4"
            >
              Chapter 11: American Sunday Laws
            </a>
            <a
              href="#chapter-12"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-4"
            >
              Chapter 12: Revelation's Final Warning
            </a>
            <a
              href="#chapter-13"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-4"
            >
              Chapter 13: The Sabbath as a Delight: The Promise of Isaiah 58
            </a>
            <a
              href="#chapter-14"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-4"
            >
              Chapter 14: The Rest That Remains
            </a>
            <a
              href="#conclusion"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium"
            >
              Conclusion: The Final Choice
            </a>
            <a
              href="#references"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium"
            >
              References
            </a>
          </nav>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none dark:prose-invert">
          {/* Introduction */}
          <section id="introduction" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">Introduction: A Challenge That Cannot Be Ignored</h2>

            <p className="mb-4">
              In the autumn of 1893, a remarkable series of editorials appeared in <em>The Catholic Mirror</em>, the
              official newspaper of the Archdiocese of Baltimore under Cardinal James Gibbons. These articles issued a
              direct challenge to the entire Protestant world, one that echoed through churches and seminaries across
              America and Europe. The challenge was devastatingly simple: If Protestants truly lived by the principle of{" "}
              <em>Sola Scriptura</em>—the Bible and the Bible alone—why did they observe Sunday, a day of worship that
              has no biblical authorization whatsoever, but rests solely upon the authority and tradition of the
              Catholic Church?
            </p>

            <p className="mb-4">
              This was not merely a theological debate. It was the public acknowledgment of a prophetic fulfillment that
              had been unfolding for over a millennium. The prophet Daniel, writing six centuries before Christ,
              foretold the rise of a power that would "think to change times and laws" (Daniel 7:25). The book of
              Revelation warned of a final test in which humanity would be divided between those who receive the "mark
              of the beast" and those who "keep the commandments of God, and the faith of Jesus" (Revelation 14:12). At
              the heart of this cosmic conflict stands a single issue: Which day is the true Sabbath of the Lord?
            </p>

            <p className="mb-4">
              This article will demonstrate, through an overwhelming weight of historical, biblical, and prophetic
              evidence, that the seventh-day Sabbath—Saturday—is the only day of worship commanded by God, that its
              change to Sunday was a gradual apostasy orchestrated by the union of church and state, and that faithful
              witnesses throughout history have preserved this truth at the cost of their lives. We will hear testimony
              from hostile sources—Inquisitors and Catholic theologians who documented the Sabbath-keeping of those they
              persecuted. We will hear from neutral historians who recorded the facts without bias. And we will hear
              from the martyrs themselves, whose blood cries out from the pages of history.
            </p>

            <p className="mb-4">
              This is not a message of condemnation, but of urgent appeal. The prophet Hosea warned, "My people are
              destroyed for lack of knowledge: because thou hast rejected knowledge, I will also reject thee... seeing
              thou hast forgotten the law of thy God, I will also forget thy children" (Hosea 4:6, KJV). The call of
              Hebrews echoes to our generation: "To day if ye will hear his voice, harden not your hearts" (Hebrews 4:7,
              KJV). The time to investigate this truth is now.
            </p>
          </section>

          {/* Chapter 1 */}
          <section id="chapter-1" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Chapter 1: The Linguistic and Covenantal Foundation
            </h2>

            <p className="mb-4">
              The Sabbath was not an arbitrary command given at Sinai; it was woven into the very fabric of creation
              itself. When we examine the Hebrew language and the structure of Genesis, we discover that the Sabbath is
              as old as the world.
            </p>

            <p className="mb-4">
              The word <em>Shabbat</em> (תָּבַּשׁ) comes from the Hebrew root <em>shavat</em>, meaning to cease, to end, or
              to rest. In Genesis 2:2-3, we read: "And on the seventh day God ended his work which he had made; and he
              rested on the seventh day from all his work which he had made. And God blessed the seventh day, and
              sanctified it: because that in it he had rested from all his work which God created and made" (KJV). Three
              divine acts established the Sabbath: God rested (<em>shavat</em>), He blessed it, and He sanctified it (
              <em>qadash</em>, שַׁדָק—meaning to set apart for holy use).
            </p>

            <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-6 mb-6">
              <blockquote className="text-lg italic">
                <p className="mb-4">
                  <strong>
                    "And on the seventh day God ended his work which he had made; and he rested on the seventh day from
                    all his work which he had made. And God blessed the seventh day, and sanctified it: because that in
                    it he had rested from all his work which God created and made."
                  </strong>
                </p>
                <cite>— Genesis 2:2-3 (KJV)</cite>
              </blockquote>
            </div>

            <p className="mb-4">
              This sanctification is critical. God did not merely rest; He set the day apart as holy. No other day of
              the week received this blessing. The Sabbath is not interchangeable with any other day, for only the
              seventh day was sanctified by the Creator Himself.
            </p>

            <p className="mb-4">
              When God gave the Ten Commandments at Sinai, the fourth commandment begins with the word "Remember" (
              <em>zakhar</em>, רַכָז). This implies that the Sabbath was already known, already established. The
              commandment is not introducing something new, but calling God's people to remember what had been forgotten
              or neglected.
            </p>

            <p className="mb-4">
              But the Sabbath is more than a memorial of creation. It is a covenant sign. In Exodus 31:13, 16-17, God
              declares:
            </p>

            <div className="bg-green-50 dark:bg-green-950/30 border-l-4 border-green-500 p-6 mb-6">
              <blockquote className="text-lg italic">
                <p className="mb-4">
                  <strong>
                    "Verily my sabbaths ye shall keep: for it is a sign between me and you throughout your generations;
                    that ye may know that I am the LORD that doth sanctify you... Wherefore the children of Israel shall
                    keep the sabbath, to observe the sabbath throughout their generations, for a perpetual covenant. It
                    is a sign between me and the children of Israel for ever: for in six days the LORD made heaven and
                    earth, and on the seventh day he rested, and was refreshed."
                  </strong>
                </p>
                <cite>— Exodus 31:13, 16-17 (KJV)</cite>
              </blockquote>
            </div>

            <p className="mb-4">
              The Hebrew word translated "sign" is <em>'oth</em> (אוֹת), which signifies a mark, a token, or a pledge of
              a covenant relationship. The Sabbath is God's eternal mark of identification—the sign that He is our
              Creator and our Sanctifier. This will become profoundly significant when we examine Revelation's warning
              about the "mark of the beast."
            </p>
          </section>

          {/* Chapter 2 */}
          <section id="chapter-2" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">Chapter 2: One Law for All People</h2>

            <p className="mb-4">
              A common objection to Sabbath observance is that the Ten Commandments, including the Sabbath, were given
              only to the nation of Israel and are not binding on Gentile Christians. This objection crumbles under the
              weight of Scripture itself, which repeatedly declares that God has one standard of righteousness for all
              who serve Him.
            </p>

            <p className="mb-4">In the book of Numbers, God explicitly commanded:</p>

            <div className="bg-purple-50 dark:bg-purple-950/30 border-l-4 border-purple-500 p-6 mb-6">
              <blockquote className="text-lg italic">
                <p className="mb-4">
                  <strong>
                    "And if a stranger shall sojourn among you, and will keep the passover unto the LORD; according to
                    the ordinance of the passover, and according to the manner thereof, so shall he do: ye shall have
                    one ordinance, both for the stranger, and for him that was born in the land."
                  </strong>
                </p>
                <cite>— Numbers 9:14 (KJV)</cite>
              </blockquote>
            </div>

            <p className="mb-4">
              This passage addresses the Passover, a ceremonial observance. If even ceremonial laws applied equally to
              both native-born Israelites and strangers who chose to worship the God of Israel, how much more do the
              eternal moral principles enshrined in the Ten Commandments—written by the finger of God on tables of
              stone—apply to all people?
            </p>

            <p className="mb-4">God removes all doubt by repeating this principle with even greater force:</p>

            <div className="bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-indigo-500 p-6 mb-6">
              <blockquote className="text-lg italic">
                <p className="mb-4">
                  <strong>
                    "One ordinance shall be both for you of the congregation, and also for the stranger that sojourneth
                    with you, an ordinance for ever in your generations: as ye are, so shall the stranger be before the
                    LORD. One law and one manner shall be for you, and for the stranger that sojourneth with you."
                  </strong>
                </p>
                <cite>— Numbers 15:15-16 (KJV)</cite>
              </blockquote>
            </div>

            <p className="mb-4">
              God has one standard. There is no separate law for Jews and Gentiles, no different requirement for those
              born into the covenant and those who enter it by faith. The principle is clear and unchanging: one law for
              all.
            </p>

            <p className="mb-4">
              The New Testament powerfully affirms this truth. The Apostle Paul explains that true identity as a child
              of God is not based on physical lineage, but on faith in Christ:
            </p>

            <div className="bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500 p-6 mb-6">
              <blockquote className="text-lg italic">
                <p className="mb-4">
                  <strong>
                    "And if ye be Christ's, then are ye Abraham's seed, and heirs according to the promise."
                  </strong>
                </p>
                <cite>— Galatians 3:29 (KJV)</cite>
              </blockquote>
            </div>

            <p className="mb-4">
              All who are in Christ become spiritual Israel, grafted into the same covenant family (Romans 11:17-24) and
              subject to the same covenant law of love. The law has not changed; the people of God have expanded to
              include all nations, tribes, and tongues who come to faith in the Messiah.
            </p>
          </section>

          {/* Chapter 3 */}
          <section id="chapter-3" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">Chapter 3: Christ and the Unchanging Law</h2>

            <p className="mb-4">
              Jesus Christ Himself delivered the most powerful and unequivocal testimony to the permanence of His
              Father's law. In the Sermon on the Mount, He declared:
            </p>

            <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-6 mb-6">
              <blockquote className="text-lg italic">
                <p className="mb-4">
                  <strong>
                    "Think not that I am come to destroy the law, or the prophets: I am not come to destroy, but to
                    fulfil. For verily I say unto you, Till heaven and earth pass, one jot or one tittle shall in no
                    wise pass from the law, till all be fulfilled. Whosoever therefore shall break one of these least
                    commandments, and shall teach men so, he shall be called the least in the kingdom of heaven: but
                    whosoever shall do and teach them, the same shall be called great in the kingdom of heaven."
                  </strong>
                </p>
                <cite>— Matthew 5:17-19 (KJV)</cite>
              </blockquote>
            </div>

            <p className="mb-4">
              Christ's statement leaves no room for ambiguity. The law is immutable and will stand as long as heaven and
              earth exist. He did not come to abolish it, but to "fulfil" it—to live it out perfectly, revealing its
              full spiritual depth and divine character. His life of perfect obedience becomes the model for all who
              follow Him.
            </p>

            <p className="mb-4">This obedience was not a burden, but a custom. The Gospel of Luke tells us:</p>

            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-6 mb-6">
              <blockquote className="text-lg italic">
                <p className="mb-4">
                  <strong>
                    "And as His custom was, He went into the synagogue on the Sabbath day, and stood up to read.... and
                    was teaching them on the Sabbaths."
                  </strong>
                </p>
                <cite>— Luke 4:16, 31 (NKJV)</cite>
              </blockquote>
            </div>

            <p className="mb-4">
              Jesus did not merely keep the Sabbath; it was His regular practice, His custom. If we claim to be His
              followers, should we not also follow His example?
            </p>

            <p className="mb-4">
              Even Martin Luther, the great Reformer who championed <em>Sola Scriptura</em>, was forced to admit the
              biblical case for the seventh-day Sabbath. In his 1525 work <em>Against the Heavenly Prophets</em>, Luther
              wrote:
            </p>

            <div className="my-6 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-500 rounded-lg">
              <p className="font-semibold text-lg mb-2">Luther's Admission:</p>
              <p className="italic">
                "If Karlstadt were to write further about the Sabbath, Sunday would have to give way, and the
                Sabbath—that is to say, Saturday—must be kept holy."
              </p>
            </div>

            <p className="mb-4">
              Luther recognized that if one followed Scripture alone, the seventh day would have to be observed. Yet he
              chose tradition over the plain word of Scripture on this point, demonstrating the inconsistency that would
              plague Protestantism for centuries.
            </p>
          </section>

          {/* Chapter 4 */}
          <section id="chapter-4" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">Chapter 4: The Apostolic Witness</h2>

            <p className="mb-4">
              Did the apostles and the early church continue to observe the seventh-day Sabbath after the resurrection
              of Christ? The biblical record is unambiguous. Immediately following the crucifixion—the very moment when
              any change to the Sabbath would have been revealed—the faithful women who followed Jesus demonstrated
              their continued allegiance to the fourth commandment:
            </p>

            <div className="bg-teal-50 dark:bg-teal-950/30 border-l-4 border-teal-500 p-6 mb-6">
              <blockquote className="text-lg italic">
                <p className="mb-4">
                  <strong>
                    "And they returned, and prepared spices and ointments; and rested the sabbath day according to the
                    commandment."
                  </strong>
                </p>
                <cite>— Luke 23:56 (KJV)</cite>
              </blockquote>
            </div>

            <p className="mb-4">
              Even in their grief, their practice was clear: they rested on the Sabbath "according to the commandment."
              There is no hint of a new day of worship, no suggestion that the Sabbath had been transferred or abolished
              at the cross. They continued in the footsteps of their Master, who had declared Himself "Lord even of the
              sabbath day" (Matthew 12:8, KJV).
            </p>
          </section>

          {/* Chapter 5 */}
          <section id="chapter-5" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">Chapter 5: Answering the Objections</h2>

            <p className="mb-4">
              Before we trace the historical apostasy, we must address the two most common biblical objections to
              Sabbath observance: Colossians 2:16 and Acts 20:7.
            </p>

            {/* Objection 1 */}
            <div id="objection-1" className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Objection 1: Colossians 2:16-17</h3>

              <p className="mb-4">Many argue that Colossians 2:16 abolishes the Sabbath:</p>

              <div className="bg-slate-50 dark:bg-slate-950/30 border-l-4 border-slate-500 p-6 mb-6">
                <blockquote className="text-lg italic">
                  <p className="mb-4">
                    <strong>
                      "Let no man therefore judge you in meat, or in drink, or in respect of an holyday, or of the new
                      moon, or of the sabbath days: Which are a shadow of things to come; but the body is of Christ."
                    </strong>
                  </p>
                  <cite>— Colossians 2:16-17 (KJV)</cite>
                </blockquote>
              </div>

              <p className="mb-4">
                Theophilus Brabourne, one of the leading English Sabbatarian writers of the 17th century, provided the
                biblical answer in his 1628 work <em>A Discourse Upon The Sabbath Day</em>:
              </p>

              <div className="my-6 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 rounded-lg">
                <p className="italic mb-4">
                  "There is two laws, a moral law consisting of 10 commandments: all written by the finger of God, upon
                  tables of stone, and a ceremonial law written by Moses and delivered to the people; so are there
                  sabbaths moral... and sabbaths ceremonial... by Sabbaths here is meant only ceremonial sabbaths."
                </p>
              </div>

              <p className="mb-4">
                The distinction is clear. The weekly Sabbath is part of the eternal moral law, written by God's own
                finger on stone. The ceremonial sabbaths were the annual feast days (Passover, Day of Atonement, Feast
                of Tabernacles, etc.) that were "shadows" pointing forward to Christ. These ceremonial observances were
                fulfilled in Christ and are no longer binding. But the weekly Sabbath, established at creation and
                enshrined in the Ten Commandments, remains.
              </p>

              <p className="mb-4">
                This understanding was not unique to Sabbatarian writers. Even John Wesley, the founder of Methodism,
                clearly distinguished between the ceremonial and moral law:
              </p>

              <div className="my-6 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 rounded-lg">
                <p className="italic mb-4">
                  "This 'handwriting of ordinances' our Lord did blot out, take away, and nail to His cross. (Colossians
                  2:14.) But the moral law contained in the Ten Commandments, and enforced by the prophets, He did not
                  take away.... The moral law stands on an entirely different foundation from the ceremonial or ritual
                  law. Every part of this law must remain in force upon all mankind and in all ages."
                </p>
              </div>

              <p className="mb-4">
                Wesley's own words confirm what Sabbath-keepers have always maintained: Colossians 2:16 refers to
                ceremonial observances, not the moral law of the Ten Commandments. The Methodist Church Discipline
                (1904) echoes this: "No Christian whatsoever is free from the obedience of the commandments which are
                called moral." Yet despite this clear theological position, Methodists—like most Protestant
                denominations—continue to observe Sunday, a day that has no biblical authorization whatsoever. This
                inconsistency proves the very point Rome makes in her challenge to Protestantism.
              </p>
            </div>

            {/* Objection 2 */}
            <div id="objection-2" className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Objection 2: Acts 20:7</h3>

              <p className="mb-4">
                Others point to Acts 20:7 as proof that the apostles worshiped on Sunday: "And upon the first day of the
                week, when the disciples came together to break bread, Paul preached unto them..." (KJV).
              </p>

              <p className="mb-4">
                Francis Bampfield, a 17th-century English Sabbatarian who suffered imprisonment for his beliefs,
                addressed this in his 1677 work. He explained:
              </p>

              <div className="my-6 p-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg">
                <p className="italic mb-4">
                  "This Night-part belonging to the after day-part, as making up the whole next day after the Sabbath,
                  was not observed by Paul as the weekly-Sabbath: for you may there Read how some of the disciples went
                  before to ship, and sailed to Assos, there intending to take in Paul: For, so had he appointed,
                  minding himself to go afoot."
                </p>
              </div>

              <p className="mb-4">
                The biblical day begins at sunset (Genesis 1: "the evening and the morning were the first day"). Acts
                20:7 describes a Saturday night meeting—after the Sabbath ended at sunset—not a Sunday worship service.
                Paul preached until midnight, and then the disciples sailed and Paul walked the next day, engaging in
                ordinary work activities. This proves Sunday was an ordinary working day, not a sacred day of rest.
              </p>
            </div>
          </section>

          {/* Chapter 6 */}
          <section id="chapter-6" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">Chapter 6: The Prophetic Blueprint</h2>

            <p className="mb-4">
              Long before the rise of the Roman Church, the prophet Daniel laid out a detailed prophetic blueprint. In
              Daniel 7, he describes a succession of world empires: Babylon, Medo-Persia, Greece, and Rome. From the
              fourth beast (Rome), a "little horn" emerges—a religio-political power that would:
            </p>

            <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-6 mb-6">
              <blockquote className="text-lg italic">
                <p className="mb-4">
                  <strong>
                    "Speak great words against the most High, and shall wear out the saints of the most High, and think
                    to change times and laws: and they shall be given into his hand until a time and times and the
                    dividing of time."
                  </strong>
                </p>
                <cite>— Daniel 7:25 (KJV)</cite>
              </blockquote>
            </div>

            <p className="mb-4">
              The Aramaic word for "laws" is <em>dat</em>, referring to divine law. The only law of God that deals with
              "time" is the fourth commandment, which designates the seventh day as the Sabbath. This prophecy foretold
              the rise of a power that would attempt to alter the very law of God, specifically His designated time of
              worship.
            </p>

            <p className="mb-4">
              The Protestant Reformers unanimously identified this "little horn" as the Papacy. They saw the fulfillment
              of Daniel 7:25 in the Catholic Church's claim to have changed the Sabbath from Saturday to Sunday. This
              was not a peripheral issue; it was central to their prophetic understanding.
            </p>
          </section>

          {/* Chapter 7 */}
          <section id="chapter-7" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">Chapter 7: The Gradual Apostasy</h2>

            <p className="mb-4">
              The change from Sabbath to Sunday was not an overnight event, but a gradual process spanning centuries.
              The historical record from the 3rd to the 9th centuries provides a clear timeline.
            </p>

            {/* 3rd Century */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">3rd Century: The Apostolic Foundation Intact</h3>

              <p className="mb-4">
                In the early 3rd century, the great Church Father Tertullian (c. 155-240 AD) wrote in his work{" "}
                <em>Against Marcion</em>:
              </p>

              <div className="my-6 p-6 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-500 rounded-lg">
                <p className="italic mb-4">
                  "Thus Christ did not at all rescind the Sabbath. He kept the law thereof... He fulfilled the law,
                  while interpreting its condition... He furnished to this day divine safeguards... restoring to the
                  Sabbath the works which were proper for it."
                </p>
              </div>

              <p className="mb-4">
                Tertullian confirms that Christ honored the Sabbath and that it remained sacred in the early church.
              </p>

              <p className="mb-4">Another Church Father, Origen (c. 184-253 AD), expounding Hebrews 4:9, wrote:</p>

              <div className="my-6 p-6 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-500 rounded-lg">
                <p className="italic mb-4">
                  "It is fitting for whoever is righteous among the saints to keep also the festival of the Sabbath.
                  There remaineth therefore a sabbatismus, that is, a keeping of the Sabbath, to the people of God
                  (Hebrews 4:9)."
                </p>
              </div>

              <p className="mb-4">
                A third witness from this era, Archelaus, Bishop of Cascar (c. 277 AD), directly refuted the growing
                anti-Sabbath sentiment:
              </p>

              <div className="my-6 p-6 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-500 rounded-lg">
                <p className="italic mb-4">
                  "Again, as to the assertion that the Sabbath has been abolished, WE deny that He has abolished it
                  plainly; for He was Himself also Lord of the Sabbath."
                </p>
              </div>

              <p className="mb-4">
                Here, Archelaus not only denies the abolition of the Sabbath but uses Christ's own title—"Lord of the
                Sabbath"—as the very reason for its permanence. The use of "WE" indicates this was the established
                teaching of the church in his region, standing against the tide of apostasy.
              </p>

              <p className="mb-4">
                Thus, three major 3rd-century Church Fathers from different regions—North Africa (Tertullian),
                Alexandria (Origen), and Mesopotamia (Archelaus)—all testify to the continued sanctity and observance of
                the seventh-day Sabbath before the corrupting influence of Constantine and the state.
              </p>

              <p className="mb-4">
                Even a secular source confirms this. Wikipedia's article on the Ten Commandments (April 2012) states:
              </p>

              <div className="my-6 p-6 bg-slate-50 dark:bg-slate-900/20 border-2 border-slate-500 rounded-lg">
                <p className="italic mb-4">
                  "Until the 2nd and 3rd century most Christian groups kept the Jewish sabbath, with the practice of
                  Sunday observance emerging after the Jewish-Roman wars. The Catholic Church's general repudiation of
                  Jewish practices during this period is apparent in the Council of Laodicea (4th Century AD)..."
                </p>
              </div>
            </div>

            {/* 4th Century */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">4th Century: The Union of Church and State</h3>

              <p className="mb-4">
                The first major step toward apostasy came in 321 AD, when the Roman Emperor Constantine enacted the
                first civil Sunday law:
              </p>

              <div className="my-6 p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg">
                <p className="italic mb-4">
                  "On the venerable Day of the Sun let the magistrates and people residing in cities rest, and let all
                  workshops be closed."
                </p>
              </div>

              <p className="mb-4">
                This marked the beginning of state power being used to enforce a religious observance. Yet even after
                this law, the Sabbath was not forgotten. The <em>Apostolic Constitutions</em> (4th century) commanded:
              </p>

              <div className="my-6 p-6 bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-500 rounded-lg">
                <p className="italic mb-4">
                  "Let the slaves work five days; but on the Sabbath day and the Lord's day, let them have leisure to go
                  to church for instruction in Piety. We have said that the sabbath is on account of the creation, and
                  the Lord's day of the resurrection."
                </p>
              </div>

              <p className="mb-4">
                Both days were still being observed, with the Sabbath honored as the memorial of creation.
              </p>
            </div>

            {/* 9th Century */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">9th Century: The Papal Decree</h3>

              <p className="mb-4">
                Centuries later, Catholic historians documented the final transfer. The 9th-century Bishop Rabanus
                Maurus wrote:
              </p>

              <div className="my-6 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-500 rounded-lg">
                <p className="italic mb-4">
                  "Pope Sylvester... the same pope decreed that the rest of the sabbath should be transferred rather to
                  the Lord's day (sunday) in order that on that day we should rest from worldly works for the praise of
                  God."
                </p>
              </div>

              <p className="mb-4">
                Here we have a Catholic bishop explicitly naming Pope Sylvester I (who reigned during Constantine's
                time) as the one who finalized the transfer of the Sabbath's solemnity to Sunday. This is a direct
                confirmation of Daniel's prophecy: a religio-political power thinking to change God's law.
              </p>
            </div>
          </section>

          {/* Chapter 8 */}
          <section id="chapter-8" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">Chapter 8: Witnesses in the Wilderness</h2>

            <p className="mb-4">
              Even as the apostasy solidified in Rome, faithful witnesses preserved the flame of Sabbath truth across
              continents and centuries. Their testimony forms an unbroken chain from the early church to the modern era.
            </p>

            {/* 6th Century (Scotland) */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">6th Century (Scotland)</h3>

              <p className="mb-4">
                St. Columba, one of the most revered figures in Celtic Christianity, spoke these words on the day of his
                death, Saturday, June 9th:
              </p>

              <div className="my-6 p-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg">
                <p className="italic mb-4">"This day is called the Sabbath, that is, the day of rest."</p>
              </div>
            </div>

            {/* 8th Century (Italy) */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">8th Century (Italy)</h3>

              <p className="mb-4">At the Council of Friuli (791 AD), bishops lamented:</p>

              <div className="my-6 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 rounded-lg">
                <p className="italic mb-4">
                  "We command all Christians to observe the Lord's day... When speaking of that Sabbath which the Jews
                  observe, the last day of the week, and which also our peasants observe."
                </p>
              </div>

              <p className="mb-4">
                This official church council admits that Christian peasants in Italy were still keeping the seventh-day
                Sabbath in the 8th century.
              </p>
            </div>

            {/* 11th Century */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">11th Century (The Great Schism)</h3>

              <p className="mb-4">
                In 1054 AD, Cardinal Humbert, the papal legate from Rome, accused the Greek Orthodox Church:
              </p>

              <div className="my-6 p-6 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-500 rounded-lg">
                <p className="italic mb-4">
                  "However, you [Greeks], if you do not judaize, tell (us) why you have something in common with the
                  Jews in a similar observance of the Sabbath?"
                </p>
              </div>

              <p className="mb-4">
                The Eastern Church was still observing the Sabbath, and this was a major point of contention in the
                split between East and West.
              </p>
            </div>

            {/* 12th-15th Centuries */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">12th-15th Centuries (The Waldenses & Albigensians)</h3>

              <p className="mb-4">
                Perhaps the most famous witnesses were the Waldenses (also called Vaudois), who preserved truth in the
                valleys of the Alps. The 12th-century Inquisitor Moneta of Cremona documented their biblical defense of
                the Sabbath:
              </p>

              <div className="my-6 p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg">
                <p className="italic mb-4">
                  "Against this the heretic objects, namely, the Cathari and the Vaudois, which is found in Galatians
                  4:10. You observe days, and months, and times, and years; and he adds, I am afraid, lest perhaps I
                  have labored in vain... Therefore it is a sin to observe the day. Likewise to the Colossians 2:16. Let
                  no one therefore judge you in food, or in drink, or in respect of the summer day, or of the new moon,
                  or of the sabbaths."
                </p>
              </div>

              <p className="mb-4">
                This remarkable testimony from a hostile witness reveals that the Waldenses were not only keeping the
                seventh-day Sabbath but were defending it using the same biblical arguments employed by Sabbath-keepers
                today. They understood that Colossians 2:16 referred to ceremonial observances, not the weekly Sabbath.
                The Inquisitor's record proves that these "heretics" were being persecuted for their adherence to the
                fourth commandment.
              </p>

              <p className="mb-4">The Jesuit Inquisitor Francis Pegne wrote in 1595:</p>

              <div className="my-6 p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg">
                <p className="italic mb-4">
                  "Many used to think it (insabbatati) came from Sabbath, and that they [Waldenses] observed the Sabbath
                  according to the custom of the Jews."
                </p>
              </div>

              <p className="mb-4">The Lutheran historian Johann Lorenz von Mosheim (1764) confirmed:</p>

              <div className="my-6 p-6 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-500 rounded-lg">
                <p className="italic mb-4">
                  "In Lombardy, which was the chief seat of the faiths of the heretics, a kind of singular party
                  manifested... celebrated the jewish Sabbath."
                </p>
              </div>

              <p className="mb-4">The Reformed historian Bénédict Pictet added:</p>

              <div className="my-6 p-6 bg-teal-50 dark:bg-teal-900/20 border-2 border-teal-500 rounded-lg">
                <p className="italic mb-4">
                  "The Albigensians and Vaudois were called Sabbatarians, because they did not receive Sunday, and
                  rejected the Feasts of the Roman Church."
                </p>
              </div>

              <p className="mb-4">
                On September 14, 1492, hundreds of Sabbatarian Waldenses were arrested. Their testimony was simple and
                profound:
              </p>

              <div className="my-6 p-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg">
                <p className="italic mb-4">
                  "We did, indeed, rest and attend to divine worship upon the seventh day, even as God commanded."
                </p>
              </div>

              <p className="mb-4">In Norway, the Council of Bergen (August 24, 1435) issued a decree:</p>

              <div className="my-6 p-6 bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-500 rounded-lg">
                <p className="italic mb-4">
                  "We are informed that some people in different districts of the kingdom... have adopted and observed
                  such holy days... especially Saturday-keeping... It is severely forbidden."
                </p>
              </div>
            </div>

            {/* 16th Century */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">16th Century (Global Persecution)</h3>

              <p className="mb-4">
                The persecution was worldwide. On December 27, 1503, three men—Ivan Kuritsyn, Dimitri Knonopliov, and
                Ivan Maksimov—were burned alive in wooden cages in Moscow for Sabbath-keeping.
              </p>

              <p className="mb-4">
                In Germany, martyrs like Christina Tolingerin and Barbara Von Thiers (1529) were executed for their
                faithfulness to the Sabbath.
              </p>

              <p className="mb-4">
                Among the Reformation-era Sabbath-keepers was Andreas Fischer, a prominent Anabaptist leader who
                defended the Sabbath on biblical grounds. Valentin Krautwald, writing around 1532, documented Fischer's
                powerful biblical argument:
              </p>

              <div className="my-6 p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 rounded-lg">
                <p className="italic mb-4">
                  "Moses spoke in Exodus 31 about the Sabbaths, stating that they are a sign between God and the
                  children of Israel. The Sabbath, according to the tablet, holds no distinction, as if it were greater
                  than the others, or not a sign, or that it should last forever... It is by God's command concerning
                  the Sabbath. The Ten Commandments and the tablets were publicly written, as stated in Exodus 31, and
                  as this was later renewed by Ezekiel. The Sabbath of the tablet was a sign along with the others, so
                  it must be able to be signified and testified."
                </p>
              </div>

              <p className="mb-4">
                Fischer's argument was profound and biblical. He understood that the Sabbath was not merely a Jewish
                custom, but the eternal covenant sign written by God's own finger on the tablets of stone (Exodus 31:13,
                16-17). This sign was to be testified to throughout all generations. His defense echoes the very
                foundation laid in Chapter 1 of this article: the Sabbath as God's <em>'oth</em> (אוֹת)—His mark of
                authority and covenant relationship. Fischer was willing to suffer persecution for upholding this truth
                during the height of the Reformation.
              </p>

              <p className="mb-4">
                In Spain, Dr. Constantino Ponce de la Fuente, a renowned preacher, wrote in 1550 before being arrested
                by the Inquisition:
              </p>

              <div className="my-6 p-6 bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-500 rounded-lg">
                <p className="italic mb-4">
                  "These works God prohibited on the sabbath, not because they are bad... but rather that man may find
                  himself unencumbered for the true and spiritual sanctification of the Holy day."
                </p>
              </div>

              <p className="mb-4">The historian Sebastian Franck documented in 1565:</p>

              <div className="my-6 p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg">
                <p className="italic mb-4">
                  "Some have suffered torture and separated themselves simply because they would not rest when others
                  kept Sunday, for they declared it to be the holiday and law of Antichrist, with whom they would have
                  nothing in common."
                </p>
              </div>

              <p className="mb-4">
                These faithful believers understood the prophetic significance of the Sabbath-Sunday issue and were
                willing to suffer torture rather than compromise.
              </p>
            </div>
          </section>

          {/* Chapter 9 */}
          <section id="chapter-9" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">Chapter 9: Rome's Stunning Admission</h2>

            <p className="mb-4">
              After centuries of persecuting Sabbath-keepers, the Roman Church has consistently and openly admitted to
              changing the day of worship. This is not a secret, but a proud declaration of her authority, often used to
              challenge the Protestant principle of <em>Sola Scriptura</em>.
            </p>

            <p className="mb-4">
              At the pivotal Council of Trent—Rome's official response to the Protestant Reformation—Archbishop Gaspar
              del Fosso made this stunning declaration on January 18, 1562:
            </p>

            <div className="my-6 p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg">
              <p className="italic mb-4">
                "The Sabbath, the most glorious day in the law, has been changed into the Lord's day... These and other
                similar matters have not ceased by virtue of Christ's teaching (for He says He has come to fulfill the
                law, not to destroy it), but they have been changed by the authority of the church."
              </p>
            </div>

            <p className="mb-4">
              This was the official Catholic position, stated at their most important council. It was a direct challenge
              to the Reformers, with Rome openly admitting the change was made by her own authority, not by Christ or
              the apostles.
            </p>

            <p className="mb-4">Even before this, Johann Eck, Martin Luther's chief opponent, had written in 1556:</p>

            <div className="my-6 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-500 rounded-lg">
              <p className="italic mb-4">
                "The church has transferred the observance from Saturday to Sunday by virtue of her own power, without
                Scripture."
              </p>
            </div>

            <p className="mb-4">
              Centuries later, the challenge was repeated. In the fall of 1893, <em>The Catholic Mirror</em> of
              Baltimore published a series of editorials declaring:
            </p>

            <div className="my-6 p-6 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-500 rounded-lg">
              <p className="italic mb-4">
                "The Catholic Church for over one thousand years before the existence of a Protestant, by virtue of her
                divine mission, changed the day from Saturday to Sunday... The Christian Sabbath is, therefore, to this
                day, the acknowledged offspring of the Catholic Church as spouse of the Holy Ghost, without a word of
                remonstrance from the Protestant world."
              </p>
            </div>

            <p className="mb-4">
              The <em>Mirror</em> methodically dismantled every Protestant argument for Sunday observance, showing each
              to be without biblical foundation. It mockingly challenged:
            </p>

            <div className="my-6 p-6 bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-500 rounded-lg">
              <p className="italic mb-4">
                "The Protestant says, 'How can I receive the teachings of an apostate Church?' How, we ask, have you
                managed to receive her teachings in the first place, in observing the Sunday, which you acknowledge we
                have changed... we challenge you to show us from the pages of Scripture one single text authorizing the
                change of the day."
              </p>
            </div>

            <p className="mb-4">
              Rome has never hidden this fact. The change from Sabbath to Sunday is presented as the very mark of her
              ecclesiastical authority.
            </p>
          </section>

          {/* Chapter 10 */}
          <section id="chapter-10" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">Chapter 10: The Mark of Papal Authority</h2>

            <p className="mb-4">
              The previous chapter laid bare Rome's stunning admission that she single-handedly changed the day of
              worship from the seventh-day Sabbath to Sunday. Now, we will examine the profound theological implications
              of this act. The Catholic Church does not merely admit to this change; she actively boasts of it as the
              mark of her ecclesiastical power and authority. This claim is the very heart of the prophetic conflict
              between the seal of God and the mark of the beast.
            </p>

            <p className="mb-4">
              In a letter dated November 11, 1895, C. F. Thomas, the Chancellor to Cardinal James Gibbons, made this
              astonishingly clear statement in response to an inquiry about the Sabbath change:
            </p>

            <div className="my-6 p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg">
              <p className="italic mb-4">
                "Of course the Catholic Church claims that the change was her act. And the act is a mark of her
                ecclesiastical power and authority in religious matters."
              </p>
            </div>

            <p className="mb-4">
              This is not a subtle hint; it is a direct, unambiguous declaration. The word "mark" is used explicitly.
              The Church's authority, she claims, is demonstrated by her power to alter the very law of God. This
              sentiment is echoed repeatedly in Catholic literature. <em>The Catholic Record</em> of London, Ontario, on
              September 1, 1923, published this bold assertion:
            </p>

            <div className="my-6 p-6 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-500 rounded-lg">
              <p className="italic mb-4">
                "The Church is above the Bible, and this transference of Sabbath observance is proof of that fact."
              </p>
            </div>

            <p className="mb-4">
              This is the core of the issue. The conflict is not merely about a day; it is about authority. Does
              ultimate authority rest in the unchanging Word of God (<em>Sola Scriptura</em>), or does it rest in the
              traditions and decrees of the Church? By instituting Sunday worship, Rome declares that its authority is
              supreme.
            </p>

            <p className="mb-4">
              This act directly fulfills the prophecy of Daniel 7:25, which foretold that a power would arise that would
              "think to change times and laws." The papacy has not only thought to do so but has openly proclaimed its
              success in doing so. This change stands as a direct challenge to the authority of God Himself, who wrote
              the Ten Commandments with His own finger and declared them eternal.
            </p>

            <h3 className="text-2xl font-semibold mb-4 mt-8">The Seal of God vs. The Mark of Authority</h3>

            <p className="mb-4">
              In Scripture, a seal contains three essential elements of a ruler's authority: 1) His name, 2) His title,
              and 3) His territory. The seal of God is found within His law, specifically in the fourth commandment:
            </p>

            <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-6 mb-6">
              <blockquote className="text-lg italic">
                <p className="mb-4">
                  <strong>
                    "For in six days the LORD [Name] made [Title: Creator] heaven and earth, the sea, and all that in
                    them is [Territory], and rested the seventh day: wherefore the LORD blessed the sabbath day, and
                    hallowed it."
                  </strong>
                </p>
                <cite>— Exodus 20:11 (KJV)</cite>
              </blockquote>
            </div>

            <p className="mb-4">
              The Sabbath commandment is God's seal, His mark of authority. It identifies Him as the Creator of all
              things. By keeping His Sabbath, we acknowledge His authority as our Creator and Lord.
            </p>

            <p className="mb-4">
              In contrast, the mark of the beast is a counterfeit system of worship based on human authority rather than
              divine command. By substituting the first day of the week for the seventh, the papal power has created its
              own mark of authority. Monsignor Louis Segur, in his book{" "}
              <em>Plain Talk About the Protestantism of Today</em>, makes this powerful point:
            </p>

            <div className="my-6 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-500 rounded-lg">
              <p className="italic mb-4">
                "The observance of Sunday by the Protestants is homage they pay, in spite of themselves, to the
                authority of the [Catholic] Church."
              </p>
            </div>

            <p className="mb-4">
              Every time a Protestant keeps Sunday holy, they are, in effect, acknowledging the power of the institution
              that made that change. They are choosing the tradition of men over the commandment of God. This is the
              central issue in the final conflict described in Revelation 13 and 14. The world will be divided into two
              groups: those who have the seal of God (who keep His commandments, including the seventh-day Sabbath) and
              those who receive the mark of the beast (who follow the counterfeit system of worship).
            </p>

            <p className="mb-4">
              The choice is not merely between two days. It is a choice between two masters, two laws, and two systems
              of worship. It is a choice between the authority of God and the authority of Rome.
            </p>
          </section>

          {/* Chapter 11 */}
          <section id="chapter-11" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">Chapter 11: American Sunday Laws</h2>

            <p className="mb-4">
              The prophetic warnings of Revelation are not confined to the distant past or a far-off continent. The
              principles of the great controversy have been playing out on American soil since the first colonies were
              established. The enforcement of Sunday observance through civil law, a practice directly inherited from
              the papal system, has a long and troubling history in the United States.
            </p>

            {/* Colonial America */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Colonial America: A Theocracy of Sunday Laws</h3>

              <p className="mb-4">
                Many of the early American colonies were established as theocracies, with civil governments enforcing
                religious edicts. The most common of these were strict Sunday laws, often called "blue laws," which
                mandated church attendance and forbade a wide range of activities.
              </p>

              <p className="mb-4">
                In 1610, the colony of Virginia enacted a draconian law, later codified in the{" "}
                <em>Lawes Divine, Morall and Martiall</em> (also known as "Dale's Code"), that read:
              </p>

              <div className="my-6 p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg">
                <p className="italic mb-4">
                  "Every man and woman shall go in the morning to the divine service...and in the afternoon to divine
                  service and Catechising, upon pain for the first fault to lose their provision and allowance for the
                  whole week following, for the second to lose the said allowance and also to be whipped, and for the
                  third to suffer death."
                </p>
              </div>

              <p className="mb-4">
                This was not an idle threat. While records of executions are scarce, the law itself reveals the spirit
                of intolerance that prevailed. Other colonies followed suit. The Maryland Toleration Act of 1649, while
                praised for its religious tolerance, still mandated that anyone who profaned the "Sabbath or Lords day
                called Sunday by frequent swearing, drunkenes or by any uncivill or disorderly recreation" should be
                "fined, imprisoned or whipped."
              </p>

              <p className="mb-4">
                In Massachusetts, the laws were notoriously strict. In 1656, Captain Kemble of Boston was placed in the
                public stocks for two hours for the "unseemly behavior" of kissing his wife on his own doorstep on a
                Sunday after returning from a three-year sea voyage. Even George Washington, on his way to church one
                Sunday in 1789, was detained by a tithingman for violating Connecticut's law against unnecessary travel
                on that day.
              </p>

              <p className="mb-4">
                These laws were not merely about providing a day of rest; they were about enforcing a specific religious
                observance by the power of the state. This is the very principle of the papacy, and it stands in direct
                opposition to the American ideal of liberty of conscience.
              </p>
            </div>

            {/* Modern Blue Laws */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Modern Blue Laws and the Coming Crisis</h3>

              <p className="mb-4">
                While the most severe penalties of the colonial era have been repealed, so-called "blue laws" still
                exist in various forms in nearly every state. These laws restrict everything from the sale of alcohol
                and automobiles to hunting and retail operations on Sundays. While often defended on secular grounds as
                promoting a day of rest, their religious origins are undeniable.
              </p>

              <p className="mb-4">
                These laws set a dangerous precedent. They establish the principle that the state has the right to
                regulate the day of worship. As the final crisis of Revelation 13 and 14 approaches, this principle will
                be revived. Prophecy indicates that Sunday observance will once again be enforced by law, first in the
                United States and then throughout the world. This will be the final test, forcing every individual to
                choose between the commandments of God and the traditions of men.
              </p>

              <p className="mb-4">
                Those who honor the seventh-day Sabbath of the Bible will be branded as enemies of the state, disturbers
                of the peace, and violators of the law. They will face economic persecution ("that no man might buy or
                sell, save he that had the mark," Revelation 13:17) and ultimately the threat of death. But in this
                final conflict, God will have a people who will not bow. They are described as those who "keep the
                commandments of God, and the faith of Jesus" (Revelation 14:12). Their allegiance is to the Creator, and
                their sign is His holy Sabbath.
              </p>
            </div>
          </section>

          {/* Chapter 12 */}
          <section id="chapter-12" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">Chapter 12: Revelation's Final Warning</h2>

            <p className="mb-4">
              The book of Revelation describes a final test that will divide humanity into two groups: those who receive
              the "mark of the beast" (Greek: <em>charagma</em>, χάραγμα) and those who receive the "seal of God"
              (Greek: <em>sphragis</em>, σφραγίς).
            </p>

            <p className="mb-4">
              The Sabbath is God's seal. It identifies Him as the Creator (Exodus 20:11) and the one who sanctifies us
              (Ezekiel 20:12). The counterfeit, Sunday, is the mark of the beast's authority to change God's law.
            </p>

            <p className="mb-4">Revelation 14 issues the solemn warning:</p>

            <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-6 mb-6">
              <blockquote className="text-lg italic">
                <p className="mb-4">
                  <strong>
                    "If any man worship the beast and his image, and receive his mark in his forehead, or in his hand,
                    The same shall drink of the wine of the wrath of God... Here is the patience of the saints: here are
                    they that keep the commandments of God, and the faith of Jesus."
                  </strong>
                </p>
                <cite>— Revelation 14:9-12 (KJV)</cite>
              </blockquote>
            </div>

            <p className="mb-4">
              The first angel's message calls the world to "worship him that made heaven, and earth, and the sea, and
              the fountains of waters" (Revelation 14:7)—a direct quote from the fourth commandment (Exodus 20:11).
            </p>
          </section>

          {/* Chapter 13 */}
          <section id="chapter-13" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Chapter 13: The Sabbath as a Delight: The Promise of Isaiah 58
            </h2>

            <p className="mb-4">
              One of the greatest tragedies of the Sabbath-Sunday controversy is that the Sabbath has been portrayed as
              a burden, a day of restrictive rules and joyless legalism. This is a profound misunderstanding of its
              divine purpose. The Sabbath is not a burden to be endured, but a gift to be cherished—a weekly appointment
              with our Creator that brings sanctification, delight, and incredible blessings.
            </p>

            <p className="mb-4">The prophet Isaiah beautifully captures this truth:</p>

            <div className="bg-green-50 dark:bg-green-950/30 border-l-4 border-green-500 p-6 mb-6">
              <blockquote className="text-lg italic">
                <p className="mb-4">
                  <strong>
                    "If thou turn away thy foot from the sabbath, from doing thy pleasure on my holy day; and call the
                    sabbath a delight, the holy of the LORD, honourable; and shalt honour him, not doing thine own ways,
                    nor finding thine own pleasure, nor speaking thine own words: Then shalt thou delight thyself in the
                    LORD; and I will cause thee to ride upon the high places of the earth, and feed thee with the
                    heritage of Jacob thy father: for the mouth of the LORD hath spoken it."
                  </strong>
                </p>
                <cite>— Isaiah 58:13-14 (KJV)</cite>
              </blockquote>
            </div>

            <p className="mb-4">
              This passage reveals the heart of true Sabbath-keeping. It is a day to turn from our own worldly pursuits
              and pleasures, not as a sacrifice, but as a joyful exchange. We set aside our own agenda to embrace God's
              agenda for us: a day of spiritual refreshing, communion, and delight in Him. When we honor the Sabbath in
              this spirit, God makes three extraordinary promises:
            </p>

            <ol className="space-y-4 mb-6 list-decimal list-inside">
              <li className="text-lg">
                <strong>We will delight ourselves in the Lord:</strong> The Sabbath becomes the highlight of our week, a
                time of deep spiritual joy and connection with our Creator.
              </li>
              <li className="text-lg">
                <strong>He will cause us to ride upon the high places of the earth:</strong> This is a promise of
                victory, exaltation, and spiritual triumph over the challenges of life.
              </li>
              <li className="text-lg">
                <strong>He will feed us with the heritage of Jacob:</strong> We will receive the full spiritual
                inheritance promised to God's faithful people.
              </li>
            </ol>

            <p className="mb-4">
              This is the opposite of legalism. It is a love relationship. The Sabbath is a weekly reminder of our
              identity as children of the Most High, a day to be sanctified and set apart for Him, and a foretaste of
              the eternal rest to come.
            </p>
          </section>

          {/* Chapter 14 */}
          <section id="chapter-14" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">Chapter 14: The Rest That Remains</h2>

            <p className="mb-4">
              The book of Hebrews provides the final New Testament confirmation. In chapter 4, the author speaks of a
              "rest" that remains for God's people. The Greek word in verse 9 is not the usual word for rest (
              <em>katapausis</em>), but <em>sabbatismos</em> (σαββατισμός)—literally "a Sabbath-keeping."
            </p>

            <div className="bg-purple-50 dark:bg-purple-950/30 border-l-4 border-purple-500 p-6 mb-6">
              <blockquote className="text-lg italic">
                <p className="mb-4">
                  <strong>"There remaineth therefore a rest [a Sabbath-keeping] to the people of God."</strong>
                </p>
                <cite>— Hebrews 4:9 (KJV)</cite>
              </blockquote>
            </div>

            <p className="mb-4">
              Origen, the 3rd-century Church Father, understood this clearly, as we have seen. If the Sabbath had been
              changed or abolished, this was the perfect moment for the inspired author to say so. Instead, he confirms
              that a Sabbath-keeping remains and issues the urgent appeal:
            </p>

            <div className="bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500 p-6 mb-6">
              <blockquote className="text-lg italic">
                <p className="mb-4">
                  <strong>"To day if ye will hear his voice, harden not your hearts."</strong>
                </p>
                <cite>— Hebrews 4:7 (KJV)</cite>
              </blockquote>
            </div>
          </section>

          {/* Conclusion */}
          <section id="conclusion" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">Conclusion: The Final Choice</h2>

            <p className="mb-4">
              Jesus Christ declared, "The Son of man is Lord even of the sabbath day" (Matthew 12:8, KJV). He is its
              master, its owner, its authority. The entire weight of Scripture—from Genesis to Revelation—points to the
              enduring sanctity of the seventh-day Sabbath.
            </p>

            <p className="mb-4">
              We have traced the unbroken chain of witnesses who preserved this truth through centuries of persecution.
              We have seen Rome's own proud admission of changing God's law. We have heard the testimony of both hostile
              and friendly sources, all confirming the same truth.
            </p>

            <p className="mb-4">
              The choice before every individual is stark and clear. Will we follow the traditions of men, or the
              commandments of God? Will we accept the mark of an earthly power's authority, or will we receive the seal
              of the living God?
            </p>

            <p className="mb-4">The Apostle John makes the connection between love and obedience inseparable:</p>

            <div className="bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-indigo-500 p-6 mb-6">
              <blockquote className="text-lg italic">
                <p className="mb-4">
                  <strong>
                    "He that saith, I know him, and keepeth not his commandments, is a liar, and the truth is not in
                    him. But whoso keepeth his word, in him verily is the love of God perfected: hereby know we that we
                    are in him. He that saith he abideth in him ought himself also so to walk, even as he walked."
                  </strong>
                </p>
                <cite>— 1 John 2:4-6 (KJV)</cite>
              </blockquote>
            </div>

            <p className="mb-4">
              The faith of Jesus is the very trust and reliance on the Father that Christ Himself had, and it is this
              faith that He gives to His people, empowering them to obey not out of duty, but out of love. As Jesus
              said, "If ye love me, keep my commandments" (John 14:15, KJV).
            </p>

            <p className="mb-4">And how did Jesus walk? The Scripture is plain:</p>

            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-6 mb-6">
              <blockquote className="text-lg italic">
                <p className="mb-4">
                  <strong>
                    "And as His custom was, He went into the synagogue on the Sabbath day, and stood up to read.... and
                    was teaching them on the Sabbaths."
                  </strong>
                </p>
                <cite>— Luke 4:16, 31 (NKJV)</cite>
              </blockquote>
            </div>

            <p className="mb-4">The Son of God had a custom. The Apostle Paul followed His example. Shouldn't we?</p>

            <p className="mb-4">
              The prophet Hosea warned, "My people are destroyed for lack of knowledge" (Hosea 4:6). The call of Hebrews
              echoes to our generation: "To day if ye will hear his voice, harden not your hearts" (Hebrews 4:7). The
              time to investigate this truth, and to act upon it, is now.
            </p>

            <p className="mb-4">
              The call of Hebrews echoes to our time: "To day if ye will hear his voice, harden not your hearts." Now is
              the time to investigate, to study, and to choose to enter into His true Sabbath rest.
            </p>
          </section>

          {/* References */}
          <section id="references" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">References</h2>

            <div className="bg-card/30 border border-border rounded-lg p-6">
              <ol className="space-y-2 text-sm">
                <li>[1] Martin Luther, Wider die himmlischen Propheten, von den Bildern und Sakrament, 1525.</li>
                <li>[2] Theophilus Brabourne, A Discourse Upon The Sabbath Day, 1628.</li>
                <li>[3] Francis Bampfield, The Seventh-Day-Sabbath the desirable day, 1677.</li>
                <li>[4] Tertullian, Against Marcion, Book IV, Chapter XII, in Opera Tertulliani, 1580.</li>
                <li>[5] Origen, Commentary on Hebrews 4:9.</li>
                <li>[6] Archelaus, Disputation with Manes.</li>
                <li>[7] Wikipedia, "Ten Commandments," April 2012.</li>
                <li>[8] Codex Justinianus, lib. 3, tit. 12, 3.</li>
                <li>[9] Apostolic Constitutions, Book 8, Section 4, Chapter 33.</li>
                <li>[10] C. F. Thomas, Chancellor to Cardinal James Gibbons, Letter dated November 11, 1895.</li>
                <li>[11] Catholic Record, London, Ontario, September 1, 1923.</li>
                <li>[12] Monsignor Louis Segur, Plain Talk About the Protestantism of Today, p. 213.</li>
                <li>
                  [13] FOR The Colony in Virginea BRITANNIA. Lawes Divine, Morall and Martiall, &c. (London: Walter
                  Burre, 1612), Law #6.
                </li>
                <li>
                  [14] Nicholas Eymerich, Directorium Inquisitorum, 1595, with commentary by Francis Pegne, p. 225.
                </li>
                <li>[15] Johann Lorenz von Mosheim, Institutiones Historiae Ecclesiasticae, 1764.</li>
                <li>[16] Bénédict Pictet, Histoire de l'Eglise et du monde.</li>
                <li>[17] General History of the Sabbatarian Churches.</li>
                <li>[18] Diplomatarium Norvegicum, Vol. 7, p. 397.</li>
                <li>[19] Russian Inquisition records, 1503.</li>
                <li>[20] Constantino Ponce de la Fuente, Suma de Doctrina Christiana, 1550.</li>
                <li>[21] Sebastian Franck, Chronica: Zeytbuch vnd Geschichtbibel, 1565.</li>
                <li>[22] Archbishop Gaspar del Fosso, Council of Trent, January 18, 1562.</li>
                <li>[23] Johann Maier von Eck, 1556.</li>
                <li>[24] The Catholic Mirror, official organ of the Archdiocese of Baltimore, September 23, 1893.</li>
              </ol>
            </div>
          </section>
        </article>

        {/* Related Articles */}
        <div className="mt-16 pt-8 border-t border-border">
          <RelatedArticles currentPostSlug="the-sabbath-truth" />
        </div>
      </div>
    </div>
  )
}
