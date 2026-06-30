const { loadImage, createCanvas } = require("canvas");
const fs = require("fs-extra");
const axios = require("axios");

module.exports.config = {
	name: "trump",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
	description: "Comment on the board ( ͡° ͜ʖ ͡°)",
	commandCategory: "edit-img",
	usages: "ব্যবহারের নিয়ম: trump [লেখা]",
	cooldowns: 10,
	dependencies: {
		"canvas": "",
		"axios": "",
		"fs-extra": ""
	}
};

module.exports.wrapText = (ctx, text, maxWidth) => {
	return new Promise(resolve => {
		if (ctx.measureText(text).width < maxWidth) return resolve([text]);
		if (ctx.measureText('W').width > maxWidth) return resolve(null);
		const words = text.split(' ');
		const lines = [];
		let line = '';
		while (words.length > 0) {
			let split = false;
			while (ctx.measureText(words[0]).width >= maxWidth) {
				const temp = words[0];
				words[0] = temp.slice(0, -1);
				if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
				else {
					split = true;
					words.splice(1, 0, temp.slice(-1));
				}
			}
			if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) line += `${words.shift()} `;
			else {
				lines.push(line.trim());
				line = '';
			}
			if (words.length === 0) lines.push(line.trim());
		}
		return resolve(lines);
	});
} 

module.exports.run = async function({ api, event, args }) {
	let { threadID, messageID } = event;
	let pathImg = __dirname + '/cache/trump.png';
	var text = args.join(" ");
	
	if (!text) {
		return api.sendMessage(
`───────────────
» ⚠️ 𝗣𝗹𝗲𝗮𝘀𝗲 𝗲𝗻𝘁𝗲𝗿 𝘁𝗵𝗲 𝗰𝗼𝗻𝘁𝗲𝗻𝘁 𝗼𝗳 𝘁𝗵𝗲 𝗰𝗼𝗺𝗺𝗲𝗻𝘁!
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
	}

	try {
		let response = (await axios.get(`https://i.imgur.com/ZtWfHHx.png`, { responseType: 'arraybuffer' })).data;
		fs.writeFileSync(pathImg, Buffer.from(response, 'utf-8'));
		
		let baseImage = await loadImage(pathImg);
		let canvas = createCanvas(baseImage.width, baseImage.height);
		let ctx = canvas.getContext("2d");
		ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
		
		ctx.font = "400 35px Arial";
		ctx.fillStyle = "#000000";
		ctx.textAlign = "start";
		
		const lines = await this.wrapText(ctx, text, 1100);
		let y = 165;
		for (let i = 0; i < lines.length; i++) {
			ctx.fillText(lines[i], 60, y);
			y += 45; 
		}
		
		ctx.beginPath();
		const imageBuffer = canvas.toBuffer();
		fs.writeFileSync(pathImg, imageBuffer);
		
		return api.sendMessage({ attachment: fs.createReadStream(pathImg) }, threadID, () => fs.unlinkSync(pathImg), messageID);
	} catch (error) {
		if (fs.existsSync(pathImg)) fs.unlinkSync(pathImg);
		return api.sendMessage(
`───────────────
» ❌ 𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗿𝗲𝗱 𝘄𝗵𝗶𝗹𝗲 𝗴𝗲𝗻𝗲𝗿𝗮𝘁𝗶𝗻𝗴 𝘁𝗵𝗲 𝗶𝗺𝗮𝗴𝗲!
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
	}
};
