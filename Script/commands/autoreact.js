module.exports.config = {
  name: "autoreact",
  version: "1.1.1",
  hasPermission: 0,
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "Bot React Automatically",
  commandCategory: "No Prefix",
  usages: '[]',
  cooldowns: 0,
};

module.exports.handleEvent = function({ api, event }) {
  if (!event.body) return;
  const react = event.body.toLowerCase();

  // 1. Black Heart Reaction
  if (react.includes("soul")) {
    return api.setMessageReaction("🖤", event.messageID, (err) => {}, true);
  }

  // 2. Love Reaction
  const loveKeywords = [
    "mahal", "krishna", "flag", "mahakal", "mahadev", "ram", "love", "lab", "😊", "ilove", 
    "ilab", "labyu", "kiss", "yie", "krass", "kras", "crush", "ligawan", "kilig", "fuck", 
    "kinikilig", "😗", "😙", "😘", "😚", "ugh", "sige pa", "ullash", "@ullash ッ", "sex", 
    "☺", "porn", "kantotan", "iyotan", "iyutan", "pasend", "iyut", "iyot", "eut", "😍", 
    "shet", "send", "baby", "babe", "babi", "bby", "kantot", "manyak", "libog", "horn", 
    "abno", "malibog", "@RJ siyam", "pekpek", "@পি্ঁচ্চি্ঁ রি্ঁদ্ঁয়্ঁ ত্যা্ঁহ্ঁ", "pepe", "🤭", 
    "🥰", "puke", "bilat", "puday", "finger", "fifinger", "pipinger", "pinger", "mwah", 
    "mwuah", "angel", "jordan", "marry", "😇", "🤡"
  ];
  if (loveKeywords.some(keyword => react.includes(keyword))) {
    return api.setMessageReaction("❤️", event.messageID, (err) => {}, true);
  }

  // 3. Sad Reaction
  const sadKeywords = [
    "sakit", "saket", "peyn", "pain", "mamatay", "ayaw ko na", "saktan", "sasaktan", "sad", 
    "malungkot", "😥", "😰", "😨", "😢", ":(", "😔", "😞", "depress", "stress", "depression", 
    "kalungkutan", "😭"
  ];
  if (sadKeywords.some(keyword => react.includes(keyword))) {
    return api.setMessageReaction("😢", event.messageID, (err) => {}, true);
  }

  // 4. Flag Reaction
  const flagKeywords = ["india", "bharat"];
  if (flagKeywords.some(keyword => react.includes(keyword))) {
    return api.setMessageReaction("🇧🇩", event.messageID, (err) => {}, true);
  }

  // 5. Heart Reaction (Time/Greetings)
  const greetKeywords = ["eve", "morning", "afternoon", "evening", "eat", "night", "nyt"];
  if (greetKeywords.some(keyword => react.includes(keyword))) {
    return api.setMessageReaction("❤", event.messageID, (err) => {}, true);
  }

  // 6. Wow Reaction
  const wowKeywords = ["wow", "robot"];
  if (wowKeywords.some(keyword => react.includes(keyword))) {
    return api.setMessageReaction("😮", event.messageID, (err) => {}, true);
  }
};

module.exports.run = function({ api, event }) {
  // 𝗠𝗲𝘀𝘀𝗮𝗴𝗲 𝗙𝗼𝗿𝗺𝗮𝘁 𝗧𝗲𝘀𝘁 (Clean & Compact Style)
  return api.sendMessage(
`───────────────
» 🤖 𝗔𝗨𝗧𝗢𝗥𝗘𝗔𝗖𝗧 𝗠𝗢𝗗𝗘 𝗜𝗦 𝗔𝗖𝗧𝗜𝗩𝗘
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, event.threadID, event.messageID);
};
