module.exports.config = {
  name: "setallbox",
  version: "1.0.9",
  hasPermssion: 1,
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "Change something of group",
  commandCategory: "box",
  usages: "ব্যবহারের নিয়ম: setallbox [emoji/avt/Bname/name/QTV/rcolor/poll] [তথ্য]",
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": ""
  }
};

module.exports.run = async function({ api, event, args, Threads }) {
  const request = require("request");
  const fs = require("fs-extra");
  const { threadID, messageID, senderID, mentions, type, messageReply } = event;

  const out = msg => api.sendMessage(`───────────────\n» ${msg}\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);

  if (args[0] === "emoji") {
    if (!args[1]) {
      const emojiList = ["😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇","🙂","🙃","😉","😌","😍","🥰","😘","😗","😙","😚","😋","😛","😝","😜","🤪","🤨","🧐","🤓","😎","🤩","🥳","😏","😒","😞","😔","😟","😕","🙁","☹️","😣","😖","😫","😩","🥺","😢","😭","😤","😠","😡","🤬","🤯","😳","🥵","🥶","😱","😨","😰","😥","😓","🤗","🤔","🤭","🤫","🤥","😶","😐","😑","😬","🙄","😯","😦","😧","😮","😲","🥱","😴","🤤","😪","😵","🤐","🥴","🤢","🤮","🤧","😷","🤒","🤕","🤠","🤑","😈","👿","👹","💀","👺","👻","🤡","💩","☠️","👽","👾","🤖","🎃","😺","😸","😹","😻","😼","😽","🙀","😿","😾","👍","👎","👊","✊","✌️","🤘","👌","🤙","💪","🙏","❤️","🧡","💛","💚","💙","💜","🖤","🤍","💔","❣️","💕","💞","💓","💗","💖","💘","💝","💟","💥","🔥","🌪️","🌈","☀️","🌤️","⛅","🌥️","☁️"];
      const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
      return api.changeThreadEmoji(randomEmoji, threadID);
    } else {
      try {
        return api.changeThreadEmoji(args[1], threadID);
      } catch (e) {
        return out(`❌ 𝐄𝐫𝐫𝐨𝐫: ${e.message}`);
      }
    }
  }

  if (args[0] === "Bname") {
    const name = args.slice(1).join(" ");
    if (!name) return out("⚠️ Please enter a group name.");
    return api.setTitle(name, threadID);
  }

  if (args[0] === "rcolor") {
    const colors = ['196241301102133','169463077092846','2442142322678320', '234137870477637', '980963458735625','175615189761153','2136751179887052', '2058653964378557','2129984390566328','174636906462322','1928399724138152','417639218648241','930060997172551','164535220883264','370940413392601','205488546921017','809305022860427'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return api.changeThreadColor(randomColor, threadID, (err) => {
      if (err) return out("❌ Failed to change theme color.");
    });
  }

  if (args[0] === "name") {
    const name = args.slice(1).join(" ");
    const mentionID = Object.keys(mentions)[0];
    if (!mentionID) return api.changeNickname(name, threadID, senderID);
    const cleanName = name.replace(mentions[mentionID], "").trim();
    return api.changeNickname(cleanName, threadID, mentionID);
  }

  if (args[0] === "avt") {
    if (type !== "message_reply") return out("⚠️ Please reply to 𝟭 photo to set group image.");
    if (!messageReply.attachments[0] || messageReply.attachments[0].type !== "photo") return out("❌ Reply must be a valid photo.");
    
    const dirCache = __dirname + `/cache`;
    if (!fs.existsSync(dirCache)) fs.mkdirSync(dirCache, { recursive: true });
    
    const imgPath = `${dirCache}/picture.png`;
    return request(messageReply.attachments[0].url)
      .pipe(fs.createWriteStream(imgPath))
      .on("close", () => {
        api.changeGroupImage(fs.createReadStream(imgPath), threadID, () => fs.unlinkSync(imgPath));
      });
  }

  if (args[0] === "poll") {
    const content = args.slice(1).join(" ");
    if (!content.includes(" => ")) return out("⚠️ Format: [ 𝐓𝐢𝐭𝐥𝐞 => 𝐎𝐩𝐭𝐢𝐨𝐧 𝟭 | 𝐎𝐩𝐭𝐢𝐨𝐧 𝟐 ]");
    const title = content.slice(0, content.indexOf(" => "));
    const optionsText = content.substring(content.indexOf(" => ") + 4);
    const optionsArray = optionsText.split(" | ");
    const pollObject = {};
    
    for (let i = 0; i < optionsArray.length; i++) {
      if (optionsArray[i].trim()) pollObject[optionsArray[i].trim()] = false;
    }
    
    return api.createPoll(title, threadID, pollObject, (err) => {
      if (err) return out("❌ Failed to create poll. Check format.");
    });
  }

  if (args[0] === "QTV") {
    try {
      const threadAdmins = await Threads.getInfo(threadID);
      const isAdminSender = threadAdmins.adminIDs.some(el => el.id == senderID);
      if (!isAdminSender) return out("🚫 You are not an administrator of this group.");

      let targetID = Object.keys(mentions)[0];
      if (!targetID) {
        targetID = (type === "message_reply") ? messageReply.senderID : args[1];
      }

      if (!targetID) return out("⚠️ Please mention, reply or provide UID of the user.");

      const isTargetAdmin = threadAdmins.adminIDs.some(el => el.id == targetID);
      return api.changeAdminStatus(threadID, targetID, !isTargetAdmin);
    } catch (e) {
      return out("❌ An error occurred while modifying admin status.");
    }
  }
};
