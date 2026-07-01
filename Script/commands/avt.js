module.exports.config = {
  name: "avt",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "Get avatar icon or image of users or groups.",
  commandCategory: "Tools",
  cooldowns: 0
};

module.exports.run = async function({ api, event, args, Threads }) {
  const fs = require("fs");
  const axios = require("axios");
  
  const threadSetting = (await Threads.getData(String(event.threadID))).data || {};
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  const mn = this.config.name;
  const cachePath = __dirname + "/cache/avt_img.png";

  const signature = "\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍";

  // মূল ব্যবহারের নির্দেশিকা (বাংলা গাইডলাইন)
  if (!args[0]) {
    const helpMsg = `───────────────
» 🖼️ **𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 𝗔𝗩𝗔𝗧𝗔𝗥 𝗧𝗢𝗢𝗟**

কিভাবে ব্যবহার করবেন তার গাইডলাইন:

» **${prefix}${mn} box** : **গ্রুপের প্রোফাইল পিকচার বা অ্যাভাটার ডাউনলোড করতে।**
» **${prefix}${mn} id [𝗨𝗜𝗗]** : **যেকোনো নির্দিষ্ট ইউজার আইডি (UID) এর প্রোফাইল পিকচার পেতে।**
» **${prefix}${mn} link [𝗟𝗶𝗻𝗸]** : **ফেসবুক প্রোফাইল লিংক থেকে আইডি'র ছবি পেতে।**
» **${prefix}${mn} user** : **আপনার নিজের প্রোফাইল পিকচার ডাউনলোড করতে।**
» **${prefix}${mn} user [@𝗺𝗲𝗻𝘁𝗶𝗼𝗻]** : **কাউকে ট্যাগ বা মেনশন করে তার প্রোফাইল পিকচার পেতে।**` + signature;
    return api.sendMessage(helpMsg, event.threadID, event.messageID);
  }

  const sendAttachment = async (url, successText) => {
    try {
      const response = await axios({ url, method: 'GET', responseType: 'stream' });
      const writer = fs.createWriteStream(cachePath);
      response.data.pipe(writer);
      writer.on('finish', () => {
        return api.sendMessage({
          body: `───────────────\n» 🖼️ **${successText}**` + signature,
          attachment: fs.createReadStream(cachePath)
        }, event.threadID, () => {
          if (fs.existsSync(cachePath)) fs.unlinkSync(cachePath);
        }, event.messageID);
      });
      writer.on('error', () => {
        return api.sendMessage(`───────────────\n» ❌ **𝗙𝗮𝗶𝗹𝗲𝗱 𝘁𝗼 𝗽𝗿𝗼𝗰𝗲𝘀𝘀 𝗶𝗺𝗮𝗴𝗲 𝘀𝘁𝗿𝗲𝗮𝗺.**` + signature, event.threadID, event.messageID);
      });
    } catch (err) {
      return api.sendMessage(`───────────────\n» ❌ **𝗘𝗿𝗿𝗼𝗿 𝗱𝗼𝘄𝗻𝗹𝗼𝗮𝗱𝗶𝗻𝗴 𝗮𝘃𝗮𝘁𝗮𝗿.**` + signature, event.threadID, event.messageID);
    }
  };

  if (args[0] == "box") {
    let targetThreadID = args[1] || event.threadID;
    try {
      let threadInfo = await api.getThreadInfo(targetThreadID);
      let imgUrl = threadInfo.imageSrc;
      if (!imgUrl) return api.sendMessage(`───────────────\n» ⚠️ **𝗧𝗵𝗶𝘀 𝗯𝗼𝘅 (${threadInfo.threadName}) 𝗵𝗮း 𝗻𝗼 𝗮𝘃𝗮𝘁𝗮𝗿.**` + signature, event.threadID, event.messageID);
      await sendAttachment(imgUrl, `𝗔𝘃𝗮𝘁𝗮𝗿 𝗼𝗳 𝗯𝗼𝘅: ${threadInfo.threadName}`);
    } catch (e) {
      return api.sendMessage(`───────────────\n» ❌ **𝗖𝗮𝗻𝗻𝗼𝘁 𝗴𝗲𝘁 𝗯𝗼𝘅 𝗶𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻.**` + signature, event.threadID, event.messageID);
    }
  } 
  else if (args[0] == "id") {
    let id = args[1];
    if (!id) return api.sendMessage(`───────────────\n» ⚠️ **𝗣𝗹𝗲𝗮𝘀𝗲 𝗲𝗻𝘁𝗲𝗿 𝗮 𝘃𝗮𝗹𝗶𝗱 𝗨𝗜𝗗.**` + signature, event.threadID, event.messageID);
    let url = `https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    await sendAttachment(url, `𝗔𝘃𝗮𝘁𝗮𝗿 𝗳𝗼𝗿 𝗨𝗜𝗗: ${id}`);
  } 
  else if (args[0] == "link") {
    let link = args[1];
    if (!link && event.messageReply) link = event.messageReply.body;
    if (!link) return api.sendMessage(`───────────────\n» ⚠️ **𝗣𝗹𝗲𝗮𝘀𝗲 𝗽𝗿𝗼𝘃𝗶𝗱𝗲 𝗮 𝗽𝗿𝗼𝗳𝗶𝗹𝗲 𝗹𝗶𝗻𝗸.**` + signature, event.threadID, event.messageID);
    try {
      const tool = require("fb-tools");
      let id = await tool.findUid(link);
      let url = `https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
      await sendAttachment(url, `𝗔𝘃𝗮𝘁𝗮𝗿 𝗳𝗼𝗿 𝗹𝗶𝗻𝗸𝗲𝗱 𝘂𝘀𝗲𝗿.`);
    } catch (e) {
      return api.sendMessage(`───────────────\n» ❌ **𝗨𝘀𝗲𝗿 𝗱𝗼𝗲𝘀 𝗻𝗼𝘁 𝗲𝘅𝗶𝘀𝘁 𝗼𝗿 𝗶𝗻𝘃𝗮𝗹𝗶𝗱 𝗹𝗶𝗻𝗸.**` + signature, event.threadID, event.messageID);
    }
  } 
  else if (args[0] == "user") {
    let id = event.senderID;
    if (Object.keys(event.mentions).length > 0) {
      id = Object.keys(event.mentions)[0];
    }
    let url = `https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    await sendAttachment(url, `𝗨𝘀𝗲𝗿 𝗮𝘃𝗮𝘁𝗮𝗿 𝘀𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 𝗹𝗼𝗮𝗱𝗲𝗱.`);
  } 
  else {
    return api.sendMessage(`───────────────\n» ⚠️ **𝗕𝗮𝗱 𝗰𝗼𝗺𝗺𝗮𝗻𝗱. 𝗨𝘀𝗲 ${prefix}${mn} 𝘁𝗼 𝘀𝗲𝗲 𝗴𝘂𝗶𝗱𝗲𝗹𝗶𝗻𝗲.**` + signature, event.threadID, event.messageID);
  }
};
