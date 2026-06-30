module.exports.config = {
    name: "out",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    description: "Bot leaves the group with custom message",
    commandCategory: "Admin",
    usages: "out [id]",
    cooldowns: 10,
};

module.exports.run = async function({ api, event, args }) {
    const msg = `───────────────\n» 🤲 আসসালামু আলাইকুম\n» আমি 𝆠፝𝗡𝗜𝗝𝗛𝗨𝗠-𝗖𝗛𝗔𝗧-𝗕𝗢𝗧\n» 💌 আমাকে ব্যবহার করার জন্য ধন্যবাদ 😘\n» ⚠️ আলবিদা সবাই! আমি এখন গ্রুপ থেকে বের হচ্ছি...😞\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`;

    if (!args[0]) {
        return api.sendMessage(msg, event.threadID, () => {
            api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
        });
    }
    
    if (!isNaN(args[0])) {
        const targetThreadID = args.join(" ");
        return api.sendMessage(msg, targetThreadID, () => {
            api.removeUserFromGroup(api.getCurrentUserID(), targetThreadID);
        });
    }
}
