const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const { alldown } = require("shaon-videos-downloader");

module.exports = {
  config: {
    name: "autodl",
    version: "0.0.2",
    hasPermssion: 0,
    credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    description: "Auto video downloader from links.",
    commandCategory: "user",
    usages: "ব্যবহারের নিয়ম: চ্যাটে যেকোনো ভিডিওর লিঙ্ক দিন",
    cooldowns: 5,
  },

  run: async function ({ api, event }) {},

  handleEvent: async function ({ api, event }) {
    const content = event.body ? event.body : '';
    const body = content.toLowerCase();

    if (body.startsWith("https://")) {
      const out = msg => api.sendMessage(`───────────────\n» ${msg}\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, event.threadID, event.messageID);
      const cacheDir = path.resolve(__dirname, "cache");
      const filePath = path.resolve(cacheDir, `auto_${event.messageID}.mp4`);

      try {
        if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

        api.setMessageReaction("📥", event.messageID, () => {}, true);

        const data = await alldown(content);
        if (!data || !data.url) return;

        const videoRes = await axios.get(data.url, { responseType: "arraybuffer" });
        fs.writeFileSync(filePath, Buffer.from(videoRes.data, "utf-8"));

        api.setMessageReaction("✅", event.messageID, () => {}, true);

        return api.sendMessage({
          body: `───────────────\n» 🟢 **𝐀𝐔𝐓𝐎  𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑**\n\n🎬 𝐄𝐧𝐣𝐨𝐲 𝐭𝐡𝐞 𝐕𝐢𝐝𝐞𝐨 🎀`,
          attachment: fs.createReadStream(filePath)
        }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);

      } catch (error) {
        api.setMessageReaction("❌", event.messageID, () => {}, true);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    }
  }
};
