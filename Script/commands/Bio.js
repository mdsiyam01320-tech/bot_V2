module.exports.config = {
	name: "bio",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
	description: "Change bot's bio",
	commandCategory: "Admin",
	usages: "bio [text]",
    cooldowns: 5
};
  
module.exports.run = async ({ api, event, args }) => {
    api.changeBio(args.join(" "), (e) => {
        if (e) return api.sendMessage(`───────────────\n» ⚠️ 𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗿𝗲𝗱: ${e}\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, event.threadID, event.messageID); 
        
        return api.sendMessage(`───────────────\n» 📝 𝗦𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 𝗰𝗵𝗮𝗻𝗴𝗲𝗱 𝗯𝗼𝘁'𝘀 𝗯𝗶𝗼 𝘁𝗼:\n\n» ${args.join(" ")}\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, event.threadID, event.messageID);
    });
