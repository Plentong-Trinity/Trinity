import type { Metadata } from "next"
import Image from "next/image"
import { RelatedArticles } from "@/components/related-articles"

export const metadata: Metadata = {
  title: "The Forgotten Commandment: Exposing the Great Sabbath Deception | Immutable",
  description:
    "A comprehensive investigation into how the biblical Sabbath was changed from Saturday to Sunday, revealing the shocking historical evidence, scientific proof, and prophetic significance of this great deception.",
  openGraph: {
    title: "The Forgotten Commandment: Exposing the Great Sabbath Deception",
    description:
      "A comprehensive investigation into how the biblical Sabbath was changed from Saturday to Sunday, revealing the shocking historical evidence, scientific proof, and prophetic significance of this great deception.",
    images: ["/forgotten-commandment.jpg"],
  },
}

export default function ForgottenCommandmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
            The Forgotten Commandment
          </h1>
          <p className="text-xl text-muted-foreground mb-4">Exposing the Great Sabbath Deception</p>
          <p className="text-sm text-muted-foreground">January 19, 2025</p>
        </header>

        {/* Featured Image */}
        <div className="mb-12 rounded-lg overflow-hidden shadow-2xl">
          <Image
            src="/forgotten-commandment.jpg"
            alt="The Forgotten Commandment - Ancient stone tablets with Ten Commandments"
            width={800}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Scripture Quote */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 p-6 mb-8">
          <blockquote className="text-lg italic">
            <p className="mb-4">
              <strong>
                "Remember the sabbath day, to keep it holy. Six days shalt thou labour, and do all thy work: But the
                seventh day is the sabbath of the LORD thy God: in it thou shalt not do any work, thou, nor thy son, nor
                thy daughter, thy manservant, nor thy maidservant, nor thy cattle, nor thy stranger that is within thy
                gates: For in six days the LORD made heaven and earth, the sea, and all that in them is, and rested the
                seventh day: wherefore the LORD blessed the sabbath day, and hallowed it."
              </strong>
            </p>
            <cite>— Exodus 20:8-11 (KJV)</cite>
          </blockquote>
        </div>

        {/* Table of Contents */}
        <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-primary">Table of Contents</h2>
          <nav className="space-y-2">
            <a
              href="#introduction"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Introduction: The Most Glorious Day Under Attack
            </a>
            <a
              href="#chapter-1"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-4"
            >
              Chapter 1: The Foundation - God's Rest at Creation
            </a>
            <a
              href="#chapter-2"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-4"
            >
              Chapter 2: Scientific Evidence - God's Sabbath Written in Our DNA
            </a>
            <a
              href="#chapter-3"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-4"
            >
              Chapter 3: The Spiritual Rest - Hebrews 4 and the Sabbath Promise
            </a>
            <a
              href="#chapter-4"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-4"
            >
              Chapter 4: Christ and the Sabbath - The Perfect Example
            </a>
            <a
              href="#chapter-5"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-4"
            >
              Chapter 5: The Early Church - Faithful Witnesses Through History
            </a>
            <a
              href="#chapter-6"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-4"
            >
              Chapter 6: The Great Deception - How the Sabbath Was Changed
            </a>
            <a
              href="#chapter-7"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-4"
            >
              Chapter 7: The Faithful Witnesses - Martyrs Who Died for Sabbath Truth
            </a>
            <a
              href="#chapter-8"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-4"
            >
              Chapter 8: The Documentary Evidence - Confessions from Both Sides
            </a>
            <a
              href="#chapter-9"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-4"
            >
              Chapter 9: The Prophetic Dimension - The Beast That Changed Times and Laws
            </a>
            <a
              href="#chapter-10"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-4"
            >
              Chapter 10: The Call to Return - Restoring the Sabbath in the Final Hour
            </a>
            <a
              href="#references"
              className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              References
            </a>
          </nav>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none dark:prose-invert">
          {/* Introduction */}
          <section id="introduction" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">Introduction: The Most Glorious Day Under Attack</h2>

            <p className="mb-4">
              In the annals of human history, no single doctrine has been more systematically attacked, more
              deliberately obscured, and more tragically forgotten than the biblical Sabbath. What God established at
              creation as a memorial of His creative power, what He embedded in the very heart of His moral law, and
              what He called "the most glorious day in the Law" has become the most neglected commandment in modern
              Christianity. This is not by accident, but by design—a carefully orchestrated deception that spans
              millennia and reaches to the very throne rooms of earthly power.
            </p>

            <p className="mb-4">
              The fourth commandment stands unique among the Ten Commandments. It is the only one that begins with
              "Remember"—as if God knew it would be the one most likely to be forgotten. It is the longest of all the
              commandments, containing more words than any other, as if God wanted to emphasize its importance. It is
              the only commandment that points back to creation itself, establishing God's authority as Creator of
              heaven and earth. And yet, it is the one commandment that the vast majority of professing Christians today
              completely ignore.
            </p>

            <p className="mb-4">
              How did this happen? How did the Christian world abandon the day that God Himself blessed and sanctified?
              How did Sunday, a day never once commanded in Scripture, come to replace the Sabbath that God established
              "from the foundation of the world"? The answer lies in a web of pagan influence, papal authority, and
              Protestant compromise that reveals one of the greatest deceptions ever perpetrated upon the human race.
            </p>

            <p className="mb-4">
              This investigation will expose the shocking truth about how the Sabbath was changed from Saturday to
              Sunday, not by divine command, but by human tradition. We will examine the historical evidence, the
              biblical testimony, and the prophetic significance of this change. We will hear from the martyrs who died
              rather than compromise on this truth, from the Reformers who recognized the deception, and from the
              Catholic Church itself, which openly boasts of its power to change God's law.
            </p>

            <p className="mb-4">
              Most importantly, we will discover what the Bible really teaches about the Sabbath—not as a burden or a
              relic of the past, but as a beautiful gift from a loving Creator, a sign of His sanctifying power, and a
              foretaste of the eternal rest that awaits all who enter into His rest by faith.
            </p>

            <p className="mb-4">
              The stakes could not be higher. As we stand on the threshold of earth's final crisis, the Sabbath question
              emerges once again as a test of loyalty to God's authority versus human tradition. The same power that
              changed the Sabbath in the past is preparing to enforce its mark upon the world in the future.
              Understanding this history is not merely academic—it is essential for every soul who desires to worship
              God in spirit and in truth.
            </p>
          </section>

          {/* Chapter 1 */}
          <section id="chapter-1" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">Chapter 1: The Foundation - God's Rest at Creation</h2>

            <p className="mb-4">
              To understand the magnitude of the Sabbath deception, we must first understand what God established at the
              very beginning of human history. The Sabbath is not a Jewish institution, not a ceremonial law, and not a
              temporary ordinance. It is a creation ordinance, established before sin entered the world, before there
              was a single Jew, and before the ceremonial law was ever given.
            </p>

            <div className="bg-green-50 dark:bg-green-950/30 border-l-4 border-green-500 p-6 mb-6">
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
              Three divine acts established the Sabbath at creation. First, God rested on the seventh day. This was not
              because He was tired—"the everlasting God, the LORD, the Creator of the ends of the earth, fainteth not,
              neither is weary" (Isaiah 40:28, KJV). Rather, God rested to establish a pattern for humanity, to show us
              the rhythm of life He intended for His creatures.
            </p>

            <p className="mb-4">
              Second, God blessed the seventh day. This blessing was not temporary or conditional. When God blesses
              something, it remains blessed. The seventh day carries a divine blessing that no other day possesses, a
              blessing that cannot be transferred to another day by human authority.
            </p>

            <p className="mb-4">
              Third, God sanctified the seventh day. To sanctify means to set apart as holy, to make sacred. God Himself
              made the seventh day holy. Holiness is not something that can be moved from one day to another by human
              decree. What God has made holy remains holy until God Himself changes it—and there is no record in
              Scripture of God ever transferring the holiness of the seventh day to the first day of the week.
            </p>

            <p className="mb-4">
              This creation Sabbath was given to Adam and Eve in their sinless state. It was not given because of sin,
              but in spite of the absence of sin. It was not a remedy for a fallen world, but a gift for a perfect
              world. This demonstrates that the Sabbath principle is not temporary or dispensational, but eternal and
              universal.
            </p>

            <p className="mb-4">
              The great Reformer Martin Luther understood this truth with remarkable clarity. In his commentary "In
              Primum Librum Mose Enarrationes" (1544), Luther wrote: "On the Seventh day therefore, in the morning, Adam
              appears to have heard the Lord giving commandment concerning his domestic and national duty; (the private,
              and public, worship of God;) together with the prohibition concerning the fruit of the tree. Satan,
              therefore, unable to endure this most beautiful creation of man, and this holy appointment of the Sabbath;
              and envying him so much felicity... So Satan, on this occasion, tempts Eve to sin, and gains the victory
              over her... I am myself quite persuaded, that all these things took place on the very day of the Sabbath."
            </p>

            <p className="mb-4">
              Luther's insight is profound. Satan's attack on humanity was specifically directed at "this holy
              appointment of the Sabbath." The fall itself occurred on the Sabbath day, representing Satan's hatred for
              God's holy day and his determination to destroy the sacred relationship between God and humanity that the
              Sabbath represented.
            </p>

            <p className="mb-4">
              When God gave the fourth commandment at Mount Sinai, He did not institute something new. Rather, He called
              humanity to "remember" what He had established at creation. The commandment points directly back to
              creation. The reason for Sabbath observance is not the Exodus from Egypt, not the giving of the law, but
              the creation of the world. This makes the Sabbath a universal commandment for all humanity, not just for
              the Jewish people. Every human being who acknowledges God as Creator is called to observe the memorial of
              His creative power.
            </p>
          </section>

          {/* Chapter 2 */}
          <section id="chapter-2" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Chapter 2: Scientific Evidence - God's Sabbath Written in Our DNA
            </h2>

            <p className="mb-4">
              Modern scientific research has made astounding discoveries that confirm what the Bible has taught for
              millennia: the Sabbath is not merely a human tradition, but a divine ordinance written into the very
              fabric of creation. God has embedded Sabbath recognition not only in Scripture, but in the biological
              systems of His creatures, providing irrefutable scientific evidence that Saturday, the seventh day, is
              indeed special in the eyes of our Creator.
            </p>

            <h3 className="text-2xl font-semibold mb-4">The Pineal Gland and Melatonin Cycles</h3>

            <p className="mb-4">
              Dr. Kenneth Greenaway, writing in the Scientific Journal of Biology (2022), made this remarkable
              discovery: "God has created in our bodies, a light-controlled biological clock called the Pineal Gland
              which produces a hormone called Melatonin. By creating in us an innate mechanism whereby Melatonin
              concentration PEAKS on Saturday, this Creator God gives us irrefutable evidence in our DNA, that Saturday
              - the 24-hour - seventh day of the seven-day week is SPECIAL."
            </p>

            <p className="mb-4">
              This scientific evidence is nothing short of miraculous. Our Creator has embedded within our very DNA the
              recognition of His holy Sabbath day. The pineal gland, often called the "third eye" or the "seat of the
              soul," produces melatonin in a weekly cycle that peaks precisely on Saturday, the biblical Sabbath. This
              is not coincidence or evolutionary accident—it is divine design. God has written His Sabbath law not only
              on tablets of stone, but in the very cells of our bodies.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Neurological Evidence - Accelerated Brain Development</h3>

            <p className="mb-4">
              Additional research published in PubMed (2014) reveals even more astounding evidence: neuron growth
              significantly accelerates from Friday night to Saturday night in rat brains. This neurological study
              demonstrates that God has programmed even the brain development patterns of His creatures to recognize the
              Sabbath period. The very neurons that form our thoughts and memories grow at an accelerated rate during
              the biblical Sabbath hours, as if the Creator has designed our minds to be especially receptive to
              spiritual growth and renewal during His holy time.
            </p>

            <h3 className="text-2xl font-semibold mb-4">The Implications of Biological Sabbath Recognition</h3>

            <p className="mb-4">
              These biological discoveries provide irrefutable scientific proof that the Sabbath is not merely a human
              tradition or cultural preference, but a divine ordinance written into the very fabric of creation. From
              the molecular level of melatonin production to the neurological patterns of brain development, God has
              embedded Sabbath recognition throughout His creation. Science itself testifies that Saturday, the seventh
              day, is indeed special in the eyes of our Creator.
            </p>

            <p className="mb-4">
              This evidence completely demolishes the argument that the Sabbath is an arbitrary human institution. If
              evolution were true, there would be no reason for weekly biological cycles to exist, much less cycles that
              peak on the seventh day. The fact that our bodies are programmed to recognize Saturday as special is
              powerful testimony to the Creator who established the Sabbath at the foundation of the world.
            </p>

            <p className="mb-4">
              Furthermore, this scientific evidence reveals the wisdom of God's design. The Sabbath is not just a
              spiritual principle, but a biological necessity. Our bodies are designed to need the rest and renewal that
              comes with Sabbath observance. Those who ignore the Sabbath are not only disobeying God's commandment, but
              working against their own biological design.
            </p>
          </section>

          {/* Chapter 3 */}
          <section id="chapter-3" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Chapter 3: The Spiritual Rest - Hebrews 4 and the Sabbath Promise
            </h2>

            <p className="mb-4">
              The book of Hebrews provides the most comprehensive New Testament teaching on the Sabbath, revealing its
              profound spiritual significance and its continuing relevance for Christians. Far from abolishing the
              Sabbath, Hebrews 4 establishes it as a fundamental principle of Christian faith and experience.
            </p>

            <div className="bg-purple-50 dark:bg-purple-950/30 border-l-4 border-purple-500 p-6 mb-6">
              <blockquote className="text-lg italic">
                <p className="mb-4">
                  <strong>
                    "Let us therefore fear, lest, a promise being left us of entering into his rest, any of you should
                    seem to come short of it. For unto us was the gospel preached, as well as unto them: but the word
                    preached did not profit them, not being mixed with faith in them that heard it. For we which have
                    believed do enter into rest, as he said, As I have sworn in my wrath, If they shall enter into my
                    rest: although the works were finished from the foundation of the world. For he spake in a certain
                    place of the seventh day on this wise, And God did rest the seventh day from all his works... There
                    remaineth therefore a rest to the people of God."
                  </strong>
                </p>
                <cite>— Hebrews 4:1-4, 9 (KJV)</cite>
              </blockquote>
            </div>

            <p className="mb-4">
              This remarkable passage weaves together three different "rests": the creation rest of Genesis 2, the
              Canaan rest that Israel failed to enter due to unbelief, and the spiritual rest that remains for God's
              people. The author demonstrates that these are not separate concepts, but different aspects of the same
              divine principle.
            </p>

            <p className="mb-4">
              The climactic declaration comes in verse 9: "There remaineth therefore a rest to the people of God." The
              Greek word translated "rest" here is "sabbatismos," which literally means "Sabbath-keeping" or "Sabbath
              observance." This is the only place in the New Testament where this specific word is used, and its meaning
              is unmistakable. The author is saying that there remains a Sabbath-keeping for the people of God.
            </p>

            <p className="mb-4">
              This is not merely spiritual symbolism. The author is establishing that the Sabbath principle—both
              physical and spiritual—continues to be relevant for Christians. The physical Sabbath points to and
              participates in the spiritual rest that God provides through faith in Christ.
            </p>
          </section>

          {/* Chapter 4 */}
          <section id="chapter-4" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Chapter 4: Christ and the Sabbath - The Perfect Example
            </h2>

            <p className="mb-4">
              The greatest testimony to the continuing validity of the Sabbath comes from Jesus Christ Himself. Far from
              abolishing the Sabbath, Christ honored it, kept it, and taught its true meaning. His example provides the
              perfect pattern for Christian Sabbath observance.
            </p>

            <div className="bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500 p-6 mb-6">
              <blockquote className="text-lg italic">
                <p className="mb-4">
                  <strong>
                    "And he came to Nazareth, where he had been brought up: and, as his custom was, he went into the
                    synagogue on the sabbath day, and stood up for to read."
                  </strong>
                </p>
                <cite>— Luke 4:16 (KJV)</cite>
              </blockquote>
            </div>

            <p className="mb-4">
              The phrase "as his custom was" is significant. This was not an occasional practice, but a regular habit.
              Sabbath observance was Christ's regular custom throughout His earthly ministry.
            </p>

            <p className="mb-4">
              When criticized for healing on the Sabbath, Jesus responded: "The sabbath was made for man, and not man
              for the sabbath: Therefore the Son of man is Lord also of the sabbath" (Mark 2:27-28, KJV). Christ
              declares that "the sabbath was made for man"—referring back to creation, when the Sabbath was established
              for Adam and Eve before there was a single Jew.
            </p>

            <p className="mb-4">
              Perhaps the most significant aspect of Christ's relationship to the Sabbath is found in His death and
              resurrection. The Gospel of Luke records: "And that day was the preparation, and the sabbath drew on. And
              the women also, which came with him from Galilee, followed after, and beheld the sepulchre, and how his
              body was laid. And they returned, and prepared spices and ointments; and rested the sabbath day according
              to the commandment" (Luke 23:54-56, KJV).
            </p>

            <p className="mb-4">
              Even in death, Christ honored the Sabbath. He died on Friday, the preparation day, and rested in the tomb
              on the Sabbath. His followers "rested the sabbath day according to the commandment." If the Sabbath had
              been abolished by Christ's death, why would these faithful followers continue to observe it?
            </p>

            <p className="mb-4">
              The apostle John provides the key to understanding our relationship to Christ's example: "And hereby we do
              know that we know him, if we keep his commandments... He that saith he abideth in him ought himself also
              so to walk, even as he walked" (1 John 2:3, 6, KJV). Christ walked in perfect obedience to His Father's
              commandments, including the Sabbath commandment. If we claim to know Him and abide in Him, we must walk as
              He walked.
            </p>
          </section>

          {/* Chapter 5 */}
          <section id="chapter-5" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Chapter 5: The Early Church - Faithful Witnesses Through History
            </h2>

            <p className="mb-4">
              The historical record clearly shows that the early Christian church continued to observe the seventh-day
              Sabbath for centuries after Christ's death. This observance was not limited to Jewish Christians, but
              included Gentile believers throughout the known world.
            </p>

            <h3 className="text-2xl font-semibold mb-4">The Testimony of Early Church Historians</h3>

            <p className="mb-4">
              Socrates Scholasticus, the renowned church historian writing in the fifth century, provides crucial
              testimony: "Almost all the churches throughout the world celebrate the sacred mysteries on the Sabbath of
              every week, yet the Christians of Alexandria and at Rome, on account of some ancient tradition, refuse to
              do this." This remarkable statement reveals that as late as the fifth century, Sabbath observance was the
              general rule throughout Christianity, with Rome and Alexandria being the exceptions.
            </p>

            <p className="mb-4">
              The historian further elaborates: "The people of Constantinople, and of several other cities, assemble
              together on the Sabbath as well as on the next day." This shows that even in Constantinople, the capital
              of the Eastern Roman Empire, Christians were observing both the Sabbath and Sunday.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Ancient Christianity Exemplified</h3>

            <p className="mb-4">
              Lyman Coleman, in his comprehensive work "Ancient Christianity Exemplified," provides this stunning
              admission: "Down even to the fifth century the observance of the Jewish Sabbath was continued in the
              Christian church, but with a rigor and solemnity gradually diminishing until it was wholly discontinued."
              This historical documentation proves that Sabbath observance was not immediately abandoned after Christ's
              death, but continued for centuries in the Christian church.
            </p>

            <h3 className="text-2xl font-semibold mb-4">The Ethiopian Church</h3>

            <p className="mb-4">
              The Ethiopian Orthodox Church provides one of the most remarkable testimonies to the preservation of
              Sabbath truth. For over 1,500 years, this ancient church has maintained the observance of both Saturday
              and Sunday, with Saturday being recognized as the biblical Sabbath. Ethiopian Christians understood that
              the Sabbath commandment had never been changed by divine authority, and they refused to abandon what God
              had established at creation.
            </p>

            <h3 className="text-2xl font-semibold mb-4">The Waldenses</h3>

            <p className="mb-4">
              The Waldenses, those faithful Christians who preserved biblical truth in the valleys of the Alps during
              the Dark Ages, also maintained Sabbath observance. The historian Peter Allix, in his work "Some Remarks
              upon the Ecclesiastical History of the Ancient Churches of Piedmont," notes that the Waldenses "did for a
              long time observe Saturday for the Sabbath."
            </p>

            <p className="mb-4">
              These mountain Christians, hidden away from papal persecution, maintained many biblical truths that had
              been abandoned by the mainstream church. Their observance of the Sabbath demonstrates that there was never
              a time when all Christians abandoned God's holy day. A faithful remnant always remained.
            </p>
          </section>

          {/* Chapter 6 */}
          <section id="chapter-6" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Chapter 6: The Great Deception - How the Sabbath Was Changed
            </h2>

            <p className="mb-4">
              The historical record of how the biblical Sabbath was changed from the seventh day of the week (Saturday)
              to the first day (Sunday) is one of the most shocking and revealing chapters in Christian history. This
              was not a change that came from Christ or the apostles, but from a gradual process of pagan infiltration
              and papal usurpation of authority.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Constantine's Sunday Law (321 AD)</h3>

            <p className="mb-4">
              The first major step in the official change came in 321 AD when the Roman Emperor Constantine, a
              sun-worshipper himself, issued the first Sunday law. This law stated: "On the venerable Day of the Sun let
              the magistrates and people residing in cities rest, and let all workshops be closed." Notice the language
              used: "the venerable Day of the Sun." This was not Christian terminology, but pagan. Constantine was not
              honoring Christ, but the sun god, Sol Invictus.
            </p>

            <h3 className="text-2xl font-semibold mb-4">The Council of Laodicea</h3>

            <p className="mb-4">
              The Council of Laodicea in the fourth century issued a canon that stated: "Christians shall not Judaize
              and be idle on Saturday, but shall work on that day; but the Lord's day they shall especially honour, and,
              as being Christians, shall, if possible, do no work on that day. If, however, they are found Judaizing,
              they shall be shut out from Christ." Here we see the beginning of the persecution of Sabbath-keepers.
            </p>

            <h3 className="text-2xl font-semibold mb-4">The Council of Trent Strategy</h3>

            <p className="mb-4">
              This claim was central to the Counter-Reformation. At the Council of Trent on January 18, 1562, the
              Archbishop of Reggio, Gaspar de Fosso, argued: "The sabbath the most glorious day in the Law has been
              changed to the Lords day; these and other similar matters have not ceased by virtue of Christ teaching,
              for he said that he has come to fulfill the law, not to destroy it, but they have been changed by the
              authority of the church."
            </p>

            <p className="mb-4">
              This was a direct challenge to the Protestant principle of "sola scriptura" (the Bible alone). The
              Archbishop declared that the church's authority was not based on Scripture alone, because the church had
              changed the Sabbath to Sunday, not by command of Christ, but by its own authority.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Catholic Church Claims</h3>

            <p className="mb-4">
              The Catholic Church has never been shy about claiming responsibility for this change. In fact, it boasts
              of it as a sign of its authority. The Catholic Record of London, Ontario, on September 1, 1923, stated:
              "Sunday is our mark of authority... The Church is above the Bible, and this transference of Sabbath
              observance is proof of that fact."
            </p>

            <p className="mb-4">
              The Catholic Encyclopedia openly admits: "The Church, after changing the day of rest from the Jewish
              Sabbath, or seventh day of the week, to the first, made the Third Commandment refer to Sunday as the day
              to be kept holy as the Lord's Day."
            </p>

            <h3 className="text-2xl font-semibold mb-4">Protestant Recognition of the Change</h3>

            <p className="mb-4">
              Even Protestant sources acknowledge that the Sabbath was changed by the Catholic Church, not by biblical
              authority. The Augsburg Confession of 1530 states in Article 28: "They [the Catholics] refer to the
              Sabbath-day as having been changed into the Lord's Day, contrary to the Decalog, as it seems. Neither is
              there any example whereof they make more than concerning the changing of the Sabbath-day. Great, say they,
              is the power of the Church, since it has dispensed with one of the Ten Commandments!"
            </p>
          </section>

          {/* Chapter 7 */}
          <section id="chapter-7" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Chapter 7: The Faithful Witnesses - Martyrs Who Died for Sabbath Truth
            </h2>

            <p className="mb-4">
              Throughout the dark centuries of papal supremacy, when the truth of God's Sabbath was obscured by human
              tradition and enforced by civil power, there remained faithful witnesses who chose death rather than
              compromise. These martyrs testify to the life-and-death importance of the Sabbath question.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Christina Tolingerin</h3>

            <p className="mb-4">
              Christina Tolingerin stands as one of the most eloquent witnesses to Sabbath truth. When brought before
              the authorities for her faith, she boldly declared: "In six days the Lord made the world, on the seventh
              day he rested. The other holy days have been instituted by popes, cardinals, and archbishops." Her words
              cut to the heart of the matter. She recognized that the Sabbath was established by God Himself at
              creation, while the other holy days were mere human inventions. For this testimony, she was condemned to
              death.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Barbara Von Thiers</h3>

            <p className="mb-4">
              Barbara Von Thiers provides another powerful testimony to Sabbath truth. When questioned about her
              beliefs, she courageously stated: "God had commanded to rest the seventh day... it was the true faith and
              the right way in Christ." Barbara understood that Sabbath observance was not legalism, but "the true faith
              and the right way in Christ."
            </p>

            <h3 className="text-2xl font-semibold mb-4">The Broader Sabbatarian Movement</h3>

            <p className="mb-4">
              These martyrs were not isolated individuals, but representatives of a larger movement of Sabbath-keeping
              Christians who existed throughout the dark centuries of papal supremacy. Historical records show that
              Sabbatarian groups existed in various parts of Europe, often facing severe persecution for their
              faithfulness to God's law.
            </p>

            <p className="mb-4">
              The persecution of these Sabbath-keepers was often brutal and systematic. The Inquisition specifically
              targeted those who observed the Sabbath, considering it a sign of heresy. The fact that the Inquisition
              considered Sabbath observance such a threat reveals the importance that the Catholic Church placed on
              maintaining Sunday observance as a mark of its authority.
            </p>
          </section>

          {/* Chapter 8 */}
          <section id="chapter-8" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Chapter 8: The Documentary Evidence - Confessions from Both Sides
            </h2>

            <p className="mb-4">
              The historical record regarding the change of the Sabbath is so overwhelming that it cannot be disputed by
              any honest student of history. What makes this evidence particularly compelling is that it comes not from
              hostile critics, but from the very institutions that made the change.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Catholic Admissions</h3>

            <p className="mb-4">
              The Catholic Church openly acknowledges that it changed the Sabbath from the seventh day to the first day.
              Cardinal Gibbons, in his book "The Faith of Our Fathers," made this stunning admission: "You may read the
              Bible from Genesis to Revelation, and you will not find a single line authorizing the sanctification of
              Sunday. The Scriptures enforce the religious observance of Saturday, a day which we never sanctify."
            </p>

            <p className="mb-4">
              The Catholic Mirror, the official organ of Cardinal Gibbons, published this bold challenge: "The Catholic
              Church for over one thousand years before the existence of a Protestant, by virtue of her divine mission,
              changed the day from Saturday to Sunday... The Christian Sabbath is therefore to this day the acknowledged
              offspring of the Catholic Church, as spouse of the Holy Ghost, without a word of remonstrance from the
              Protestant world."
            </p>

            <p className="mb-4">
              Rome's Challenge to Protestants states: "Most Christians assume that Sunday is the biblically approved day
              of worship. The Roman Catholic Church protests that it transferred Christian worship from the biblical
              Sabbath (Saturday) to Sunday, and that to try to argue that the change was made in the Bible is both
              dishonest and a denial of Catholic authority. If Protestantism wants to base its teachings only on the
              Bible, it should worship on Saturday."
            </p>

            <h3 className="text-2xl font-semibold mb-4">Protestant Acknowledgments</h3>

            <p className="mb-4">
              Dr. Edward T. Hiscox, author of "The Baptist Manual," made this remarkable statement: "There was and is a
              command to keep holy the Sabbath day, but that Sabbath day was not Sunday. It will however be readily
              said, and with some show of triumph, that the Sabbath was transferred from the seventh to the first day of
              the week... Earnestly desiring information on this subject, which I have studied for many years, I ask,
              where can the record of such a transaction be found? Not in the New Testament - absolutely not."
            </p>

            <h3 className="text-2xl font-semibold mb-4">The Challenge Remains Unanswered</h3>

            <p className="mb-4">
              The Catholic Church's challenge to Protestants remains unanswered because it cannot be answered. There is
              no biblical authority for Sunday observance. The entire practice rests on church tradition and papal
              authority.
            </p>
          </section>

          {/* Chapter 9 */}
          <section id="chapter-9" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Chapter 9: The Prophetic Dimension - The Beast That Changed Times and Laws
            </h2>

            <p className="mb-4">
              The change of the Sabbath from Saturday to Sunday is not merely a historical curiosity, but the
              fulfillment of one of the most significant prophecies in the Bible. The book of Daniel, written centuries
              before these events occurred, foretold with stunning accuracy the rise of a power that would "think to
              change times and laws."
            </p>

            <h3 className="text-2xl font-semibold mb-4">Daniel's Prophecy</h3>

            <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-6 mb-6">
              <blockquote className="text-lg italic">
                <p className="mb-4">
                  <strong>
                    "And he shall speak great words against the most High, and shall wear out the saints of the most
                    High, and think to change times and laws: and they shall be given into his hand until a time and
                    times and the dividing of time."
                  </strong>
                </p>
                <cite>— Daniel 7:25 (KJV)</cite>
              </blockquote>
            </div>

            <p className="mb-4">
              The papacy fulfills this prophecy with remarkable precision. It has claimed authority to change God's law,
              specifically the fourth commandment regarding the Sabbath. The time period mentioned - "a time and times
              and the dividing of time" - represents 1,260 years, corresponding precisely to the time of papal supremacy
              from 538 AD to 1798 AD.
            </p>

            <h3 className="text-2xl font-semibold mb-4">The Three Angels' Messages</h3>

            <p className="mb-4">
              The connection between these prophecies and the Sabbath becomes clear when we consider the three angels'
              messages of Revelation 14. The first angel proclaims: "Fear God, and give glory to him; for the hour of
              his judgment is come: and worship him that made heaven, and earth, and the sea, and the fountains of
              waters" (Revelation 14:7, KJV).
            </p>

            <p className="mb-4">
              This message contains language directly taken from the fourth commandment. Compare the words of the first
              angel with the reason given for Sabbath observance in Exodus 20:11: "For in six days the LORD made heaven
              and earth, the sea, and all that in them is, and rested the seventh day." The parallel is unmistakable.
              The first angel is calling the world back to worship of the Creator, using the exact same language that
              establishes the Sabbath as the memorial of creation.
            </p>

            <p className="mb-4">
              This is not coincidental. The first angel's message is a direct call to Sabbath observance. In the final
              crisis, when the world is called to choose between the commandments of God and the traditions of men, the
              Sabbath becomes the test of loyalty.
            </p>

            <h3 className="text-2xl font-semibold mb-4">The Mark of the Beast</h3>

            <p className="mb-4">
              The third angel's message warns against receiving "the mark of the beast." This mark is contrasted with
              the seal of God, which is connected to His law and His Sabbath. The Sabbath becomes the final test of
              whether we will worship according to God's commandments or according to human tradition.
            </p>
          </section>

          {/* Chapter 10 */}
          <section id="chapter-10" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Chapter 10: The Call to Return - Restoring the Sabbath in the Final Hour
            </h2>

            <p className="mb-4">
              As we stand on the threshold of eternity, the call to return to biblical truth becomes more urgent than
              ever. The Sabbath, which has been obscured by centuries of tradition and papal authority, must be restored
              to its rightful place in Christian faith and practice.
            </p>

            <h3 className="text-2xl font-semibold mb-4">The Repairer of the Breach</h3>

            <div className="bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-indigo-500 p-6 mb-6">
              <blockquote className="text-lg italic">
                <p className="mb-4">
                  <strong>
                    "And they that shall be of thee shall build the old waste places: thou shalt raise up the
                    foundations of many generations; and thou shalt be called, The repairer of the breach, The restorer
                    of paths to dwell in. If thou turn away thy foot from the sabbath, from doing thy pleasure on my
                    holy day; and call the sabbath a delight, the holy of the LORD, honourable; and shalt honour him,
                    not doing thine own ways, nor finding thine own pleasure, nor speaking thine own words: Then shalt
                    thou delight thyself in the LORD; and I will cause thee to ride upon the high places of the earth,
                    and feed thee with the heritage of Jacob thy father: for the mouth of the LORD hath spoken it."
                  </strong>
                </p>
                <cite>— Isaiah 58:12-14 (KJV)</cite>
              </blockquote>
            </div>

            <p className="mb-4">
              The "breach" in God's law was made when the fourth commandment was changed from the seventh day to the
              first day. In the final hour of earth's history, God will raise up a people who will repair this breach
              and restore the Sabbath to its rightful place.
            </p>

            <h3 className="text-2xl font-semibold mb-4">The Final Test</h3>

            <p className="mb-4">
              The description of God's faithful people in Revelation 14:12 is particularly significant: "Here is the
              patience of the saints: here are they that keep the commandments of God, and the faith of Jesus." These
              people are characterized by keeping the commandments of God (including the Sabbath commandment) and having
              faith in Jesus.
            </p>

            <h3 className="text-2xl font-semibold mb-4">The Eternal Sabbath</h3>

            <div className="bg-green-50 dark:bg-green-950/30 border-l-4 border-green-500 p-6 mb-6">
              <blockquote className="text-lg italic">
                <p className="mb-4">
                  <strong>
                    "For as the new heavens and the new earth, which I will make, shall remain before me, saith the
                    LORD, so shall your seed and your name remain. And it shall come to pass, that from one new moon to
                    another, and from one sabbath to another, shall all flesh come to worship before me, saith the
                    LORD."
                  </strong>
                </p>
                <cite>— Isaiah 66:22-23 (KJV)</cite>
              </blockquote>
            </div>

            <p className="mb-4">
              The Sabbath that God established at creation, that Christ observed during His earthly ministry, and that
              will be kept in the new earth, calls to us today. It is a call to rest, to worship, to remember our
              Creator, and to prepare for eternity. This is not a temporary ordinance or a burden to be endured, but an
              eternal gift from a loving God.
            </p>

            <p className="mb-4">
              The complete fourth commandment stands as God's eternal standard: "Remember the sabbath day, to keep it
              holy. Six days shalt thou labour, and do all thy work: But the seventh day is the sabbath of the LORD thy
              God: in it thou shalt not do any work, thou, nor thy son, nor thy daughter, thy manservant, nor thy
              maidservant, nor thy cattle, nor thy stranger that is within thy gates: For in six days the LORD made
              heaven and earth, the sea, and all that in them is, and rested the seventh day: wherefore the LORD blessed
              the sabbath day, and hallowed it" (Exodus 20:8-11, KJV).
            </p>

            <p className="mb-4">
              This is not just a commandment from the past, but a call for today and for eternity. From creation to the
              new earth, from Eden to the New Jerusalem, the Sabbath remains God's holy day. May we have ears to hear,
              hearts to obey, and the faith to trust in Him who calls us to enter into His rest.
            </p>
          </section>

          {/* References */}
          <section id="references" className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">References</h2>

            <div className="bg-card/30 border border-border rounded-lg p-6">
              <ol className="space-y-2 text-sm">
                <li>
                  [1] Martin Luther, In Primum Librum Mose Enarrationes, 1544. Available at:
                  https://www.digitale-sammlungen.de/en/view/bsb11203534
                </li>
                <li>
                  [2] Dr. Kenneth Greenaway, "Circadian Rhythms and the Pineal Gland: Evidence for Weekly Melatonin
                  Cycles," Scientific Journal of Biology, 2022.
                </li>
                <li>
                  [3] "Neurogenesis and circadian rhythms in mammalian brain development," PubMed, 2014.
                  https://pubmed.ncbi.nlm.nih.gov/24746375/
                </li>
                <li>
                  [4] Socrates Scholasticus, Ecclesiastical History, Book 5, Chapter 22. Available at:
                  https://www.newadvent.org/fathers/26015.htm
                </li>
                <li>[5] Ibid., Book 7, Chapter 19.</li>
                <li>
                  [6] Lyman Coleman, Ancient Christianity Exemplified, Philadelphia: Lippincott, Grambo & Co., 1852, p.
                  527.
                </li>
                <li>
                  [7] Peter Allix, Some Remarks upon the Ecclesiastical History of the Ancient Churches of Piedmont,
                  London, 1690, p. 178.
                </li>
                <li>[8] "Dissertation on the Lord's Day Sabbath," page 33.</li>
                <li>[9] New York Weekly Tribune, May 24, 1900.</li>
                <li>[10] Codex Justinianus, lib. 3, tit. 12, 3.</li>
                <li>[11] Council of Laodicea, Canon 29.</li>
                <li>[12] The Catholic Record, London, Ontario, September 1, 1923.</li>
                <li>[13] The Catholic Encyclopedia, Vol. 4, p. 153.</li>
                <li>
                  [14] Giovanni Domenico Mansi, Sacrorum Conciliorum Nova et Amplissima Collectio, Vol. 33, col. 529,
                  530.
                </li>
                <li>[15] Augsburg Confession, Article 28.</li>
                <li>
                  [16] Rev. Henry Tuberville, "An Abridgment of Christian Doctrine," Douay College, France, 1649, page
                  58.
                </li>
                <li>[17] Thieleman J. van Braght, Der Blutige Schau-Platz Oder Martyrer-Spiegel, 1660.</li>
                <li>[18] Ibid.</li>
                <li>
                  [19] James Cardinal Gibbons, The Faith of Our Fathers, Baltimore: John Murphy Company, 1917, p. 72-73.
                </li>
                <li>[20] The Catholic Mirror, September 23, 1893.</li>
                <li>[21] Rome's Challenge, Available at: https://www.romeschallenge.com/</li>
                <li>
                  [22] Dr. Edward T. Hiscox, report of his sermon at the Baptist Ministers' Conference, New York
                  Examiner, November 16, 1893.
                </li>
              </ol>
            </div>
          </section>
        </article>

        {/* Related Articles */}
        <div className="mt-16 pt-8 border-t border-border">
          <RelatedArticles currentPostSlug="the-forgotten-commandment" />
        </div>
      </div>
    </div>
  )
}
