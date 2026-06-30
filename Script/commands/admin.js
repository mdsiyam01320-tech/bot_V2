const axios = require("axios");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
  name: "admin",
  version: "1.1.5",
  hasPermssion: 0,
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "Show Owner Info",
  commandCategory: "info",
  usages: "ব্যবহারের নিয়ম: [admin]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
  const pathVideo = __dirname + "/cache/owner_video.mp4";

  const time = moment().tz("Asia/Dhaka").format("h:mm:ss A");
  const date = moment().tz("Asia/Dhaka").format("MMMM Do YYYY");

  const threadSetting =
    global.data.threadData.get(parseInt(event.threadID)) || {};

  const prefix = threadSetting.hasOwnProperty("PREFIX")
    ? threadSetting.PREFIX
    : global.config.PREFIX;

  const botName = global.config.BOTNAME || "𝗕𝗢𝗧";
  const totalCommands = global.client.commands.size || 0;

  const uptimeSeconds = Math.floor(process.uptime());
  const days = Math.floor(uptimeSeconds / 86400);
  const hours = Math.floor((uptimeSeconds % 86400) / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = uptimeSeconds % 60;

  const uptimeString = `${days}𝗱 ${hours}𝗵 ${minutes}𝗺 ${seconds}𝘀`;

  const msgBody =
`───────────────
» 👑 𝗢𝗪𝗡𝗘𝗥: 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑
» 🤖 𝗕𝗢𝗧 𝗡𝗔𝗠𝗘: ${botName}
» 🎂 𝗔𝗚𝗘: 𝟭𝟴 𝟭𝟳+
» 🚻 𝗚𝗘𝗡𝗗𝗘𝗥: 𝗠𝗔𝗟𝗘
» ☪ 𝗥𝗘𝗟𝗜𝗚𝗜𝗢𝗡: 𝗜𝗦𝗟𝗔𝗠
───────────────
» 🏠 𝗔𝗗𝗗𝗥𝗘𝗦𝗦: 𝗞𝗜𝗦𝗛𝗢𝗥𝗘𝗚𝗔𝗡𝗝 → 𝗕𝗔𝗡𝗚𝗟𝗔𝗗𝗘𝗦𝗛
» 🏫 𝗦𝗖𝗛𝗢𝗢𝗟: 𝗠 𝗔 𝗠𝗔𝗡𝗡𝗔𝗡 𝗠𝗔𝗡𝗜𝗞 𝗛𝗜𝗚𝗛 𝗦𝗖𝗛𝗢𝗢𝗟
» 💔 𝗥𝗘𝗟𝗔𝗧𝗜𝗢𝗡𝗦𝗛𝗜𝗣: 𝗦𝗜𝗡𝗚𝗟𝗘
» 🛠 𝗪𝗢𝗥𝗞: 𝗡𝗢𝗧 𝗪𝗢𝗥𝗞𝗜𝗡𝗚
» 🕒 𝗧𝗜𝗠𝗘: ${time}
» 📅 𝗗𝗔𝗧𝗘: ${date}
───────────────
» 👑 𝗚𝗥𝗢𝗨𝗣: বলবো না 😁 সিয়াম বস কে প্রেম করাই দাও নাই 😴
» ⚙️ 𝗣𝗥𝗘𝗙𝗜𝗫: ${prefix}
» 💬 𝗛𝗘𝗟𝗣: ${prefix}help
» 📦 𝗖𝗢𝗠𝗠𝗔𝗡𝗗: ${totalCommands}
» ⏳ 𝗨𝗣𝗧𝗜𝗠𝗘: ${uptimeString}
───────────────
» 🌐 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞: https://www.facebook.com/profile.php?id=61591371186179
» 💬 𝗧𝗜𝗞𝗧𝗢𝗞: siyam0132525
» 📞 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣: +8801789138157
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`;

  try {
    const videoUrl = "https://files.catbox.moe/ktedny.mp4";

    const response = await axios.get(videoUrl, {
      responseType: "arraybuffer"
    });

    fs.writeFileSync(pathVideo, Buffer.from(response.data));

    return api.sendMessage(
      {
        body: msgBody,
        attachment: fs.createReadStream(pathVideo)
      },
      event.threadID,
      () => fs.unlinkSync(pathVideo),
      event.messageID
    );
  } catch (err) {
    return api.sendMessage(msgBody, event.threadID, event.messageID);
  }
};
