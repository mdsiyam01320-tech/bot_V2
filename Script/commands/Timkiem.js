module.exports.config = {
    name: "search",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    description: "Search results on google",
    commandCategory: "info",
    usages: "ব্যবহারের নিয়ম: search [লেখা বা ছবির রিপ্লাই]",
    cooldowns: 5,
    dependencies: {}
};

module.exports.run = function({ api, event, args }) {
    const { threadID, messageID } = event;
    let textNeedSearch = "";
    const regex = /(https?:\/\/.*?\.(?:png|jpe?g|gif)(?:\?(?:[\w_-]+=[\w_-]+)(?:&[\w_-]+=[\w_-]+)*)?(.*))($)/;
    
    if (event.type == "message_reply" && event.messageReply.attachments && event.messageReply.attachments[0]) {
        textNeedSearch = event.messageReply.attachments[0].url;
    } else {
        textNeedSearch = args.join(" ");
    }

    if (!textNeedSearch) {
        return api.sendMessage(
`───────────────
» ⚠️ 𝗣𝗹𝗲𝗮𝘀𝗲 𝗲𝗻𝘁𝗲𝗿 𝘁𝗲𝘅𝘁 𝗼𝗿 𝗿𝗲𝗽𝗹𝘆 𝘁𝗼 𝗮𝗻 𝗶𝗺𝗮𝗴𝗲 𝘁𝗼 𝘀𝗲𝗮𝗿𝗰𝗵!
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
    }

    if (regex.test(textNeedSearch)) {
        return api.sendMessage(
`───────────────
» 🔍 𝗜𝗺𝗮𝗴𝗲 𝗦𝗲𝗮𝗿𝗰𝗵 𝗟𝗶𝗻𝗸: https://www.google.com/searchbyimage?&image_url=${encodeURIComponent(textNeedSearch)}
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
    } else {
        return api.sendMessage(
`───────────────
» 🔍 𝗚𝗼𝗼𝗴𝗹𝗲 𝗦𝗲𝗮𝗿𝗰𝗵 𝗟𝗶𝗻𝗸: https://www.google.com/search?q=${encodeURIComponent(textNeedSearch)}
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
    }
};
