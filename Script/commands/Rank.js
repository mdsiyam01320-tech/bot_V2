const fs = require("fs-extra");
const path = require("path");
const Canvas = require("canvas");
const axios = require("axios");
const jimp = require("jimp");

module.exports.config = {
	name: "rank",
	version: "2.0.1",
	hasPermssion: 0,
	credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
	description: "View Member Rankings",
	commandCategory: "Group",
	usages: " [user] or [tag]",
	cooldowns: 5,
	dependencies: {
		"fs-extra": "",
		"path": "",
		"jimp": "",
		"axios": "",
		"canvas": ""
	}
};

module.exports.makeRankCard = async (data) => {    
	const __root = path.resolve(__dirname, "cache");
	const PI = Math.PI;
    const { id, name, rank, level, expCurrent, expNextLevel } = data;

	Canvas.registerFont(__root + "/regular-font.ttf", { family: "Manrope", weight: "regular", style: "normal" });
	Canvas.registerFont(__root + "/bold-font.ttf", { family: "Manrope", weight: "bold", style: "normal" });

	const pathCustom = path.resolve(__dirname, "cache", "customrank");
	var customDir = fs.existsSync(pathCustom) ? fs.readdirSync(pathCustom) : [];
	var dirImage = __root + "/rankcard.png";
	customDir = customDir.map(item => item.replace(/\.png/g, ""));

	for (let singleLimit of customDir) {
		var limitRate = false;
		const split = singleLimit.split(/-/g);
		var min = parseInt(split[0]), max = parseInt((split[1]) ? split[1] : min);
	
		for (; min <= max; min++) {
			if (level == min) {
				limitRate = true;
				break;
			}
		}
		if (limitRate == true) {
			dirImage = pathCustom + `/${singleLimit}.png`;
			break;
		}
	}

	let rankCard = await Canvas.loadImage(dirImage);
	const pathImg = __root + `/rank_${id}.png`;
	
	var expWidth = (expCurrent * 610) / expNextLevel;
	if (expWidth > 610 - 19.5) expWidth = 610 - 19.5;
	
	let avatarResponse = await axios.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' });
	let avatar = await this.circle(avatarResponse.data);

	const canvas = Canvas.createCanvas(1000, 282);
	const ctx = canvas.getContext("2d");

	ctx.drawImage(rankCard, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(await Canvas.loadImage(avatar), 70, 75, 150, 150);

	ctx.font = `bold 36px Manrope`;
	ctx.fillStyle = "#FFFFFF";
	ctx.textAlign = "start";
	ctx.fillText(name, 270, 164);

	ctx.font = `bold 38px Manrope`;
	ctx.fillStyle = "#FF0000";
	ctx.textAlign = "end";
	ctx.fillText(level, 934 - 68, 82);
	ctx.fillStyle = "#FF0000";
	ctx.fillText("Lv.", 934 - 55 - ctx.measureText(level).width - 10, 82);

	ctx.font = `bold 39px Manrope`;
	ctx.fillStyle = "#FF0000";
	ctx.textAlign = "end";
	ctx.fillText(rank, 934 - 55 - ctx.measureText(level).width - 16 - ctx.measureText(`Lv.`).width - 25, 82);
	ctx.fillStyle = "#FF0000";
	ctx.fillText("#", 934 - 55 - ctx.measureText(level).width - 16 - ctx.measureText(`Lv.`).width - 16 - ctx.measureText(rank).width - 16, 82);

	ctx.font = `bold 40px Manrope`;
	ctx.fillStyle = "#1874CD";
	ctx.textAlign = "start";
	ctx.fillText("/ " + expNextLevel, 710 + ctx.measureText(expCurrent).width + 10, 164);
	ctx.fillStyle = "#00BFFF";
	ctx.fillText(expCurrent, 710, 164);

	ctx.beginPath();
	ctx.fillStyle = "#FFB90F";
	ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * PI, 0.5 * PI, true);
	ctx.fill();
	ctx.fillRect(257 + 18.5, 147.5 + 36.25, expWidth, 37.5);
	ctx.arc(257 + 18.5 + expWidth, 147.5 + 18.5 + 36.25, 18.75, 1.5 * PI, 0.5 * PI, false);
	ctx.fill();

	const imageBuffer = canvas.toBuffer();
	fs.writeFileSync(pathImg, imageBuffer);
	return pathImg;
}

module.exports.circle = async (image) => {
	let img = await jimp.read(image);
	img.circle();
	return await img.getBufferAsync("image/png");
}

