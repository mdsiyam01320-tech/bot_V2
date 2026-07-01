const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const jimp = require("jimp");

module.exports.config = {
  name: "arrest",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "Arrest a friend you mention",
  commandCategory: "tagfun",
  usages: "ব্যবহারের নিয়ম: arrest [@মেনশন]",
  cooldowns: 2,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "path": "",
    "jimp": ""
  }
};

module.exports.onLoad = async () => {
  const dirMaterial = path.resolve(__dirname, 'cache', 'canvas');
  const imgPath = path.resolve(dirMaterial, 'batgiam.png');
  if (!fs.existsSync(dirMaterial)) fs.mkdirSync(dirMaterial, { recursive: true });
  if (!fs.existsSync(imgPath)) {
    const res = await axios.get("https://i.imgur.com/ep1gG3r.png", { responseType: "arraybuffer" });
    fs.writeFileSync(imgPath, Buffer.from(res.data, "utf-8"));
  }
};

async function makeImage({ one, two }) {
  const __root = path.resolve(__dirname, "cache", "canvas");
  let batgiam_img = await jimp.read(__root + "/batgiam.png");
  let pathImg = __root + `/batgiam_${one}_${two}.png`;
  let avatarOne = __root + `/avt_${one}.png`;
  let avatarTwo = __root + `/avt_${two}.png`;

  let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512`, { responseType: 'arraybuffer' })).data;
  fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

  let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512`, { responseType: 'arraybuffer' })).data;
  fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

  let circleOne = await jimp.read(await circle(avatarOne));
  let circleTwo = await jimp.read(await circle(avatarTwo));
  batgiam_img.resize(500, 500).composite(circleOne.resize(100, 100), 375, 9).composite(circleTwo.resize(100, 100), 160, 92);

  let raw = await batgiam_img.getBufferAsync("image/png");
  fs.writeFileSync(pathImg, raw);
  fs.unlinkSync(avatarOne);
  fs.unlinkSync(avatarTwo);

  return pathImg;
}

async function circle(image) {
  let img = await jimp.read(image);
  img.circle();
  return await img.getBufferAsync("image/png");
}

module.exports.run = async function ({ event, api, args }) {
  const { threadID, messageID, senderID } = event;
  const out = msg => api.sendMessage(`───────────────\n» ${msg}\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);

  let mention = Object.keys(event.mentions)[0];
  if (!mention) return out("⚠️ Please mention 𝟭 person.");

  let tag = event.mentions[mention].replace("@", "");
  let one = senderID, two = mention;

  return makeImage({ one, two }).then(path => {
    api.sendMessage({
      body: `───────────────\n» 🟢 **𝐁𝐎𝐓 𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄𝐃**\n\n—হালা গরু চোর তোরে আজকে হাতে নাতে ধরছি পালাবি কই_😸💁‍♀️ ${tag}`,
      mentions: [{
        tag: tag,
        id: mention
      }],
      attachment: fs.createReadStream(path)
    }, threadID, () => fs.unlinkSync(path), messageID);
  }).catch(() => out("❌ Something went wrong while generating the image."));
};
