module.exports.config = {
  name: "fixspam-chuibot",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "Automatically ban users who curse or insult the bot.",
  commandCategory: "noprefix",
  usages: "ব্যবহারের নিয়ম: নো-প্রিফিক্স অটোমেটিক ইভেন্ট",
  cooldowns: 0,
  dependencies: {}
};

module.exports.handleEvent = async ({ event, api, Users }) => {
  const { threadID, messageID, body, senderID } = event;
  if (!body || senderID == api.getCurrentUserID()) return;

  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Dhaka").format("HH:mm:ss L");
  const userName = await Users.getNameUser(senderID);

  const out = msg => api.sendMessage(`───────────────\n» ${msg}\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);

  const badWords = [
    "bot mc", "Mc bot", "Chutiya bot", "Bsdk bot", "Bot teri maa ki chut", 
    "Jhatu bot", "ভোদার বট", "stupid bots", "চাপড়ি বট", "Bot lund", 
    "ullash mc", "Mc ullash", "Bsdk priyansh", "fuck bots", "ullash chutiya", 
    "ullash gandu", "useless bot", "বট চুদি", "crazy bots", "bc bot", 
    "Nikal bsdk bot", "bot khùng", "হেড়ার বট", "bot paylac rồi", "con bot lòn", 
    "cmm bot", "clap bot", "bot ncc", "bot oc", "bot óc", "bot óc chó", 
    "cc bot", "bot tiki", "lozz bottt", "lol bot", "loz bot", "lồn bot", 
    "boder bot", "bot lon", "bot cac", "bot nhu lon", "bot xodi", "bot sudi", 
    "Bot sida", "bot sida", "bot fake", "Bot code", "bot shoppee", "bad bots", "bot cau"
  ];

  const lowerBody = body.toLowerCase().trim();

  for (const word of badWords) {
    if (lowerBody === word.toLowerCase()) {
      const userData = (await Users.getData(senderID)).data || {};
      userData.banned = 1;
      userData.reason = word;
      userData.dateAdded = time;

      await Users.setData(senderID, { data: userData });
      global.data.userBanned.set(senderID, { reason: userData.reason, dateAdded: userData.dateAdded });

      return api.sendMessage(`───────────────\n» 🟢 **𝐁𝐎𝐓 𝐍𝐎𝐓𝐈𝐅𝐈𝐂𝐀𝐓𝐈𝐎𝐍**\n\n${userName}, You are stupid for cursing bots so bots automatically banned you from the system.\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, () => {
        const admins = global.config.ADMINBOT || [];
        for (const adminID of admins) {
          api.sendMessage(`───────────────\n» 🆘 **𝐒𝐈𝐍𝐍𝐄𝐑**: ${userName}\n🔰 **𝐔𝐈𝐃**: ${senderID}\n😥 **𝐖𝐎𝐑𝐃**: ${word}\n\n𝐁𝐚𝐧𝐧𝐞𝐝 𝐟𝐫𝐨𝐦 𝐭𝐡𝐞 𝐬𝐲𝐬𝐭𝐞𝐦.\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, adminID);
        }
      }, messageID);
    }
  }
};

module.exports.run = async ({ event, api }) => {
  const { threadID, messageID } = event;
  return api.sendMessage(`───────────────\n» ⚠️ This is an automatic **𝐍𝐨𝐩𝐫𝐞𝐟𝐢𝐱** event command.\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
};