module.exports.expToLevel = (point) => {
	if (point < 0) return 0;
	return Math.floor((Math.sqrt(1 + (4 * point) / 3) + 1) / 2);
}

module.exports.levelToExp = (level) => {
	if (level <= 0) return 0;
	return 3 * level * (level - 1);
}

module.exports.getInfo = async (uid, Currencies) => {
	let point = (await Currencies.getData(uid)).exp;
	const level = this.expToLevel(point);
	const expCurrent = point - this.levelToExp(level);
	const expNextLevel = this.levelToExp(level + 1) - this.levelToExp(level);
	return { level, expCurrent, expNextLevel };
}

module.exports.onLoad = async function () {
	const { resolve } = path;
    const { existsSync, mkdirSync } = fs;
    const { downloadFile } = global.utils;
	const customPath = resolve(__dirname, "cache", "customrank");
    if (!existsSync(customPath)) mkdirSync(customPath, { recursive: true });

    if (!existsSync(resolve(__dirname, 'cache', 'regular-font.ttf'))) await downloadFile("https://raw.githubusercontent.com/catalizcs/storage-data/master/rank/fonts/regular-font.ttf", resolve(__dirname, 'cache', 'regular-font.ttf'));
	if (!existsSync(resolve(__dirname, 'cache', 'bold-font.ttf'))) await downloadFile("https://raw.githubusercontent.com/catalizcs/storage-data/master/rank/fonts/bold-font.ttf", resolve(__dirname, 'cache', 'bold-font.ttf'));
	if (!existsSync(resolve(__dirname, 'cache', 'rankcard.png'))) await downloadFile("https://raw.githubusercontent.com/catalizcs/storage-data/master/rank/rank_card/rankcard.png", resolve(__dirname, 'cache', 'rankcard.png'));
}

module.exports.run = async ({ event, api, args, Currencies, Users }) => {
	let dataAll = (await Currencies.getAll(["userID", "exp"]));
	const mention = Object.keys(event.mentions);

	dataAll.sort((a, b) => b.exp - a.exp);

	const errorMsg = 
`───────────────
» ❌ 𝗘𝗿𝗿𝗼𝗿! 𝗣𝗹𝗲𝗮𝘀𝗲 𝘁𝗿𝘆 𝗮𝗴𝗮𝗶𝗻 𝗶𝗻 𝟱 𝘀𝗲𝗰𝗼𝗻𝗱𝘀.
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`;

	if (args.length == 0) {
		const rank = dataAll.findIndex(item => parseInt(item.userID) == parseInt(event.senderID)) + 1;
		const name = global.data.userName.get(event.senderID) || await Users.getNameUser(event.senderID);
		if (rank == 0) return api.sendMessage(errorMsg, event.threadID, event.messageID);
		const point = await this.getInfo(event.senderID, Currencies);
		let pathRankCard = await this.makeRankCard({ id: event.senderID, name, rank, ...point });
		return api.sendMessage({ attachment: fs.createReadStream(pathRankCard) }, event.threadID, () => fs.unlinkSync(pathRankCard), event.messageID);
	}
	if (mention.length == 1) {
		const rank = dataAll.findIndex(item => parseInt(item.userID) == parseInt(mention[0])) + 1;
		const name = global.data.userName.get(mention[0]) || await Users.getNameUser(mention[0]);
		if (rank == 0) return api.sendMessage(errorMsg, event.threadID, event.messageID);
		let point = await this.getInfo(mention[0], Currencies);
		let pathRankCard = await this.makeRankCard({ id: mention[0], name, rank, ...point });
		return api.sendMessage({ attachment: fs.createReadStream(pathRankCard) }, event.threadID, () => fs.unlinkSync(pathRankCard), event.messageID);
	}
	if (mention.length > 1) {
		for (const userID of mention) {
			const rank = dataAll.findIndex(item => parseInt(item.userID) == parseInt(userID)) + 1;
			const name = global.data.userName.get(userID) || await Users.getNameUser(userID);
			if (rank == 0) return api.sendMessage(errorMsg, event.threadID, event.messageID);
			let point = await this.getInfo(userID, Currencies);
			let pathRankCard = await this.makeRankCard({ id: userID, name, rank, ...point });
			api.sendMessage({ attachment: fs.createReadStream(pathRankCard) }, event.threadID, () => fs.unlinkSync(pathRankCard), event.messageID);
		}
	}
}
