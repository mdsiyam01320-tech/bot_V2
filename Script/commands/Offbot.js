module.exports.config = {
	name: "offbot",
	version: "1.0.1",
	hasPermssion: 2,
	credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
	description: "turn the bot off",
	commandCategory: "system",
	cooldowns: 0
};

module.exports.run = ({ event, api }) => {
	const { threadID, messageID, senderID } = event;
	
	// config.json থেকে মেইন এডমিনদের আইডি চেক করার ডায়নামিক লজিক
	if (!global.config.ADMINBOT.includes(senderID)) {
		return api.sendMessage(
`───────────────
» ⚠️ 𝗘𝗥𝗥: 𝗬𝗼𝘂 𝗱𝗼𝗻'𝘁 𝗵𝗮𝘃𝗲 𝗽𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻 𝘁𝗼 𝘂𝘀𝗲 𝘁𝗵𝗶𝘀 𝗰𝗼𝗺𝗺𝗮𝗻𝗱!
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
	}

	// বোট বন্ধ হওয়ার আগের কাস্টম রেসপন্স মেসেজ
	return api.sendMessage(
`───────────────
» 🛑 সিয়াম বস আমি বন্ধ হয়ে যাচ্ছি বাই.. 
» ✅ আইডি লগ আউট হয়ে গেছে আবার লগইন কর 
» 🙎 তারপর আবার চালু হবে। [ 𝗕𝗢𝗧: ${global.config.BOTNAME} 𝗶𝘀 𝗻𝗼𝘄 𝗢𝗙𝗙 ]
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, () => process.exit(0));
};
