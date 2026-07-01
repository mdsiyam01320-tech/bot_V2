const axios = require("axios");
const path = require("path");
const fs = require("fs");

const API_CONFIG_URL = "https://raw.githubusercontent.com/cyber-ullash/cyber-ullash/refs/heads/main/UllashApi.json";

const getApiUrl = async () => {
  try {
    const response = await axios.get(API_CONFIG_URL);
    const albumUrl = response.data.album;
    if (!albumUrl) throw new Error();
    return albumUrl;
  } catch (error) {
    throw new Error();
  }
};

module.exports.config = {
  name: "album",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "Manage and view video/photo albums",
  usePrefix: true,
  prefix: true,
  category: "Media",
  commandCategory: "Media",
  usages: "ব্যবহারের নিয়ম: খালি রাখুন তালিকা দেখতে, অথবা album [ক্যাটাগরি] মিডিয়া দেখতে।",
  cooldowns: 5
};

const captions = {
  funny: "🤣 > 𝐍𝐚𝐰 𝐁𝐚𝐛𝐲 𝐅𝐮𝐧𝐧𝐲 𝐯𝐢𝐝𝐞𝐨",
  islamic: "😇 > 𝐍𝐚𝐰 𝐁𝐚𝐛𝐲 𝐈𝐬𝐥𝐚𝐦𝐢𝐜 𝐯𝐢𝐝𝐞𝐨",
  sad: "🥺 > 𝐍𝐚𝐰 𝐁𝐚𝐛𝐲 𝐒𝐚𝐝 𝐯𝐢𝐝𝐞𝐨",
  anime: "😘 > 𝐍𝐚𝐰 𝐁𝐚𝐛𝐲 𝐀𝐧𝐢𝐦𝐞 𝐯𝐢𝐝𝐞𝐨",
  cartoon: "😇 > 𝐍𝐚𝐰 𝐁𝐚𝐛𝐲 𝐂𝐚𝐫𝐭𝐨𝐨𝐧 𝐯𝐢𝐝𝐞𝐨",
  love: "😇 > 𝐍𝐚𝐰 𝐁𝐚𝐛𝐲 𝐋𝐨𝐯𝐞 𝐯𝐢𝐝𝐞𝐨",
  horny: "🥵 > 𝐍𝐚𝐰 𝐁𝐚𝐛𝐲 𝐇𝐨𝐫𝐧𝐲 𝐯𝐢𝐝𝐞𝐨",
  couple: "❤️ > 𝐍𝐚𝐰 𝐁𝐚𝐛𝐲 𝐂𝐨𝐮𝐩𝐥𝐞 𝐯𝐢𝐝𝐞𝐨",
  flower: "🌸 > 𝐍𝐚𝐰 𝐁𝐚𝐛𝐲 𝐅𝐥𝐨𝐰𝐞𝐫 𝐯𝐢𝐝𝐞𝐨",
  marvel: "🎯 > 𝐍𝐚𝐰 𝐁𝐚𝐛𝐲 𝐌𝐚𝐫𝐯𝐞𝐥 𝐯𝐢𝐝𝐞𝐨",
  aesthetic: "🎀 > 𝐍𝐚𝐰 𝐁𝐚𝐛𝐲 𝐀clean 𝐯𝐢𝐝𝐞𝐨",
  sigma: "🐤 > 𝐍𝐚𝐰 𝐁𝐚𝐛𝐲 𝐒𝐢𝐠𝐦𝐚 𝐯𝐢𝐝𝐞𝐨",
  lyrics: "🥰 > 𝐍𝐚𝐰 𝐁𝐚𝐛𝐲 𝐋𝐲𝐫𝐢𝐜𝐬 𝐯𝐢𝐝𝐞𝐨",
  cat: "🐱 > 𝐍𝐚𝐰 𝐁𝐚𝐛𝐲 𝐂𝐚𝐭 𝐯𝐢𝐝𝐞𝐨",
  "18plus": "🔞 > 𝐍𝐚𝐰 𝐁𝐚𝐛𝐲 𝟏𝟖+ 𝐯𝐢𝐝𝐞𝐨",
  freefire: "🎮 > 𝐍𝐚𝐰 𝐁𝐚𝐛𝐲 𝐅𝐫𝐞𝐞𝐟𝐢𝐫𝐞 𝐯𝐢𝐝𝐞𝐨",
  football: "⚽ > 𝐍𝐚𝐰 𝐁𝐚𝐛𝐲 𝐅𝐨𝐨𝐭𝐛𝐚𝐥𝐥 𝐯𝐢𝐝𝐞𝐨",
  girl: "👧 > 𝐍𝐚𝐰 𝐁𝐚𝐛𝐲 𝐆𝐢𝐫𝐥 𝐯𝐢𝐝𝐞𝐨",
  friend: "👫 > 𝐍𝐚𝐰 𝐁𝐚𝐛𝐲 𝐅𝐫𝐢𝐞𝐧𝐝𝐬 𝐯𝐢𝐝𝐞𝐨",
  cricket: "🏏 > 𝐍𝐚𝐰 𝐁𝐚𝐛𝐲 𝐂𝐫𝐢𝐜𝐤𝐞𝐭 𝐯𝐢𝐝𝐞𝐨"
};

