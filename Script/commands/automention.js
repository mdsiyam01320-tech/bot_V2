module.exports.config = {
	name: "automention",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
	description: "automent [mentioned]",
	commandCategory: "other",
	cooldowns: 5
};

module.exports.run = function({ api, event }) {
	const mentions = Object.keys(event.mentions);
	
	if (mentions.length === 0) {
		return api.sendMessage(
`───────────────

» ⚠️ @[${event.senderID}:0]

───────────────

» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, 
			event.threadID, 
			event.messageID
		);
	} else {
		for (let i = 0; i < mentions.length; i++) {
			const uid = mentions[i];
			const name = Object.values(event.mentions)[i].replace('@', '');
			
			api.sendMessage(
`───────────────

» 🔔 𝗠𝗘𝗡𝗧𝗜𝗢𝗡: ${name} @[${uid}:0]

───────────────

» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, 
				event.threadID
			);
		}
		return;
	}
};
