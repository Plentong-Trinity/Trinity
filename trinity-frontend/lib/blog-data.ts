export const blogPosts = [
  {
    slug: "the-sabbath-truth",
    title: "The Sabbath Truth: The Day God Sanctified, Rome Abolished, and Faithful Witnesses Preserved Through Blood",
    excerpt:
      "A comprehensive exposé tracing the golden thread of Sabbath truth from the Apostolic Church through centuries of persecution to the final crisis. Discover how Rome changed God's holy day and why faithful witnesses chose death over compromise.",
    date: "2025-01-21",
    readTime: "65 min read",
    imageUrl: "/sabbath-truth-image.png",
    tags: ["Sabbath", "Biblical Truth", "History", "Prophecy", "Martyrs", "Rome", "Commandments"],
    featured: true,
  },
  {
    slug: "what-israel-is-the-bible-speaking-of",
    title: "What Israel is The Bible Speaking Of?",
    excerpt:
      "A comprehensive biblical investigation into God's true people. Discover the shocking truth about spiritual Israel and how it transforms our understanding of prophecy, salvation, and the final test of loyalty.",
    date: "2025-01-20",
    readTime: "50 min read",
    imageUrl: "/spiritual-israel.png",
    tags: ["Israel", "Prophecy", "Biblical Truth", "Salvation", "End Times"],
    featured: true,
  },
  {
    slug: "total-onslaught-war-on-liberties",
    title: "Total Onslaught: The War on Our Liberties",
    excerpt:
      "An in-depth examination of the systematic assault on religious freedom and constitutional rights, tracing the historical patterns of oppression and the forces working to undermine liberty of conscience in our time.",
    date: "2025-01-15",
    readTime: "45 min read",
    imageUrl: "/total-onslaught.png",
    tags: ["Religious Freedom", "History", "Prophecy", "Liberty"],
    featured: true,
  },
  {
    slug: "the-forgotten-commandment",
    title: "The Forgotten Commandment: Exposing the Great Sabbath Deception",
    excerpt:
      "A comprehensive investigation into how the biblical Sabbath was changed from Saturday to Sunday, revealing the shocking historical evidence, scientific proof, and prophetic significance of this great deception.",
    date: "2025-01-19",
    readTime: "35 min read",
    imageUrl: "/forgotten-commandment.jpg",
    tags: ["Sabbath", "Biblical Truth", "History", "Prophecy", "Science"],
    featured: true,
  },
  {
    slug: "the-kingdoms-foretold",
    title: "The Kingdoms Foretold: Daniel's Prophetic Vision",
    excerpt:
      "Explore Daniel's remarkable prophecy of the four kingdoms and discover how history has unfolded exactly as foretold, revealing God's sovereignty over the rise and fall of nations.",
    date: "2025-01-10",
    readTime: "25 min read",
    imageUrl: "/kingdoms-foretold.png",
    tags: ["Prophecy", "Daniel", "History", "Biblical Truth"],
    featured: true,
  },
  {
    slug: "the-great-deception",
    title: "The Great Deception: Unmasking End-Time Delusions",
    excerpt:
      "An urgent warning about the spiritual deceptions that will sweep the world in the last days, and how to stand firm in biblical truth when error appears as light.",
    date: "2025-01-08",
    readTime: "30 min read",
    imageUrl: "/the-great-deception.png",
    tags: ["End Times", "Deception", "Biblical Truth", "Prophecy"],
    featured: false,
  },
  {
    slug: "daniels-70-weeks",
    title: "Daniel's 70 Weeks: The Messianic Prophecy Fulfilled",
    excerpt:
      "Discover the mathematical precision of Daniel's 70-week prophecy and how it pinpoints the exact time of Christ's ministry, death, and the end of probation for ancient Israel.",
    date: "2025-01-05",
    readTime: "20 min read",
    imageUrl: "/daniels-70-weeks.png",
    tags: ["Prophecy", "Daniel", "Messiah", "Biblical Truth"],
    featured: false,
  },
  {
    slug: "the-hell-doctrine-exposed",
    title: "The Hell Doctrine Exposed: Unmasking Christianity's Greatest Deception",
    excerpt:
      "A comprehensive biblical examination revealing how the doctrine of eternal torment contradicts Scripture and originated from pagan mythology, not divine revelation.",
    date: "2025-01-03",
    readTime: "40 min read",
    imageUrl: "/hell-doctrine-exposed.png",
    tags: ["Biblical Truth", "Hell", "Doctrine", "Theology"],
    featured: false,
  },
  {
    slug: "when-light-broke-through",
    title: "When Light Broke Through: The Protestant Reformation",
    excerpt:
      "Journey through the pivotal moments when brave reformers challenged centuries of religious darkness, restoring biblical truth and the principle of Scripture alone.",
    date: "2024-12-28",
    readTime: "35 min read",
    imageUrl: "/when-light-broke-through.jpg",
    tags: ["Reformation", "History", "Biblical Truth", "Religious Freedom"],
    featured: false,
  },
  {
    slug: "echoes-in-the-dust",
    title: "Echoes in the Dust: Voices from the Persecuted Church",
    excerpt:
      "Hear the powerful testimonies of those who suffered for their faith throughout history, and discover the timeless truths that sustained them through persecution.",
    date: "2024-12-25",
    readTime: "28 min read",
    imageUrl: "/echoes-in-the-dust.png",
    tags: ["Persecution", "Church History", "Faith", "Martyrs"],
    featured: false,
  },
  {
    slug: "open-source-is-free-speech",
    title: "Open Source is Free Speech: The Digital Reformation",
    excerpt:
      "Exploring how open-source technology mirrors the principles of religious freedom and why decentralized, transparent systems are essential for preserving liberty in the digital age.",
    date: "2024-12-20",
    readTime: "15 min read",
    imageUrl: "/open-source-speech.png",
    tags: ["Technology", "Freedom", "Open Source", "Digital Rights"],
    featured: false,
  },
]

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRelatedPosts(currentSlug: string, limit = 3) {
  return blogPosts.filter((post) => post.slug !== currentSlug).slice(0, limit)
}
