const fs = require("fs");
const axios = require("axios");

const threadPath = __dirname + "/cache/threads.json";
const pendingPath = __dirname + "/cache/pending.json";
const ADMIN_ID = "61591371186179";

module.exports.config = {
  name: "approve",
  version: "2.0.0",
  hasPermssion: 2,
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "Approve group chat activation premium system",
  commandCategory: "Admin",
  usages: "ব্যবহারের নিয়ম: approve [list/pending/del/help/ID]",
  cooldowns: 5
};

module.exports.onLoad = () => {
  const dirCache = __dirname + "/cache";
  if (!fs.existsSync(dirCache)) fs.mkdirSync(dirCache, { recursive: true });
  if (!fs.existsSync(threadPath)) fs.writeFileSync(threadPath, JSON.stringify([]));
  if (!fs.existsSync(pendingPath)) fs.writeFileSync(pendingPath, JSON.stringify([]));
};

module.exports.run = async ({ api, event, args, Threads }) => {
  const { threadID, messageID, senderID } = event;
  const out = msg => api.sendMessage(`───────────────\n» ${msg}\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);

  if (senderID !== ADMIN_ID) {
    return out("⚠️ এই কমান্ডটি শুধুমাত্র বটের প্রধান 𝐀𝐝𝐦𝐢𝐧 ব্যবহার করতে পারবেন।");
  }

  let approvedThreads = JSON.parse(fs.readFileSync(threadPath));
  let pendingThreads = JSON.parse(fs.readFileSync(pendingPath));
  let subCommand = args[0]?.toLowerCase();

  if (subCommand === "list" || subCommand === "l") {
    if (approvedThreads.length === 0) return out("💡 𝐁𝐎𝐓 𝐒𝐓𝐀𝐓𝐔𝐒: বর্তমানে কোনো গ্রুপ অনুমোদিত নেই।");
    let msg = "✨ 𝐀𝐏𝐏𝐑𝐎𝐕𝐄𝐃 𝐆𝐑𝐎𝐔𝐏𝐒\n";
    for (let i = 0; i < approvedThreads.length; i++) {
      let name = (await Threads.getData(approvedThreads[i]))?.threadInfo?.threadName || "গোপন গ্রুপ";
      msg += `» ${i + 1}. ${name} (𝐈𝐃: ${approvedThreads[i]})\n`;
    }
    msg += `» মোট অনুমোদিত গ্রুপ: ${approvedThreads.length}`;
    return out(msg.trim());
  }

  if (subCommand === "pending" || subCommand === "p") {
    if (pendingThreads.length === 0) return out("💡 𝐏𝐄𝐍𝐃𝐈𝐍𝐆 𝐒𝐓𝐀𝐓𝐔𝐒: বর্তমানে কোনো গ্রুপ পেন্ডিং তালিকায় নেই।");
    let msg = "⏳ 𝐏𝐄𝐍𝐃𝐈𝐍𝐆 𝐋𝐈𝐒𝐓\n";
    for (let i = 0; i < pendingThreads.length; i++) {
      let name = (await Threads.getData(pendingThreads[i]))?.threadInfo?.threadName || "অজানা গ্রুপ";
      msg += `» ${i + 1}. ${name} (𝐈𝐃: ${pendingThreads[i]})\n`;
    }
    msg += `» অনুমোদন করতে টাইপ করুন: ${global.config.PREFIX}approve [আইডি]`;
    return out(msg.trim());
  }

  if (subCommand === "del" || subCommand === "d") {
    let targetID = args[1] || threadID;
    if (!approvedThreads.includes(targetID)) return out("⚠️ এই 𝐈context-টি অনুমোদিত তালিকায় নেই।");
    approvedThreads = approvedThreads.filter(id => id !== targetID);
    fs.writeFileSync(threadPath, JSON.stringify(approvedThreads));
    return out(`✅ সফলভাবে গ্রুপ 𝐈𝐃-টি (${targetID}) রিমুভ করা হয়েছে।`);
  }

  if (subCommand === "help" || subCommand === "h") {
    let helpMsg = "💼 𝐀𝐏𝐏𝐑𝐎𝐕𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒\n" +
                  "• approve l/list ➜ অনুমোদিত লিস্ট\n" +
                  "• approve p/pending ➜ পেন্ডিং লিস্ট\n" +
                  "• approve d/del [ID] ➜ গ্রুপ রিমুভ\n" +
                  "• approve [ID] ➜ নতুন গ্রুপ অনুমোদন";
    return out(helpMsg);
  }

  let targetThreadID = args[0] || threadID;
  if (approvedThreads.includes(targetThreadID)) {
    return out("ℹ️ এই গ্রুপটি ইতিপূর্বেই অনুমোদন করা হয়েছে।");
  }

  approvedThreads.push(targetThreadID);
  pendingThreads = pendingThreads.filter(id => id !== targetThreadID);
  fs.writeFileSync(threadPath, JSON.stringify(approvedThreads));
  fs.writeFileSync(pendingPath, JSON.stringify(pendingThreads));

  out(`🎉 সফলভাবে গ্রুপটি অনুমোদন করা হয়েছে!\n🆔 আইডি: ${targetThreadID}`);

  let welcomeMsg = "🟢 𝐁𝐎𝐓 𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄𝐃 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋𝐘\n\n" +
                   "🕋 لَآ إِلَـٰهَ إِلَّا ٱللَّهُ مُحَمَّدٌ رَّسُولُ ٱللَّهِ\n\n" +
                   "আসসালামু আলাইকুম! অত্যন্ত আনন্দের সাথে জানাচ্ছি যে, আমাদের বটের মেইন অ্যাডমিন এই গ্রুপে বটের কার্যকারিতা অনুমোদন করেছেন। 🎉\n\n" +
                   "📌 গ্রুপের জরুরি নিয়মাবলী:\n" +
                   "১. গ্রুপে কোনো প্রকার স্প্যামিং করা যাবে না।\n" +
                   "২. কোনো ধরনের গালিগালাজ বা খারাপ আচরণ করা যাবে না।\n" +
                   "৩. বটকে উদ্দেশ্য করে কোনো ক্ষতি করার চেষ্টা করবেন না।\n\n" +
                   "সবাই নিয়ম মেনে চলুন এবং চমৎকার ফিচারগুলো উপভোগ করুন। ধন্যবাদ! ✨";

  try {
    let imgUrl = "https://anime.apibypriyansh.repl.co/img/";
    let welcomePath = __dirname + `/cache/welcome_${targetThreadID}.jpg`;
    
    let response = await axios.get(imgUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(welcomePath, Buffer.from(response.data, "utf-8"));

    api.sendMessage({
      body: `───────────────\n» ${welcomeMsg}\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`,
      attachment: fs.createReadStream(welcomePath)
    }, targetThreadID, () => fs.unlinkSync(welcomePath));
  } catch (error) {
    api.sendMessage(`───────────────\n» ${welcomeMsg}\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, targetThreadID);
  }
};
