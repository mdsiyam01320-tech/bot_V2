const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
  name: "ckbot",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "Get user, box, or admin information",
  commandCategory: "Media",
  usages: "ব্যবহারের নিয়ম: [user / user @ট্যাগ / box / admin]",
  cooldowns: 4
};

module.exports.run = async ({ api, event, args }) => {
  const pathImg = __dirname + "/cache/info_pic.png";
  const threadSetting = global.data.threadData.get(parseInt(event.threadID)) || {};
  const prefix = threadSetting.hasOwnProperty("PREFIX") ? threadSetting.PREFIX : global.config.PREFIX;

  if (args.length == 0) {
    const usageText = `───────────────\n`
      + `» ℹ️ 𝗬𝗼𝘂 𝗰𝗮𝗻 𝘂𝘀𝗲:\n\n`
      + `» 👤 ${prefix}${this.config.name} 𝘂𝘀𝗲𝗿\n`
      + `» 👥 ${prefix}${this.config.name} 𝘂𝘀𝗲𝗿 @[𝗧𝗮𝗴]\n`
      + `» 📦 ${prefix}${this.config.name} 𝗯𝗼𝘅\n`
      + `» ⚙️ ${prefix}${this.config.name} 𝗯𝗼𝘅 [𝘁𝗶𝗱]\n`
      + `» 👑 ${prefix}${this.config.name} 𝗮𝗱𝗺𝗶𝗻\n`
      + `───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`;
    return api.sendMessage(usageText, event.threadID, event.messageID);
  }

  if (args[0] == "box") {
    let targetTID = args[1] ? args[1] : event.threadID;
    try {
      let threadInfo = await api.getThreadInfo(targetTID);
      let gendernam = 0, gendernu = 0;
      
      for (let z in threadInfo.userInfo) {
        if (threadInfo.userInfo[z].gender == "MALE") gendernam++;
        else gendernu++;
      }
      
      let pd = threadInfo.approvalMode == false ? "𝗧𝘂𝗿𝗻 𝗼𝗳𝗳" : threadInfo.approvalMode == true ? "𝗧𝘂𝗿𝗻 𝗼𝗻" : "𝗡𝗦";
      let msgBody = `───────────────\n`
        + `» 📦 𝗚𝗿𝗼𝘂𝗽 𝗡𝗮𝗺𝗲: ${threadInfo.threadName}\n`
        + `» 🆔 𝗧𝗜𝗗: ${targetTID}\n`
        + `» 🔔 𝗔𝗽𝗽𝗿𝗼𝘃𝗲𝗱: ${pd}\n`
        + `» 🎈 𝗘𝗺𝗼𝗷𝗶: ${threadInfo.emoji || "👍"}\n`
        + `» 👥 𝗠𝗲𝗺𝗯𝗲𝗿𝘀: ${threadInfo.participantIDs.length}\n`
        + `» 👑 𝗔𝗱𝗺𝗶𝗻𝘀: ${threadInfo.adminIDs.length}\n`
        + `» 👦 𝗕𝗼𝘆𝘀: ${gendernam} | 👧 𝗚𝗶𝗿𝗹𝘀: ${gendernu}\n`
        + `» 💬 𝗧𝗼𝘁𝗮𝗹 𝗠𝘀𝗴𝘀: ${threadInfo.messageCount}\n`
        + `───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`;

      if (!threadInfo.imageSrc) {
        return api.sendMessage(msgBody, event.threadID, event.messageID);
      } else {
        const response = await axios.get(threadInfo.imageSrc, { responseType: "arraybuffer" });
        fs.writeFileSync(pathImg, Buffer.from(response.data, "utf-8"));
        return api.sendMessage({ body: msgBody, attachment: fs.createReadStream(pathImg) }, event.threadID, () => fs.unlinkSync(pathImg), event.messageID);
      }
    } catch (err) {
      return api.sendMessage(`───────────────\n» ❌ 𝗘𝗿𝗿𝗼𝗿: 𝗖𝗮𝗻𝗻𝗼𝘁 𝗳𝗲𝘁𝗰𝗵 𝗯𝗼𝘅 𝗶𝗻𝗳𝗼.\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, event.threadID, event.messageID);
    }
  }

  if (args[0] == "admin") {
    let adminID = global.config.ADMINBOT[0] || api.getCurrentUserID();
    try {
      let adminInfo = await api.getUserInfo(adminID);
      let name = adminInfo[adminID].name;
      let url = adminInfo[adminID].profileUrl;
      
      let msgBody = `───────────────\n`
        + `» 👑 𝗔𝗗𝗠𝗜𝗡 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢\n`
        + `» 👤 𝗡𝗮𝗺𝗲: ${name}\n`
        + `» 🔗 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: ${url}\n`
        + `» 💖 𝗧𝗵𝗮𝗻𝗸𝘀 𝗳𝗼𝗿 𝘂𝘀𝗶𝗻𝗴 𝗼𝘂𝗿 𝗯𝗼𝘁!\n`
        + `───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`;

      const imgUrl = `https://graph.facebook.com/${adminID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
      const response = await axios.get(imgUrl, { responseType: "arraybuffer" }).catch(() => null);
      
      if (response) {
        fs.writeFileSync(pathImg, Buffer.from(response.data, "utf-8"));
        return api.sendMessage({ body: msgBody, attachment: fs.createReadStream(pathImg) }, event.threadID, () => fs.unlinkSync(pathImg), event.messageID);
      } else {
        return api.sendMessage(msgBody, event.threadID, event.messageID);
      }
    } catch (err) {
      return api.sendMessage(`───────────────\n» ❌ 𝗘𝗿𝗿𝗼𝗿: 𝗖𝗮𝗻𝗻𝗼𝘁 𝗳𝗲𝘁𝗰𝗵 𝗮𝗱𝗺𝗶𝗻 𝗶𝗻𝗳𝗼.\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, event.threadID, event.messageID);
    }
  }

  if (args[0] == "user") {
    let id;
    if (event.type == "message_reply") {
      id = event.messageReply.senderID;
    } else if (Object.keys(event.mentions).length > 0) {
      id = Object.keys(event.mentions)[0];
    } else {
      id = args[1] ? args[1] : event.senderID;
    }

    try {
      let data = await api.getUserInfo(id);
      let url = data[id].profileUrl;
      let b = data[id].isFriend == false ? "𝗡𝗼" : data[id].isFriend == true ? "𝗬𝗲𝘀" : "𝗨𝗻𝗸𝗻𝗼𝘄𝗻";
      let sn = data[id].vanity || "𝗡𝗼 𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲";
      let name = data[id].name;
      let sex = data[id].gender;
      let gender = sex == 2 ? "𝗠𝗮𝗹𝗲" : sex == 1 ? "𝗙𝗲𝗺𝗮𝗹𝗲" : "𝗨𝗻𝗸𝗻𝗼𝘄𝗻";

      let msgBody = `───────────────\n`
        + `» 👤 𝗡𝗮𝗺𝗲: ${name}\n`
        + `» 🆔 𝗨𝗜宣𝗗: ${id}\n`
        + `» 🌐 𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲: ${sn}\n`
        + `» ⚧️ 𝗚𝗲𝗻𝗱𝗲𝗿: ${gender}\n`
        + `» 🔗 𝗣𝗿𝗼𝗳𝗶𝗹𝗲: ${url}\n`
        + `» 🤝 𝗕𝗼𝘁 𝗙𝗿𝗶𝗲𝗻𝗱: ${b}\n`
        + `───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`;

      const imgUrl = `https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
      const response = await axios.get(imgUrl, { responseType: "arraybuffer" }).catch(() => null);

      if (response) {
        fs.writeFileSync(pathImg, Buffer.from(response.data, "utf-8"));
        return api.sendMessage({ body: msgBody, attachment: fs.createReadStream(pathImg) }, event.threadID, () => fs.unlinkSync(pathImg), event.messageID);
      } else {
        return api.sendMessage(msgBody, event.threadID, event.messageID);
      }
    } catch (err) {
      return api.sendMessage(`───────────────\n» ❌ 𝗘𝗿𝗿𝗼𝗿: 𝗖𝗮𝗻𝗻𝗼𝘁 𝗳𝗲𝘁𝗰𝗵 𝘂𝘀𝗲𝗿 𝗶𝗻𝗳𝗼.\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, event.threadID, event.messageID);
    }
  }
};
