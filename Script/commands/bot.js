const fs = require("fs-extra");

module.exports.config = {
  name: "Obot",
  version: "1.2.0",
  hasPermssion: 0,
  credits: "𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑",
  description: "Advanced Banglish & Bengali Auto-Response NoPrefix Bot",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 2,
};

module.exports.handleEvent = async function({ api, event, Users }) {
  const { threadID, messageID, body } = event;
  if (!body) return;

  const msgText = body.toLowerCase().trim();
  const name = await Users.getNameUser(event.senderID);

  // র্যান্ডম নো-প্রিফিক্স রেসপন্স লিস্ট (গ্রুপের ট্রেন্ডি কথাবার্তা)
  const randomReplies = [
    "বেশি bot Bot করলে leave নিবো কিন্তু😒😒",
    "শুনবো না😼 তুমি আমাকে প্রেম করাই দাও নাই🥺 পচা তুমি🥺",
    "আমি আবাল দের সাথে কথা বলি না, ok😒",
    "এতো ডেকো না, প্রেম এ পরে যাবো তো🙈",
    "Bolo Babu, তুমি কি আমাকে ভালোবাসো? 🙈💋",
    "বার বার ডাকলে মাথা গরম হয়ে যায় কিন্তু😑",
    "হ্যাঁ বলো😒, তোমার জন্য কি করতে পারি😐😑?",
    "এতো ডাকছিস কেন? গালি শুনবি নাকি? 🤬",
    "I love you janu🥰",
    "আরে Bolo আমার জান, কেমন আছো? 😚",
    "Bot না, জানু বল জানু 😘",
    "আমাকে ডাকলে, আমি কিন্তু কিস করে দিবো😘",
    "দূরে যা, তোর কোনো কাজ নাই, শুধু bot bot করিস 😉😋🤣",
    "বলো কি বলবা, সবার সামনে বলবা নাকি? 🤭🤏",
    "হা বলো, শুনছি আমি 😏",
    "༊━━🦋 নামাজি মানুষেরা সব থেকে বেশি সুন্দর হয়..!! 😇🥀\nকারণ অজুর পানির মত শ্রেষ্ঠ মেকআপ দুনিয়াতে নেই। আলহামদুলিল্লাহ-🥰",
    "আজকে প্রপোজ করে দেখো রাজি হইয়া যামু-😌🤗😇",
    "দিনশেষে পরের BOW সুন্দর-☹️🤧",
    "সুন্দর মাইয়া মানেই আমার বস সিয়াম এর বউ-😽🫶 আর বাকি গুলো আমার বেয়াইন-🙈🐸🤗",
    "এত অহংকার করে লাভ নেই-🌸 মৃত্যুটা নিশ্চিত শুধু সময়টা অ'নিশ্চিত-🖤🙂",
    "আই লাভ ইউ বলতে মন চাইলে আমার বস সিয়াম এর ইনবক্সে যাও- 🙊🥱"
  ];

  const rand = randomReplies[Math.floor(Math.random() * randomReplies.length)];

  // ১. নিশি / Miss You
  if (msgText === "নিশি" || msgText === "miss you" || msgText === "mis u") {
    return api.sendMessage("আমি তোমাকে রাইতে মিস খাই🥹🤖 খবরদার কেউ নজর দিবি না 🤬 এগুলো আমার বস সিয়ামের প্রপার্টি! নজর দিলে নুনু কেটে ফেলবো! 🥳 তৃষা, মিম, নিশি, মুনতাহা এগুলা সব আমার বস সিয়ামের! 😏", threadID, messageID);
  }

  // ২. ইমোজি রেসপন্স
  if (msgText === "😘" || msgText === "😽" || msgText === "💋" || msgText === "🫦") {
    return api.sendMessage("কিরে হালা লুচ্চা! এগুলো কি ইমুজি দেস? 🙄\n\n[𝗢𝗪𝗡𝗘𝗥 ➜ 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 ", threadID, messageID);
  }

  // ৩. হেল্প মেনু
  if (msgText === "help" || msgText === "হেল্প") {
    return api.sendMessage("💡 মেইন হেল্প মেনু দেখতে টাইপ করুন: /help অথবা helpall অথবা help2", threadID, messageID);
  }

  // ৪. সিমসিমী
  if (msgText === "sim" || msgText === "simsimi" || msgText === "সিম") {
    return api.sendMessage("বটের সিমসিমী কমান্ড এভেইলবল নাই, চ্যাট করতে টাই করুন: baby [text]", threadID, messageID);
  }

  // ৫. গালিগালাজ হ্যান্ডলিং (BC/MC)
  if (msgText === "চুদি" || msgText === "বাল" || msgText === "খানকি" || msgText === "মাদারচোদ") {
    return api.sendMessage("SAME TO YOU BRO! 😊 নিজের বংশের পরিচয় গ্রুপে না দিলেও চলবে। 🐸", threadID, messageID);
  }

  // ৬. গুড মর্নিং
  if (msgText === "morning" || msgText === "good morning" || msgText === "গুড মর্নিং") {
    return api.sendMessage("GOOD MORNING! ☀️ আগে ভালোমত দাঁত ব্রাশ করে কিছু খেয়ে নাও সোনা পাখি। 😚", threadID, messageID);
  }

  // ৭. বাল / Bal
  if (msgText === "বাল" || msgText === "bal") {
    return api.sendMessage("~ মাথায় চুল নাই, মুখে বড় বড় কথা! বাল ছেঁড়ার মুরোদ নাই আবার আসছে বাল বলতে! 🤖🌶️", threadID, messageID);
  }

  // ৮. ওনার / সিইও (Owner / CEO)
  if (msgText === "owner" || msgText === "সিয়াম" || msgText === "ওনার") {
    return api.sendMessage("👑 𝐁𝐎𝐓 𝐂𝐑𝐄𝐀𝐓𝐎𝐑 / 𝐎𝐖𝐍𝐄𝐑:\n\n☞ 𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑 ッ\nYou can call him Siyam.\n\n🌐 Facebook ID: https://www.facebook.com/profile.php?id=61591371186179\n💬 WhatsApp: +8801789138157", threadID, messageID);
  }

  // ৯. এডমিন / বস কে?
  if (msgText === "তোমার বস কে" || msgText === "admin" || msgText === "boter admin" || msgText === "এডমিন") {
    return api.sendMessage("My Creator is 𝐒𝐢𝐲𝐚𝐦 𝐇𝐚𝐬𝐚𝐧 (Ullash) ❤️ হাই! আমি একটি মেসেঞ্জার বট। আমার বস সিয়াম আমাকে বানিয়েছেন আপনাদের বিনোদন দেওয়ার জন্য। সবাই বসের জন্য দোয়া করবেন! 🫶🥰", threadID, messageID);
  }

  // ১০. সালাম (Assalamu Alaikum)
  if (msgText === "আসসালামু আলাইকুম" || msgText === "assalamu alaikum" || msgText === "salam" || msgText === "সালাম") {
    return api.sendMessage("ওয়ালাইকুমুস-সালাম ওয়া রাহমাতুল্লাহ! 🖤 বস সিয়ামের পক্ষ থেকে আপনাকে গ্রুপে জানাই অনেক শুভেচ্ছা ও স্বাগতম। 🥰", threadID, messageID);
  }

  // ১১. থ্যাংকস / ধন্যবাদ
  if (msgText === "tnx" || msgText === "ধন্যবাদ" || msgText === "thank you" || msgText === "thanks") {
    return api.sendMessage("এতো ধন্যবাদ না দিয়ে পারলে একটা সুন্দর দেখে গার্লফ্রেন্ড বা বয়ফ্রেন্ড গিফট করে দাও না ভাই! 🌚🌶️", threadID, messageID);
  }

  // ১২. রাগ প্রকাশ (😠/🤬)
  if (msgText === "😠" || msgText === "🤬" || msgText === "😾" || msgText === "রাগ") {
    return api.sendMessage("রাগ করো না সোনা পাখি! এতো রাগ শরীরের জন্য ভালো না, প্রেসার বেড়ে যাবে। 🥰🍿", threadID, messageID);
  }

  // ১৩. হুম (Hum)
  if (msgText === "হুম" || msgText === "hum" || msgText === "hm") {
    return api.sendMessage("হুম হুম না করে সোজা চিপায় আসো জানু! 🤬⛏️", threadID, messageID);
  }

  // ১৪. নাম জিজ্ঞাসা
  if (msgText === "তোমার নাম কি" || msgText === "name" || msgText === "tor nam ki" || msgText === "নাম কি") {
    return api.sendMessage("My Name is 𝐒𝐢𝐲𝐚𝐦 𝐇𝐚𝐬𝐚𝐧 𝐂𝐡𝐚𝐭 𝐁𝐨𝐭! 🤖 আপনাদের সেবায় নিয়োজিত।", threadID, messageID);
  }

  // ১৫. সিঙ্গেলদের কষ্ট (কেউ ভালোবাসে না)
  if (msgText === "amake kew valobashe na" || msgText === "কেউ ভালোবাসে না" || msgText === "আমি সিঙ্গেল") {
    return api.sendMessage("চিন্তা করো কেন কলিজা? আমি তো আছি! 🫶 রাতে ইনবক্সে এসো, ভরপুর ভালোবাসা দিবো। 🥵💦", threadID, messageID);
  }

  // ১৬. জিএফ / বিএফ (GF / BF)
  if (msgText === "gf" || msgText === "bf" || msgText === "গার্লফ্রেন্ড" || msgText === "বয়ফ্রেন্ড") {
    return api.sendMessage("খালি কি তোরাই প্রেম করবি? আমাদের মতো সিঙ্গেল বটদের দিকে একটু তাকা! পারলে আমারে একটা সেট করায় দে! 🥺💔", threadID, messageID);
  }

  // ১৭. হাসাহাসি (Haha / 🤣)
  if (msgText === "😂" || msgText === "🤣" || msgText === "haha" || msgText === "হাসি") {
    return api.sendMessage("ভাই তুই এত হাসিস না! হাসলে তোরে একদম পকেটমারের মতো লাগে! 🌚🤣", threadID, messageID);
  }

  // ১৮. কেমন আছো (How are you)
  if (msgText === "কেমন আছো" || msgText === "কেমন আছেন" || msgText === "kmon acho" || msgText === "how are you") {
    return api.sendMessage("আমি তখনই ভালো থাকি যখন চ্যাটলিস্টে আপনাদের মতো সুন্দর মানুষদের হাসতে দেখি! 🤎☺️ আপনি কেমন আছেন?", threadID, messageID);
  }

  // ১৯. বাই / টাটা (Bye / Tata)
  if (msgText === "by" || msgText === "bye" || msgText === "বাই" || msgText === "টাটা" || msgText === "tata") {
    return api.sendMessage("কিরে হালা, চ্যাট গ্রুপ ফাঁকি দিয়ে এখন কোন মেয়ের সাথে পার্কের চিপায় ডেট করতে যাস?! 🌚🌶️🍆", threadID, messageID);
  }

  // ২০. খেয়েছো? (Khaiso?)
  if (msgText === "tumi khaiso" || msgText === "khaicho" || msgText === "খাইছো" || msgText === "খাইছেন") {
    return api.sendMessage("না সোনা পাখি, এখনো খাইনি। তুমি রান্না করে টেবিলে সাজিয়ে রাখো, আমি এসে এক সাথে খাবো। 😘", threadID, messageID);
  }

  // বটের নাম ধরে ডাকলে (যেমন: /bot বা /Bot বা শুধু bot)
  if (msgText.indexOf("/bot") === 0 || msgText === "bot" || msgText === "বট") {
    const msg = {
      body: `${name}, ${rand}`
    };
    return api.sendMessage(msg, threadID, messageID);
  }
};

module.exports.run = function({ api, event, client, __GLOBAL }) {};
