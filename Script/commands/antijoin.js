module.exports.config = {
    name: "antijoin",
    version: "1.1.0",
    credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    hasPermssion: 1,
    description: "Turn on/off anti-join for the group",
    usages: "antijoin [on/off]",
    commandCategory: "System",
    cooldowns: 3
};

module.exports.run = async ({ api, event, args, Threads }) => {
    const { threadID, messageID } = event;

    // Check if Bot is Admin or Not
    const info = await api.getThreadInfo(threadID);
    if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) {
        return api.sendMessage(`───────────────\n» ⚠️ 𝗕𝗼𝘁 𝗻𝗲𝗲𝗱𝘀 𝗴𝗿𝗼𝘂𝗽 𝗮𝗱𝗺𝗶𝗻 𝗽𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻 𝘁𝗼 𝘂𝘀𝗲 𝘁𝗵𝗶𝘀 𝗰𝗼𝗺𝗺𝗮𝗻𝗱.\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
    }

    const data = (await Threads.getData(threadID)).data || {};
    const input = args[0]?.toLowerCase();

    // Check Input Validations (on/off)
    if (input === "on") {
        data.newMember = true;
    } else if (input === "off") {
        data.newMember = false;
    } else {
        return api.sendMessage(`───────────────\n» ⚠️ 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗨𝘀𝗮𝗴𝗲!\n» 𝗣𝗹𝗲𝗮𝘀𝗲 𝘂𝘀𝗲: antijoin [on/off]\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
    }

    // Save Data to Database
    await Threads.setData(threadID, { data });
    global.data.threadData.set(parseInt(threadID), data);

    return api.sendMessage(`───────────────\n» ✅ 𝗦𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 𝘁𝘂𝗿𝗻𝗲𝗱 ${(data.newMember) ? "𝗢𝗡" : "𝗢𝗙𝗙"} 𝗔𝗻𝘁𝗶-𝗝𝗼𝗶𝗻 𝗳𝗼𝗿 𝘁𝗵𝗶𝘀 𝗴𝗿𝗼𝘂𝗽.\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
};