async function handleMediaSend(api, threadID, messageID, selectedCategory) {
  try {
    const BASE_API_URL = await getApiUrl();
    const res = await axios.get(`${BASE_API_URL}/album?type=${selectedCategory}`);
    const mediaUrl = res.data.data;

    if (!mediaUrl) {
      return api.sendMessage("───────────────\n» ⚠️ 𝐍𝐨 𝐜𝐨𝐧𝐭𝐞𝐧𝐭 𝐟𝐨𝐮𝐧𝐝 𝐢𝐧 𝐭𝐡𝐢𝐬 𝐜𝐚𝐭𝐞𝐠𝐨𝐫𝐲.\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍", threadID, messageID);
    }

    const response = await axios({
      method: 'get',
      url: mediaUrl,
      responseType: 'stream'
    });

    const filename = path.basename(mediaUrl).split("?")[0];
    const dirCache = path.join(__dirname, "cache");
    if (!fs.existsSync(dirCache)) fs.mkdirSync(dirCache, { recursive: true });
    
    const filePath = path.join(dirCache, `${Date.now()}_${filename}`);
    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    writer.on('finish', () => {
      api.sendMessage({
        body: `───────────────\n» ${captions[selectedCategory] || `🎬 𝐍𝐨𝐰 𝐁𝐚𝐛𝐲 ${selectedCategory} 𝐜𝐨𝐧𝐭𝐞𝐧𝐭`}\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`,
        attachment: fs.createReadStream(filePath)
      }, threadID, () => fs.unlinkSync(filePath), messageID);
    });

    writer.on('error', () => {
      api.sendMessage("───────────────\n» ❌ 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐬𝐞𝐧𝐝 𝐯𝐢𝐝𝐞𝐨.\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍", threadID, messageID);
    });

  } catch (err) {
    return api.sendMessage("───────────────\n» ❌ 𝐒𝐨𝐦𝐞𝐭𝐡𝐢𝐧𝐠 𝐰𝐞𝐧𝐭 𝐰𝐫𝐨𝐧𝐠. 𝐓𝐫𝐲 𝐚𝐠𝐚𝐢𝐧!\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍", threadID, messageID);
  }
}

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, senderID } = event;

  const albumOptionsPage1 = ["funny", "islamic", "sad", "anime", "cartoon", "love", "horny", "couple", "flower", "marvel"];
  const albumOptionsPage2 = ["aesthetic", "sigma", "lyrics", "cat", "18plus", "freefire", "football", "girl", "friends", "cricket"];
  const validCategories = [...albumOptionsPage1, ...albumOptionsPage2, "baby", "lofi", "sex", "friend"];

  const toBold = (text) => text.replace(/[a-z]/g, (c) => String.fromCodePoint(0x1d41a + c.charCodeAt(0) - 97));
  const toBoldNumber = (num) => String(num).replace(/[0-9]/g, (c) => String.fromCodePoint(0x1d7ec + parseInt(c)));

  const formatOptions = (options, startIndex = 1) =>
    options.map((opt, i) => `✨ | ${toBoldNumber(i + startIndex)}. ${toBold(opt)}`).join("\n");

  if (args[0] === "2") {
    const message2 =
      "💫 𝐂𝐡𝐨𝐨𝐬𝐞 𝐚𝐧 𝐚𝐥𝐛𝐮𝐦 𝐜𝐚𝐭𝐞𝐠𝐨𝐫𝐲 𝐁𝐚𝐛𝐲 💫\n" +
      "✺━━━━━━━◈◉◈━━━━━━━✺\n" +
      formatOptions(albumOptionsPage2, 11) +
      "\n✺━━━━━━━◈◉◈━━━━━━━✺\n🎯 | 𝐏𝐚𝐠𝐞 [𝟐/𝟐]\n✺━━━━━━━◈◉◈━━━━━━━✺";

    await api.sendMessage({ body: message2 }, threadID, (error, info) => {
      if (!error) {
        global.client.handleReply.push({
          name: this.config.name,
          type: "reply",
          messageID: info.messageID,
          author: senderID,
          link: albumOptionsPage2,
        });
      }
    }, messageID);
    return;
  }

  if (!args[0] || args[0].toLowerCase() === "list") {
    api.setMessageReaction("☢️", messageID, () => {}, true);

    const message =
      "💫 𝐂𝐡𝐨𝐨𝐬𝐞 𝐚𝐧 𝐚𝐥𝐛𝐮𝐦 𝐜𝐚𝐭𝐞𝐠𝐨𝐫𝐲 𝐁𝐚𝐛𝐲 💫\n" +
      "✺━━━━━━━◈◉◈━━━━━━━✺\n" +
      formatOptions(albumOptionsPage1) +
      `\n✺━━━━━━━◈◉◈━━━━━━━✺\n🎯 | 𝐏𝐚𝐠𝐞 [𝟏/𝟐]\nℹ | 𝐓𝐲𝐩𝐞: ${global.config.PREFIX}album 2 - 𝐧𝐞𝐱𝐭 𝐩𝐚𝐠𝐞\n✺━━━━━━━◈◉◈━━━━━━━✺`;

    await api.sendMessage({ body: message }, threadID, (error, info) => {
      if (!error) {
        global.client.handleReply.push({
          name: this.config.name,
          type: "reply",
          messageID: info.messageID,
          author: senderID,
          link: albumOptionsPage1,
        });
      }
    }, messageID);
    return;
  }

  const command = args[0].toLowerCase();
  if (!validCategories.includes(command)) {
    return api.sendMessage("───────────────\n» ❌ 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐜𝐚𝐭𝐞𝐠𝐨𝐫𝐲! 𝐓𝐲𝐩𝐞 '/album' 𝐭𝐨 𝐬𝐞𝐞 𝐥𝐢𝐬𝐭.\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍", threadID, messageID);
  }

  let mappedCategory = command === "friends" ? "friend" : command;
  await handleMediaSend(api, threadID, messageID, mappedCategory);
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  api.unsendMessage(handleReply.messageID);

  const adminID = "61591371186179";
  const replyNum = parseInt(event.body);
  if (isNaN(replyNum)) {
    return api.sendMessage("───────────────\n» ❌ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐫𝐞𝐩𝐥𝐲 𝐰𝐢𝐭𝐡 𝐚 𝐯𝐚𝐥𝐢𝐝 𝐧𝐮𝐦𝐛𝐞𝐫.\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍", event.threadID, event.messageID);
  }

  const categories = ["funny", "islamic", "sad", "anime", "cartoon", "love", "horny", "couple", "flower", "marvel", "aesthetic", "sigma", "lyrics", "cat", "18plus", "freefire", "football", "girl", "friend", "cricket"];

  if (replyNum < 1 || replyNum > categories.length) {
    return api.sendMessage("───────────────\n» ❌ 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐬𝐞𝐥𝐞𝐜𝐭𝐢𝐨𝐧.\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍", event.threadID, event.messageID);
  }

  const selectedCategory = categories[replyNum - 1];

  if ((selectedCategory === "horny" || selectedCategory === "18plus") && event.senderID !== adminID) {
    return api.sendMessage("───────────────\n» 🚫 𝐘𝐨𝐮 𝐚𝐫𝐞 𝐧𝐨𝐭 𝐚𝐮𝐭𝐡𝐨𝐫𝐢𝐳𝐞𝐝 𝐟𝐨𝐫 𝐭𝐡𝐢𝐬 𝐜𝐚𝐭𝐞𝐠𝐨𝐫𝐲.\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍", event.threadID, event.messageID);
  }

  await handleMediaSend(api, event.threadID, event.messageID, selectedCategory);
};
