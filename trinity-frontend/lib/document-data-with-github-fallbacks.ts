export type Document = {
  id: number
  title: string
  author?: string
  description: string
  category: string
  ipfsLink: string
  filename: string
  tags: string[]
  featured?: "newly-added" | "essential" | "controversial" | string
  importance?: "high" | "critical" | string
  coverImageUrl?: string
}

function getHash(link: string) {
  const m = link.match(/([a-zA-Z0-9]{46,})/)
  return m ? m[1] : ""
}

export type DocumentSource = Document & {
  ipfsHash: string
  githubUrl: string
}

export const allDocuments: Document[] = [
  {
    id: 1,
    title: "0-100 AD – Early Church History",
    description:
      "Documents covering the apostolic era and early Christian church development during the first century.",
    category: "historical",
    ipfsLink:
      "https://bafybeiekpl6nqwo5kz5k4qmgwo5f3e4ilrd3vkmecjx6ajjmaddr2ues6q.ipfs.w3s.link/History-Of-The-Christian-Church-01.pdf",
    filename: "History-Of-The-Christian-Church-01.pdf",
    tags: ["early-church", "apostolic", "first-century"],
  },
  {
    id: 2,
    title: "100-325 AD – Christianity under Persecution & Early Councils",
    description: "Records of Christian persecution under the Roman Empire and the formation of early church councils.",
    category: "historical",
    ipfsLink:
      "https://bafybeien7jecrd3kenxxbvkjmm4op3vcpef3arspb7rtigzy7es72thzea.ipfs.w3s.link/History-Of-The-Christian-Church-02.pdf",
    filename: "History-Of-The-Christian-Church-02.pdf",
    tags: ["persecution", "councils", "roman-empire"],
  },
  {
    id: 3,
    title: "311-600 AD – Constantine, Church-State Alliance",
    description:
      "Documents covering the Constantinian shift and the establishment of Christianity as a state religion.",
    category: "historical",
    ipfsLink:
      "https://bafybeifybhwroffbk4zemaodqow63ovgg4wpcx26kqjldnkrgwnxzqvgfe.ipfs.w3s.link/History-Of-The-Christian-Church-03.pdf",
    filename: "History-Of-The-Christian-Church-03.pdf",
    tags: ["constantine", "church-state", "byzantine"],
  },
  {
    id: 4,
    title: "590-1073 AD – Medieval Christianity",
    description: "Records from the early medieval period including the rise of monasticism and the Great Schism.",
    category: "historical",
    ipfsLink:
      "https://bafybeibsmpi5tsv6x5qpvqlc7kxltnggnhocn473fpnfdok3xkwziy4h2q.ipfs.w3s.link/History-Of-The-Christian-Church-04.pdf",
    filename: "History-Of-The-Christian-Church-04.pdf",
    tags: ["medieval", "monasticism", "schism"],
  },
  {
    id: 5,
    title: "1049-1294 AD – The Middle Ages, Crusades, Papal Power",
    description: "Documents covering the height of papal power, the crusades, and medieval theological developments.",
    category: "historical",
    ipfsLink:
      "https://bafybeiayp3mee6y523jix5xjvmqd75kyiuraz2mptyy7ayseay754gwkd4.ipfs.w3s.link/History-Of-The-Christian-Church-05.pdf",
    filename: "History-Of-The-Christian-Church-05.pdf",
    tags: ["crusades", "papal", "middle-ages"],
  },
  {
    id: 6,
    title: "1294-1517 AD – Late Middle Ages & Early Dissenters",
    description: "Records of pre-Reformation movements and early dissenters like Wycliffe and Hus.",
    category: "historical",
    ipfsLink:
      "https://bafybeigstzwkc3ben7bumggrj2orq6jjb4gnaqfwxfcxjo7t3ojqu6kpuy.ipfs.w3s.link/History-Of-The-Christian-Church-06.pdf",
    filename: "History-Of-The-Christian-Church-06.pdf",
    tags: ["wycliffe", "hus", "pre-reformation"],
  },
  {
    id: 7,
    title: "Modern Christianity – The German Reformation",
    description: "Documents covering Martin Luther and the German Reformation movement.",
    category: "historical",
    ipfsLink:
      "https://bafybeiccepga3pk3vyhwtq2ws7qccjgihmhcpc4xlxq56w27gxeuuuu2jy.ipfs.w3s.link/History-Of-The-Christian-Church-07.pdf",
    filename: "History-Of-The-Christian-Church-07.pdf",
    tags: ["luther", "reformation", "germany"],
  },
  {
    id: 8,
    title: "Modern Christianity – The Swiss Reformation",
    description: "Records of Zwingli, Calvin, and the Swiss Reformation movement.",
    category: "historical",
    ipfsLink:
      "https://bafybeicxrgd7gnv2pbcbhmn4cuonewahlbbsbgrsnriswhssidyj4k6xii.ipfs.w3s.link/History-Of-The-Christian-Church-08.pdf",
    filename: "History-Of-The-Christian-Church-08.pdf",
    tags: ["calvin", "zwingli", "switzerland"],
  },
  {
    id: 9,
    title: "History of the Reformation of the Sixteenth Century",
    description: "J. H. Merle D'Aubigné's comprehensive account of the Protestant Reformation.",
    category: "historical",
    ipfsLink:
      "https://bafybeigfcon7n4hgcem2e72uuzshesq2lroqz22fqnzhcg5yapxxs7moge.ipfs.w3s.link/History-Of-The-Reformation.pdf",
    filename: "History-Of-The-Reformation.pdf",
    tags: ["reformation", "sixteenth-century", "protestant"],
  },
  {
    id: 10,
    title: "The Holy Bible - 1611 King James Version",
    description:
      "The Authorized King James Version of the Holy Bible, first published in 1611, one of the most influential and widely read Bible translations in English.",
    category: "translations",
    ipfsLink:
      "https://bafybeigjaa6mkofcjbr3bk6x5a5qx7c42pbig4ahmqoxp6hz7upqupgzg4.ipfs.w3s.link/The%20Holy%20Bible%20from%201611%20(KJV).pdf",
    filename: "The Holy Bible from 1611 (KJV).pdf",
    tags: ["king-james", "english", "authorized-version"],
  },
  {
    id: 11,
    title: "The Geneva Bible",
    author: "Various Translators",
    description:
      "The primary Bible of the Protestant Reformation, used by Shakespeare, Bunyan, and the Puritans. A cornerstone of religious freedom.",
    category: "translations",
    ipfsLink: "https://bafybeif3vahxl7qepgxwiuym4yx4fgn3nwimfqhpb5jaqsts4ydtfp4lny.ipfs.w3s.link/GenevaBible.pdf",
    filename: "GenevaBible.pdf",
    tags: ["geneva", "reformation", "puritan"],
    coverImageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5229-CbXrdWme3XQByb1oJYMLMdjDwsOqpq.jpeg",
  },
  {
    id: 12,
    title: "The Bible and Bible Translations: Summary of Changes",
    description:
      "A comprehensive overview of Bible translations throughout history and the key differences between various versions.",
    category: "translations",
    ipfsLink:
      "https://bafybeibpm4rsxhlag73o7gpkmbbhwwjdgnrklli3lqajj4hwoekaz365im.ipfs.w3s.link/The-Bible-and-Bible-Translations.pdf",
    filename: "The-Bible-and-Bible-Translations.pdf",
    tags: ["comparison", "history", "translations"],
  },
  {
    id: 13,
    title: "The Vatican Moscow Washington Alliance",
    description:
      "By Avro Manhattan. An investigation into the political relationships between the Vatican, Moscow, and Washington during the Cold War era.",
    category: "suppressed-books",
    ipfsLink:
      "https://bafybeievqghvnqsdfu4aqmzxkt7a6soacrk7bke2zgckkoxwtzs3ghovxm.ipfs.w3s.link/the-vatican-moscow-washington-alliance-avro-manhattan.pdf",
    filename: "the-vatican-moscow-washington-alliance-avro-manhattan.pdf",
    tags: ["vatican", "geopolitics", "cold-war"],
  },
  {
    id: 14,
    title: "IBM and the Holocaust",
    description:
      "Details how IBM's technology and business practices facilitated Nazi Germany's identification and tracking of Jews during the Holocaust.",
    category: "suppressed-books",
    ipfsLink:
      "https://bafybeibfnhwgvuuz3gcvkkj2uqz7khrgi63h3uh55c3jbvcaxfra3epddy.ipfs.w3s.link/IBM%20and%20The%20Holocaust.pdf",
    filename: "IBM and The Holocaust.pdf",
    tags: ["holocaust", "technology", "corporate-complicity"],
  },
  {
    id: 15,
    title: "Pawns in The Game",
    description:
      "By William Guy Carr. A controversial examination of international politics, banking, and secret societies throughout history.",
    category: "suppressed-books",
    ipfsLink: "https://bafybeidnymswczunn5ukb2keoznwg4wu3a37gweki7k4ngg7gvxel73gpq.ipfs.w3s.link/pawnsinthegame.pdf",
    filename: "pawnsinthegame.pdf",
    tags: ["conspiracy", "banking", "world-order"],
  },
  {
    id: 16,
    title: "Be Wise as Serpents",
    description:
      "By Fritz Springmeier. An investigation into the influence of secret societies and powerful families on world events and religious institutions.",
    category: "suppressed-books",
    ipfsLink:
      "https://bafybeih3k2ophkmquswy25uiilpyr5shmovfckbtuwtpbb2tthnwkidz6e.ipfs.w3s.link/Be%20Wise%20as%20Serpents.pdf",
    filename: "Be Wise as Serpents.pdf",
    tags: ["secret-societies", "religious-history", "power-structures"],
  },
  {
    id: 17,
    title: "The Gospel in Creation",
    description:
      "By E. J. Waggoner. An exploration of how the gospel message is reflected in the natural world and creation itself.",
    category: "prophecy",
    ipfsLink:
      "https://bafybeigjx3bbbuslsqrjg7pxelbprcsozh6vtyuaztwnti4oscqcmqh6hq.ipfs.w3s.link/The-Gospel-In-Creation.pdf",
    filename: "The-Gospel-In-Creation.pdf",
    tags: ["gospel", "creation", "nature", "theology"],
  },
  {
    id: 18,
    title: "Night Journey From Rome",
    description:
      "A powerful and deeply personal account of Clark Butterfield's transformation from a Roman Catholic priest to a born-again Christian. Written shortly before his death, this book courageously explores the theological contradictions he discovered within Catholicism, his growing disillusionment with institutional religion, and his ultimate spiritual rebirth in Christ.",
    category: "suppressed-books",
    ipfsLink:
      "https://bafybeie3stm2b4evncz5f46igv3atim6jcwufju7guoe4fofup5xvbmpim.ipfs.w3s.link/Night%20journey%20from%20Rome.pdf",
    filename: "Night journey from Rome.pdf",
    tags: ["catholicism", "conversion", "testimony", "spiritual-journey"],
  },
  {
    id: 19,
    title: "Secret Societies and Psychological Warfare",
    description:
      "Historian Michael A. Hoffman II presents a chilling exposé on the invisible influence of occult systems and esoteric rituals embedded within modern political, religious, and cultural institutions. This prophetic work dissects how mass manipulation, trauma-based symbolism, and ritualized deception have been used to shape public consciousness and suppress spiritual awakening.",
    category: "suppressed-books",
    ipfsLink:
      "https://bafybeiaftqvfd5gux3my6hofs6p754lsodicvr6u3l262vte2uiooduxoa.ipfs.w3s.link/secret-societies-and-psychological-warfare.pdf",
    filename: "secret-societies-and-psychological-warfare.pdf",
    tags: ["occult-symbolism", "psychological-manipulation", "secret-societies", "mind-control"],
  },
  {
    id: 20,
    title: "The Black Pope: A History of the Jesuits",
    description:
      'This powerful exposé, written by a former Catholic nun, M.F. Cusack, lifts the veil on the secretive history and far-reaching influence of the Jesuit Order—often referred to as "the Church\'s most dangerous agents." This rare firsthand account details the strategies, political intrigues, and religious subversions used by the Jesuits to manipulate global affairs.',
    category: "suppressed-books",
    ipfsLink:
      "https://bafybeiczyiggdkihinibzaxrc46gr452x6kuwqfs4az7slhnj2gvakfumy.ipfs.w3s.link/The%20Black%20Pope%20-%20A%20History%20of%20the%20Jesuits%20(Mary%20Francis%20Cusack).pdf",
    filename: "The Black Pope - A History of the Jesuits (Mary Francis Cusack).pdf",
    tags: ["jesuits", "catholic-church", "religious-history", "geopolitics"],
  },
  {
    id: 21,
    title: "The Doctrine of the Fourth Commandement",
    description:
      "Preserved as a single surviving copy in the Oxford Library, this rare 1650 treatise by James Ockford is a bold defense of the seventh-day Sabbath. Written during a time of great theological turbulence, Ockford challenges the growing institutional shift from Saturday to Sunday observance, arguing from Scripture, logic, and conscience that the seventh day—not the first—is the true Christian Sabbath.",
    category: "suppressed-books",
    ipfsLink:
      "https://bafybeie2mwlhlot7dp7vd6incimsrciikwd646renxrzp2wgz26wxdsowa.ipfs.w3s.link/%5BTCP%5D%20The%20doctrine%20of%20the%20Fourth%20Commandement%2C%20deformed%20by%20popery%2C%20reformed%20%26%20re.pdf",
    filename: "[TCP] The doctrine of the Fourth Commandement, deformed by popery, reformed & re.pdf",
    tags: ["sabbath", "reformation", "biblical-law", "church-history"],
  },
  {
    id: 22,
    title: "50 Years in The Church of Rome",
    description:
      "Charles Chiniquy, a Catholic priest for five decades, offers this courageous and controversial testimony from inside the heart of Roman Catholicism. Exposing manipulation, political entanglements, and deep spiritual conflict, Chiniquy reveals how his conscience and study of the Scriptures ultimately led him to break away—at great personal cost.",
    category: "suppressed-books",
    ipfsLink:
      "https://bafybeiewunrksen6hxpime5badiwdxk2jbr2gaixmhnmundpl67sspmhy4.ipfs.w3s.link/50%20years%20in%20the%20church%20at%20Rome.pdf",
    filename: "50 years in the church at Rome.pdf",
    tags: ["catholicism", "testimony", "religious-freedom", "reformation"],
  },
  {
    id: 23,
    title: "The Illuminati Formula Used To Create An Undetectable Total Mind Controlled Slave",
    description:
      "This detailed manual, based on survivor testimony, declassified CIA files, and research from inside intelligence and occult networks, lays out the disturbing blueprint for how trauma-based mind control has been used to fracture identity, suppress memory, and create programmable individuals. The authors connect government-sponsored programs like MK-Ultra with occult ritual abuse, showing how elite power structures engineered mind control systems.",
    category: "suppressed-books",
    ipfsLink:
      "https://bafybeicjglhq2czc7ocvqj5vxp3j7py25m2m6ce36ai2zagmu2wraiszxu.ipfs.w3s.link/Undetected%20Mind%20Controlled%20Slave.pdf",
    filename: "Undetected Mind Controlled Slave.pdf",
    tags: ["mind-control", "mk-ultra", "trauma-programming", "intelligence-agencies"],
  },
  {
    id: 24,
    title: "The Deadly Deception",
    description:
      "The gripping personal testimony of Jim Shaw, a former 33rd-degree Freemason and active participant in elite Masonic ceremonies, who came to believe that the core teachings of Freemasonry directly contradict the Gospel of Jesus Christ. With rare access to inner rituals and oaths, Shaw exposes the theological compromises and Babylonian esotericism embedded in high-level Masonic rites.",
    category: "suppressed-books",
    ipfsLink:
      "https://bafybeia4x3lm56n4qranmmktska34uhqceunlu7f5id6sda5o4aa3wbntu.ipfs.w3s.link/The-Deadly-Deception%20(freemasonry).pdf",
    filename: "The-Deadly-Deception (freemasonry).pdf",
    tags: ["freemasonry", "secret-societies", "occult-symbolism", "testimony"],
  },
  {
    id: 25,
    title: "Who Reformers Deemed the Antichrist – With American Quotes on the Jesuits",
    description:
      "This compelling collection of quotes traces the bold and unfiltered views of the Protestant reformers—Martin Luther, William Tyndale, John Wesley, and others—who identified the Antichrist not as a future figure, but as a present spiritual power in their time. It also includes rarely cited warnings from American thinkers and politicians about the historical and covert influence of the Jesuits.",
    category: "prophecy",
    ipfsLink:
      "https://bafybeigwl36lgmar7srveufouhvjibyvuevu44slxiocsizmkj32t253v4.ipfs.w3s.link/Reformers%20view%20on%20antichrist%20and%20quotes%20on%20the%20Jesuits.pdf",
    filename: "Reformers view on antichrist and quotes on the Jesuits.pdf",
    tags: ["antichrist", "reformation", "prophecy-interpretation", "jesuits", "american-history"],
  },
  {
    id: 26,
    title: "Prophetic History Chart",
    description:
      "A beautifully illustrated, color-coded timeline of prophetic events from the books of Daniel and Revelation. This chart outlines key moments in Bible prophecy, from ancient empires to the Reformation, and traces their fulfillment through historical events. Designed for visual learners and students of biblical prophecy, it includes parallel interpretations from Protestant reformers and classic historicist perspectives.",
    category: "prophecy",
    ipfsLink:
      "https://bafybeiggtgzd6jhkvdqmyfyv43xtru7n4z4qc2lnpgkb7iysrfxq3whuju.ipfs.w3s.link/Prophetic-History-Chart-color.pdf",
    filename: "Prophetic-History-Chart-color.pdf",
    tags: ["daniel", "revelation", "prophecy-timeline", "historicism", "bible-study"],
  },
  {
    id: 27,
    title: "The Pope and Mussolini: The Secret History of Pius XI and the Rise of Fascism in Europe",
    description:
      "Pulitzer Prize-winning historian David I. Kertzer delves into the complex relationship between Pope Pius XI and Benito Mussolini in this groundbreaking work. Drawing from newly opened Vatican archives and Fascist records, Kertzer reveals how the Vatican and the Fascist regime collaborated to consolidate power in Italy. The book uncovers the mutual interests that led to the Lateran Accords of 1929, granting the Church significant privileges while legitimizing Mussolini's dictatorship. Kertzer also examines the Pope's growing disillusionment with Fascism, particularly concerning anti-Semitic laws, and his attempts to distance the Church from Mussolini's policies before his death in 1939.",
    category: "suppressed-books",
    ipfsLink:
      "https://bafybeieflnzvgzvwgjkchfzn7gctqr7al47wyujkilzjpujpehtvv2lati.ipfs.w3s.link/David%20I.%20Kertzer%20-%20The%20Pope%20and%20Mussolini_%20The%20Secret%20History%20of%20Pius%20XI%20and%20the%20Rise%20of%20Fascism%20in%20Europe%20(2014%2C%20Random%20House).pdf",
    filename:
      "David I. Kertzer - The Pope and Mussolini_ The Secret History of Pius XI and the Rise of Fascism in Europe (2014, Random House).pdf",
    tags: ["vatican", "fascism", "mussolini", "world-war-ii", "catholicism"],
  },
  {
    id: 28,
    title: "The Suppressed Truth About the Assassination of Abraham Lincoln",
    description:
      "Burke McCarty presents a controversial perspective on the assassination of President Abraham Lincoln, suggesting a broader conspiracy involving high-ranking officials and foreign influences. The book posits that Lincoln's death was not solely the act of John Wilkes Booth but part of a larger plot to undermine the Union and its leadership. McCarty's narrative challenges mainstream historical accounts, offering an alternative viewpoint that encourages readers to re-examine the events surrounding one of America's most pivotal moments.",
    category: "suppressed-books",
    ipfsLink:
      "https://bafybeih6fq76hjqrpweo4paqulykgjocm4srstfsahhzli6unhirzh4yia.ipfs.w3s.link/Suppressed%20truth%20about%20the%20assassination%20of%20Abraham%20Lincoln.pdf",
    filename: "Suppressed truth about the assassination of Abraham Lincoln.pdf",
    tags: ["lincoln", "assassination", "conspiracy", "american-history", "civil-war"],
  },
  {
    id: 29,
    title: "The Talmud Unmasked: The Secret Rabbinical Teachings Concerning Christians",
    description:
      "This rare and controversial 19th-century document—written by Russian Catholic priest Rev. I. B. Pranaitis—attempts to examine passages from the Talmud that allegedly speak critically of Christians and Jesus Christ. Published in 1892, the work sparked decades of theological and cultural debate, particularly within Eastern Orthodox and Catholic circles. While often cited in polemical discussions, The Talmud Unmasked has also been criticized for selective interpretation and lack of rabbinic authority. However, its historical relevance remains notable as a snapshot of interreligious tension during the Russian Empire's era of religious censorship.",
    category: "suppressed-books",
    ipfsLink:
      "https://bafybeibep6s2qwsj2l4dng2tvpmfcmje6xmenb4omkv7fi5wwozbkxhzxi.ipfs.w3s.link/The_Talimud_Unmasked-Rev_I_B_Prenaitis-1892-92pgs-REL.sml.pdf",
    filename: "The_Talimud_Unmasked-Rev_I_B_Prenaitis-1892-92pgs-REL.sml.pdf",
    tags: ["talmud", "judaism", "christianity", "religious-history", "russian-empire"],
  },
  {
    id: 30,
    title: "Vatican Assassins: Wounded in the House of My Friends",
    author: "Eric Jon Phelps",
    description:
      "Eric Jon Phelps' Vatican Assassins is a voluminous and highly detailed account alleging the far-reaching influence of the Jesuit Order in global politics, war, economics, and religious movements. Framed through a Protestant historical lens, this book connects the Jesuit Order to major world events—from the assassination of Abraham Lincoln to the shaping of geopolitical strategy across centuries. Rooted in hundreds of citations, declassified documents, and first-person testimonies, Phelps' work challenges readers to consider the role of religious power structures in shaping historical and present-day systems of control.",
    category: "suppressed-books",
    ipfsLink:
      "https://bafybeidzytuofuqfmswrdskexb7dkelzxpvi7dgobw5vt4s4nvjxwdc7fa.ipfs.w3s.link/Vatican_assassins_by_Eric_John_Phelps%202.pdf",
    filename: "Vatican_assassins_by_Eric_John_Phelps 2.pdf",
    tags: ["vatican", "jesuits", "conspiracy", "geopolitics", "church-history"],
    featured: "controversial",
    importance: "high",
    coverImageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5231-B56EgIP4eQzO5xoRSBazw6vljS4G4r.jpeg",
  },
  {
    id: 31,
    title: "America's Secret Establishment: An Introduction to the Order of Skull & Bones",
    author: "Antony C. Sutton",
    description:
      'In this landmark investigative work, economist and historian Antony C. Sutton reveals the hidden structure and influence of one of the most elusive and controversial secret societies in American history: Skull & Bones, the Yale-based fraternal order also known as "The Order." Originally published in the 1980s, the book outlines Sutton\'s thesis that this elite society has played a central role in shaping U.S. domestic and foreign policy, educational institutions, banking, intelligence, and global ideological movements. With meticulously researched evidence, Sutton connects the dots between Skull & Bones initiates and high-ranking figures in government, industry, and intelligence—suggesting that this inner circle operates less as a conspiracy and more as a self-reinforcing network of influence, deeply embedded in American power structures.',
    category: "suppressed-books",
    ipfsLink:
      "https://bafybeie6xk4w4e7k4q4inuiha4f36d453scltqshjog7f3hitjcntthlwu.ipfs.w3s.link/Antony%20Sutton%20-%20Americas%20Secret%20Establishment%20An%20Introduction%20to%20Skull%20and%20Bones.pdf",
    filename: "Antony Sutton - Americas Secret Establishment An Introduction to Skull and Bones.pdf",
    tags: ["skull-and-bones", "secret-societies", "yale", "american-politics", "power-elite"],
    featured: "newly-added",
    importance: "high",
    coverImageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5227-z9xJx3fVF2cVlWNk4y9ynrBLEnHAmU.jpeg",
  },
  {
    id: 32,
    title: "Foxe's Book of Martyrs",
    author: "John Foxe",
    description:
      "Originally published in 1563 during the English Reformation, Foxe's Book of Martyrs is one of the most influential accounts of Christian persecution in history. Written by English historian and preacher John Foxe, this work meticulously documents the suffering and execution of believers—from the early Church under Roman rule to the brutal Inquisitions and burnings at the stake during the reign of Queen Mary I of England (known as \"Bloody Mary\"). Far more than a chronicle of death, Foxe's work serves as a testimony to the unwavering conviction of those who gave their lives for their faith, often refusing to renounce their beliefs even under extreme torture or threat of execution. These accounts were not just historical; they were deeply spiritual and politically charged, offering Protestant readers of the time a narrative of courage and divine purpose in the face of tyranny.",
    category: "historical",
    ipfsLink:
      "https://bafybeiegu5fp3pb7qz65hxffvk5vltdizn23qdpktyf3avmenmbvkrymmm.ipfs.w3s.link/?filename=Foxes-Book-Of-Martyrs.pdf",
    filename: "Foxes-Book-Of-Martyrs.pdf",
    tags: ["martyrs", "persecution", "reformation", "protestant", "church-history"],
    featured: "essential",
    importance: "critical",
    coverImageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5226-8emiPAHAyyBmM3MGZc8ZPA7c97DsD5.jpeg",
  },
  {
    id: 33,
    title: "The Hidden Dangers of the Rainbow",
    author: "Constance Cumbey",
    description:
      "In this groundbreaking exposé, Constance Cumbey—a devout Christian lawyer—peels back the spiritual facade of the New Age Movement to reveal what she believes to be a deeply orchestrated effort to replace Judeo-Christian ethics with a unified global religion. With meticulous research, Cumbey connects the New Age philosophy to Eastern mysticism, Luciferian ideals, and even covert political movements. This book is not only a theological critique but also a cultural warning, arguing that the pursuit of utopia through New Age ideology masks a path toward authoritarianism and moral decay.",
    category: "suppressed-books",
    ipfsLink:
      "https://bafybeieszy36beruyxa2lnoap7vlk4xw46gsoaugzfponro5nvushaypxq.ipfs.w3s.link/the-hidden-dangers-of-the-rainbow-the-new-age-movement-and-our-coming-age-of-barbarism-Constance_Cumbey.pdf",
    filename:
      "the-hidden-dangers-of-the-rainbow-the-new-age-movement-and-our-coming-age-of-barbarism-Constance_Cumbey.pdf",
    tags: ["new-age", "christianity", "spiritual-warfare", "global-religion", "occultism"],
    featured: "newly-added",
    importance: "high",
    coverImageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5228-4Vhki2gtxRa8LDlNdEkZhJvfbCXMTV.jpeg",
  },
  {
    id: 34,
    title: "Fire in the Minds of Men: Origins of the Revolutionary Faith",
    description:
      "Authored by a former Librarian of Congress, this dense and deeply researched work explores how revolutionary ideas spread like wildfire through the modern world—not merely through politics and economics, but as a faith. Billington traces the intellectual roots of revolutions across Europe and Russia, arguing that 18th- and 19th-century thinkers fused spiritual yearning with secular rebellion, creating a new kind of ideological fervor. From Masonic lodges to literary salons, from Romantic poets to anarchist philosophers, this book paints a sweeping intellectual history of the flames that ignited the modern age.",
    category: "suppressed-books",
    ipfsLink:
      "https://bafybeibxjsiic3oiywd4qnwar7ghljcub7a3ky7pz2axvvcjjzu55uc2oq.ipfs.w3s.link/Fire%20in%20the%20Minds%20of%20Men.pdf",
    filename: "Fire in the Minds of Men.pdf",
    tags: ["revolution", "ideology", "masonic", "intellectual-history", "political-philosophy"],
  },
  {
    id: 35,
    title: "Bloodlines of the Illuminati",
    author: "Fritz Springmeier",
    description:
      "Often whispered about and rarely acknowledged in the mainstream, Springmeier's controversial volume attempts to document the powerful families he claims dominate global affairs from the shadows. With detailed genealogies and historical references, he outlines the alleged methods of control—including manipulation of finance, education, religion, and media—by an elite set of dynastic bloodlines. Whether viewed as a daring investigative report or provocative conspiracy literature, this book is part of a growing corpus challenging official narratives and pointing to a global aristocracy operating beyond public scrutiny.",
    category: "suppressed-books",
    ipfsLink:
      "https://bafybeifcvjtkf27m2belcevl5sofx3u4rnitohvnw3cudlb5ynuixqt36y.ipfs.w3s.link/Bloodlines%20of%20the%20Illuminati%20-%20By%20Fritz%20Springmeier.pdf",
    filename: "Bloodlines of the Illuminati - By Fritz Springmeier.pdf",
    tags: ["illuminati", "bloodlines", "elite-families", "global-control", "conspiracy"],
    featured: "newly-added",
    importance: "high",
    coverImageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5224-q40UKdGrLCeRV2r65dQdqEv3mqBr1W.jpeg",
  },
  {
    id: 36,
    title: "Babylon: Mother Church",
    description:
      "A concise yet sobering account detailing the brutal persecution of believers across centuries, this rare booklet exposes the deep historical suffering inflicted in the name of religious power. It presents testimonies of torture, martyrdom, and unwavering faith, shining light on the high cost many paid for spiritual freedom. A must-read for those seeking truth in overlooked history.",
    category: "historical",
    ipfsLink:
      "https://bafybeif372qgwgi63l7ndyut2dp24ybwk6x7u7nqxgkbockrl526tbzela.ipfs.w3s.link/Babylon-Mother-Church.pdf",
    filename: "Babylon-Mother-Church.pdf",
    tags: ["persecution", "martyrdom", "church-history", "religious-power", "babylon"],
  },
  {
    id: 37,
    title: "Jesuits, Freemasons & the Illuminati",
    description:
      "Explore the hidden threads of power that weave through centuries of religious and political history. This revealing book uncovers how the Jesuit order, Freemasonry, and the Illuminati influenced not just secret societies—but shaped governments, revolutions, and the flow of faith itself. With painstaking research and bold insight, the author traces the alliances, symbols, and prophetic implications behind the vaults of power. Prepare to confront truths too often excluded from conventional narratives.",
    category: "historical",
    ipfsLink: "https://amazingdiscoveries.org/ebook/jesuits-freemasons-and-the-illuminati/download",
    filename: "jesuits-freemasons-and-the-illuminati.pdf",
    tags: ["jesuits", "freemasonry", "illuminati", "secret-societies", "religious-history", "political-power"],
    featured: "newly-added",
    importance: "high",
  },
  {
    id: 38,
    title: "The Two Babylons",
    description:
      "An incisive historical study that traces many Christian traditions—especially within the Roman Catholic Church—back to the ancient mysteries of Babylon. With painstaking research, the author uncovers how pagan rites, festivals, and doctrines allegedly merged into mainstream religious practice. This book is a vital resource for anyone exploring typology, prophecy, or the hidden evolution of religious systems.",
    category: "suppressed-books",
    ipfsLink: "https://amazingdiscoveries.org/ebook/the-two-babylons/download",
    filename: "the-two-babylons.pdf",
    tags: ["babylon", "paganism", "catholicism", "religious-history", "prophecy", "typology"],
    featured: "newly-added",
    importance: "high",
  },
]

export const allDocumentsWithFallbacks: DocumentSource[] = allDocuments.map((d) => {
  const ipfsHash = getHash(d.ipfsLink)
  return {
    ...d,
    ipfsHash,
    githubUrl: `https://raw.githubusercontent.com/THookz/Immutable/main/submissions/${encodeURIComponent(d.filename)}`,
  }
})

export const featuredBooksWithFallbacks = allDocumentsWithFallbacks.filter((d) => d.featured)
