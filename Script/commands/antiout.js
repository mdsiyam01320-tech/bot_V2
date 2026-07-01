module.exports.config = {
    name: "antiout",
    version: "1.2.0",
    credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    hasPermssion: 1,
    description: "Turn on/off anti-out for the group safely",
    usages: "antiout [on/off]",
    commandCategory: "System",
    cooldowns: 3
};

module.exports.run = async ({ api, event, args, Threads }) => {
    const { threadID, messageID } = event;
    const input = args[0]?.toLowerCase();

    
    if (input !== "on" && input !== "off") {
        return api.sendMessage(`───────────────\n» ⚠️ 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗨𝘀𝗮𝗴𝗲!\n» 𝗣𝗹𝗲𝗮𝘀𝗲 𝘂𝘀𝗲: antiout [on/off]\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
    }

    try {
        const threadData = await Threads.getData(threadID);
        const data = threadData.data || {};

        
        data.antiout = (input === "on");

        await Threads.setData(threadID, { data });
        global.data.threadData.set(parseInt(threadID), data);

        return api.sendMessage(`───────────────\n» ✅ 𝗦𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 𝘁𝘂𝗿𝗻𝗲𝗱 ${input.toUpperCase()} 𝗔𝗻𝘁𝗶-𝗢𝘂𝘁 𝗳𝗼𝗿 𝘁𝗵𝗶𝘀 𝗴𝗿𝗼𝘂𝗽.\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);

    } catch (error) {
        return api.sendMessage(`───────────────\n» ❌ 𝗦𝗬𝗦𝗧𝗘𝗠 𝗘𝗥𝗥𝗢𝗥: ${error.message}\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
    }
};
