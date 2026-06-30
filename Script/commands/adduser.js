module.exports.config = {
  name: "adduser",
  version: "2.4.5",
  hasPermssion: 0,
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "Add user to the group by link or id",
  commandCategory: "group",
  usages: "ব্যবহারের নিয়ম: [ইউজার আইডি / প্রোফাইল লিংক]",
  cooldowns: 5
};

async function getUID(url, api) {
  if (!url.includes("facebook.com") && !url.includes("fb.com")) {
    return [null, null, true];
  }
  try {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }
    const response = await api.httpGet(url);
    const matchId = response.match(/"userID":"(\d+)"/);
    const matchName = response.match(/"title":"(.*?)"/s);
    
    const id = matchId ? matchId[1] : null;
    const name = matchName ? matchName[1] : null;
    
    if (!id) return [null, null, true];
    return [id, name, false];
  } catch (err) {
    return [null, null, true];
  }
}

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const botID = api.getCurrentUserID();
  
  const out = msg => api.sendMessage(`───────────────\n» ${msg}\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
  
  let threadInfo = await api.getThreadInfo(threadID);
  let participantIDs = threadInfo.participantIDs.map(e => parseInt(e));
  let approvalMode = threadInfo.approvalMode;
  let adminIDs = threadInfo.adminIDs.map(e => parseInt(e.id));

  if (!args[0]) {
    return out("⚠️ Please enter 𝟭 𝗜𝗗 or 𝗟𝗶𝗻𝗸 profile user need to add.");
  }

  if (!isNaN(args[0])) {
    return adduser(args[0], undefined);
  } else {
    try {
      let [id, name, fail] = await getUID(args[0], api);
      if (fail || !id) {
        return out("❌ 𝗨𝘀𝗲𝗿 𝗜𝗗 𝗻𝗼𝘁 𝗳𝗼𝘂𝗻𝗱 or invalid link.");
      } else {
        await adduser(id, name || "𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝘂𝘀𝗲𝗿");
      }
    } catch (e) {
      return out(`❌ 𝗘𝗿𝗿𝗼𝗿: ${e.message}`);
    }
  }

  async function adduser(id, name) {
    id = parseInt(id);
    if (participantIDs.includes(id)) {
      return out(`ℹ️ ${name ? name : "𝗠𝗲𝗺𝗯𝗲𝗿"} is already in this group.`);
    } else {
      try {
        await api.addUserToGroup(id, threadID);
      } catch (err) {
        return out(`❌ 𝗖𝗮𝗻'𝘁 𝗮𝗱𝗱 ${name ? name : "𝘂𝘀𝗲𝗿"} to group.`);
      }
      if (approvalMode === true && !adminIDs.includes(parseInt(botID))) {
        return out(`🔔 Added ${name ? name : "𝗺𝗲𝗺𝗯𝗲𝗿"} to the pending approval list!`);
      } else {
        return out(`✅ 𝗦𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 𝗮𝗱𝗱𝗲𝗱 ${name ? name : "𝗺𝗲𝗺𝗯𝗲𝗿"} to group!`);
      }
    }
  }
};
