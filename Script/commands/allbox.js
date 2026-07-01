module.exports.config = {
  name: "allbox",
  version: "1.0.0",
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  hasPermssion: 2,
  description: "Ban, Unban, Del or Remove thread list the bot has joined in.",
  commandCategory: "Admin",
  usages: "ব্যবহারের নিয়ম: [পেজ নাম্বার / all]",
  cooldowns: 5
};

module.exports.handleReply = async function ({ api, event, Threads, handleReply }) {
  const { threadID, messageID, senderID, body } = event;
  if (parseInt(senderID) !== parseInt(handleReply.author)) return;

  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Dhaka").format("HH:mm:ss L");
  const arg = body.split(" ");
  const action = arg[0].toLowerCase();
  const index = parseInt(arg[1]) - 1;

  const idgr = handleReply.groupid[index];
  const groupName = handleReply.groupName[index];

  const out = msg => api.sendMessage(`───────────────\n» ${msg}\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);

  if (!idgr) return out("❌ 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐧𝐮𝐦𝐛𝐞𝐫 𝐬𝐞𝐥𝐞𝐜𝐭𝐞𝐝.");

  if (action === "ban") {
    const data = (await Threads.getData(idgr)).data || {};
    data.banned = 1;
    data.dateAdded = time;
    await Threads.setData(idgr, { data });
    global.data.threadBanned.set(idgr, { dateAdded: data.dateAdded });
    
    return api.sendMessage(`» 𝐍𝐨𝐭𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧 𝐟𝐫𝐨module 𝐎𝐰𝐧𝐞𝐫 «\n\n 𝐘𝐨𝐮𝐫 𝐠𝐫𝐨𝐮𝐩 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐛𝐚𝐧𝐧ext 𝐟𝐫𝐨𝐦 𝐮𝐬𝐢𝐧𝐠 𝐛𝐨𝐭.`, idgr, () => {
      out(`★★ 𝐁𝐚𝐧 𝐒𝐮𝐜𝐜𝐞𝐬𝐬 ★★\n\n🔷 𝐍𝐚𝐦𝐞: ${groupName}\n🔰 𝐓𝐈𝐃: ${idgr}`);
      api.unsendMessage(handleReply.messageID);
    });
  }

  if (action === "unban" || action === "ub") {
    const data = (await Threads.getData(idgr)).data || {};
    data.banned = 0;
    data.dateAdded = null;
    await Threads.setData(idgr, { data });
    global.data.threadBanned.delete(idgr);
    
    return api.sendMessage(`» 𝐍𝐨𝐭𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧 𝐟𝐫𝐨module 𝐎𝐰𝐧𝐞𝐫 «\n\n 𝐘𝐨𝐮r 𝐠𝐫𝐨𝐮𝐩 𝐡𝐚𝐬 𝐛𝐞𝐞𝐧 𝐮𝐧𝐛𝐚𝐧𝐧ext!`, idgr, () => {
      out(`★★ 𝐔𝐧𝐛𝐚𝐧 𝐒𝐮𝐜𝐜𝐞𝐬𝐬 ★★\n\n🔷 𝐍𝐚𝐦𝐞: ${groupName}\n🔰 𝐓𝐈𝐃: ${idgr}`);
      api.unsendMessage(handleReply.messageID);
    });
  }

  if (action === "del") {
    const data = (await Threads.getData(idgr)).data || {};
    await Threads.delData(idgr, { data });
    out(`★★ 𝐃𝐞𝐥 𝐒𝐮𝐜𝐜𝐞𝐬𝐬 ★★\n\n🔷 𝐍𝐚𝐦𝐞: ${groupName}\n🔰 𝐓𝐈𝐃: ${idgr}\n Successfully deleted the data!`);
    return api.unsendMessage(handleReply.messageID);
  }

  if (action === "out") {
    return api.sendMessage(`» 𝐍𝐨𝐭𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧 𝐟𝐫𝐨module 𝐎𝐰𝐧𝐞𝐫 «\n\n ★★ 𝐁𝐨𝐭 𝐢𝐬 𝐥𝐞𝐚𝐯𝐢𝐧𝐠 𝐭𝐡𝐢𝐬 𝐜𝐡𝐚𝐭 ★★`, idgr, () => {
      out(`★★ 𝐎𝐮𝐭 𝐒𝐮𝐜𝐜𝐞𝐬𝐬 ★★\n\n🔷 𝐍𝐚𝐦𝐞: ${groupName}\n🔰 𝐓𝐈𝐃: ${idgr}`);
      api.unsendMessage(handleReply.messageID, () => api.removeUserFromGroup(api.getCurrentUserID(), idgr));
    });
  }
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, senderID } = event;
  let threadList = [];
  let data = [];

  try {
    data = await api.getThreadList(100, null, ["INBOX"]);
  } catch (e) {
    console.log(e);
  }

  for (const thread of data) {
    if (thread.isGroup === true) {
      threadList.push({
        threadName: thread.name || "𝐍𝐨 𝐍𝐚𝐦𝐞 𝐆𝐫𝐨𝐮𝐩",
        threadID: thread.threadID,
        messageCount: thread.messageCount || 0
      });
    }
  }

  threadList.sort((a, b) => b.messageCount - a.messageCount);

  let page = parseInt(args[0]) || 1;
  if (page < 1) page = 1;
  
  let limit = args[0] === "all" ? threadList.length : 10;
  let numPage = Math.ceil(threadList.length / limit) || 1;
  if (page > numPage) page = numPage;

  let groupid = [];
  let groupName = [];
  let msg = "🎭 𝐃𝐒 𝐆𝐑𝐎𝐔𝐏 𝐋𝐈𝐒𝐓 🎭\n\n";

  for (let i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
    if (i >= threadList.length) break;
    let group = threadList[i];
    msg += `${i + 1}. ${group.threadName}\n🔰 𝐓𝐈𝐃: ${group.threadID}\n💌 𝐌𝐞𝐬𝐬𝐚𝐠𝐞 𝐂𝐨𝐮𝐧𝐭: ${group.messageCount}\n\n`;
    groupid.push(group.threadID);
    groupName.push(group.threadName);
  }

  msg += `── 𝐏𝐚𝐠𝐞 ${page}/${numPage} ──\nℹ️ 𝐓𝐲𝐩𝐞: ${global.config.PREFIX}allbox [𝐩𝐚𝐠𝐞/𝐚𝐥𝐥]\n\n🎭 𝐑𝐞𝐩𝐥𝐲 with [𝐛𝐚𝐧/𝐮𝐧𝐛𝐚𝐧/𝐝𝐞𝐥/𝐨𝐮𝐭] + [𝐬𝐞𝐫𝐢𝐚𝐥 𝐧𝐮𝐦𝐛𝐞𝐫]`;

  if (threadList.length === 0) {
    return api.sendMessage("───────────────\n» ❌ 𝐓𝐡𝐞𝐫𝐞 𝐢𝐬 𝐜𝐮𝐫𝐫𝐞𝐧𝐭𝐥𝐲 𝐧𝐨 𝐠𝐫𝐨𝐮𝐩 𝐚𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞.\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍", threadID, messageID);
  }

  api.sendMessage(msg, threadID, (e, info) => {
    global.client.handleReply.push({
      name: this.config.name,
      author: senderID,
      messageID: info.messageID,
      groupid,
      groupName,
      type: "reply"
    });
  }, messageID);
};
