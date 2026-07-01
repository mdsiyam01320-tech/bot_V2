module.exports.config = {
    name: "bday",
    version: "1.1.0",
    hasPermssion: 0,
    credits: " can 𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍", // নাম পরিবর্তন করলে বট বন্ধ হয়ে যাবে 
    description: "See admin's birthday countdown",
    usePrefix: false,
    commandCategory: "info",
    cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
    const axios = require("axios");
    const fs = require("fs-extra");
    const path = require("path");
    const { threadID, messageID } = event;

    
    const adminUID = "61591371186179"; //আপনার ইউ আইডি বসান এখানে 
    const cachePath = path.join(__dirname, "cache", "bday_admin.png");

    
    const currentYear = new Date().getFullYear();
    let bdayDate = new Date(`September 12, ${currentYear} 00:00:00`);
    
    
    if (new Date() > bdayDate) {
        bdayDate = new Date(`September 12, ${currentYear + 1} 00:00:00`);
    }

    const t = Date.parse(bdayDate) - Date.parse(new Date());
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const days = Math.floor(t / (1000 * 60 * 60 * 24));


    const msgBody = `───────────────\n` +
                    `🎂 𝗔𝗗𝗠𝗜𝗡 𝗕𝗜𝗥𝗧𝗛𝗗𝗔𝗬 𝗖𝗢𝗨𝗡𝗧𝗗𝗢𝗪𝗡\n\n` +
                    `» 👤 𝗔𝗱𝗺𝗶𝗻: 𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍\n` +
                    `» 📅 𝗗𝗮𝘁𝗲: 12th September\n\n` +
                    `⏳ 𝗧𝗶𝗺𝗲 𝗟𝗲𝗳𝘁:\n` +
                    `• ${days} Days\n` +
                    `• ${hours} Hours\n` +
                    `• ${minutes} Minutes\n` +
                    `• ${seconds} Seconds\n` +
                    `───────────────\n` +
                    `  𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑`;

    try {
        
        await fs.ensureDir(path.dirname(cachePath));

        
        const imgUrl = `https://graph.facebook.com/${adminUID}/picture?width=720&height=720&access_token=662624217089771|12c149d6d5a57173132d9d40131481d3`;
        const response = await axios.get(imgUrl, { responseType: "arraybuffer" });
        await fs.writeFile(cachePath, Buffer.from(response.data, "utf-8"));

        
        return api.sendMessage({
            body: msgBody,
            attachment: fs.createReadStream(cachePath)
        }, threadID, (err) => {
            if (!err && fs.existsSync(cachePath)) {
                fs.unlinkSync(cachePath);
            }
        }, messageID);

    } catch (error) {
        
        return api.sendMessage(msgBody, threadID, messageID);
    }
};
