const axios = require("axios");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
  name: "botinfo",
  version: "1.2.0",
  hasPermssion: 0,
  credits: "𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑",
  description: "🎯 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 & 𝐒𝐘𝐒𝐓𝐄𝐌 𝐔𝐏𝐓𝐈𝐌𝐄",
  commandCategory: "system",
  cooldowns: 1,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "moment-timezone": ""
  }
};

module.exports.run = async function({ api, event, Users, Threads }) {
  const { threadID, messageID } = event;

  try {
    // ঢাকা টাইমজোন সেটআপ
    const currentTime = moment.tz("Asia/Dhaka").format("🎒DD/MM/YYYY 『HH:mm:ss』");

    // নিখুঁত আপটাইম (রানিং টাইম) ক্যালকুলেশন
    const uptimeInSeconds = process.uptime();
    const days = Math.floor(uptimeInSeconds / (3600 * 24));
    const hours = Math.floor((uptimeInSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeInSeconds % 60);

    // ডাইনামিক ডেটা কালেকশন (বটের লাইভ স্ট্যাটাস দেখতে)
    const totalUsers = global.data ? global.data.allUserID.length : "Loading...";
    const totalThreads = global.data ? global.data.allThreadID.length : "Loading...";
    const ramUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    const botName = global.config ? global.config.BOTNAME : "𝐂𝐘𝐁𝐄𝐑-𝐁𝐎𝐓";
    const botPrefix = global.config ? global.config.PREFIX : "/";

    // মোটা ইংরেজি ফন্ট এবং প্রিমিয়াম ডিজাইনের ইন্টারফেস
    const infoMessage = `╭──────•◈•───────╮
  —͟͟͞͞ 𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️

☄️ 𝐁𝐎𝐓 𝐍𝐀𝐌𝐄: ${botName}
🌸 𝐏𝐑𝐄𝐅𝐈𝐗: ${botPrefix}
🥳 𝐔𝐏𝐓𝐈𝐌𝐄 𝐑𝐔𝐍𝐍𝐈𝐍𝐆 ⚡
🕧 ${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds

📊 𝐒𝐘𝐒𝐓𝐄𝐌 𝐒𝐓𝐀𝐓𝐒:
👥 Total Users: ${totalUsers}
🏘️ Total Groups: ${totalThreads}
📟 RAM Usage: ${ramUsage} MB

𝑫𝑨𝑻𝑬 𝑨𝑵𝑫 𝑻𝑰𝑴𝑬 ⏰
『 ${currentTime} 』

⚡ 𝐁𝐎𝐓 𝐈𝐒 𝐎𝐍𝐋𝐈𝐍𝐄...
👑 𝐂𝐑𝐄𝐀𝐓𝐎𝐑 :- 𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑
🌐 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 :- https://www.facebook.com/profile.php?id=61591371186179
╰──────•◈•──────╯`;

    // ব্যাকগ্রাউন্ড অ্যানিমেশন/ইমেজের সিকিউর কালেকশন 
    const imageUrls = [
      "https://i.postimg.cc/gSW285Z/giwa1.jpg",
      "https://i.imgur.com/QdgH08j.gif"
    ];
    const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];
    const cachePath = __dirname + "/cache/botinfo_premium.gif";

    // ইমেজ ডাউনলোডার মডিউল
    const response = await axios({
      url: randomImage,
      method: "GET",
      responseType: "stream"
    });

    // ক্যাশ ফোল্ডার না থাকলে স্বয়ংক্রিয়ভাবে তৈরি করে নেবে
    fs.ensureDirSync(__dirname + "/cache");
    const writer = fs.createWriteStream(cachePath);
    response.data.pipe(writer);

    writer.on("finish", () => {
      return api.sendMessage({
        body: infoMessage,
        attachment: fs.createReadStream(cachePath)
      }, threadID, () => {
        if (fs.existsSync(cachePath)) {
          fs.unlinkSync(cachePath); // ক্যাশ মেমোরি ক্লিয়ার রাখার জন্য ফাইল ডিলিট
        }
      }, messageID);
    });

    writer.on("error", (err) => {
      console.error(err);
      return api.sendMessage(infoMessage, threadID, messageID);
    });

  } catch (error) {
    console.error("Botinfo Error:", error);
    // কোনো কারণে ইমেজ সার্ভার ডাউন থাকলে শুধু ডিজাইন করা টেক্সট মেসেজটি চলে যাবে
    return api.sendMessage(infoMessage, threadID, messageID);
  }
};
