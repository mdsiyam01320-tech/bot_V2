const axios = require('axios');
const fs = require("fs-extra");

module.exports.config = {
 name: "rushia",
 version: "1.0.1",
 hasPermssion: 0,
 credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
 description: "Random Rushia images",
 commandCategory: "random-img",
 usages: "ব্যবহারের নিয়ম: rushia",
 cooldowns: 3,
 dependencies: {
    "axios": "",
    "fs-extra": ""
 }
};

module.exports.run = async ({ api, event }) => {
 const { threadID, messageID } = event;
 
 try {

  const res = await axios.get('https://saikiapi-v3-production.up.railway.app/holo/rushia');
  const imageUrl = res.data.url;
  const ext = imageUrl.substring(imageUrl.lastIndexOf(".") + 1);
  const pathImg = __dirname + `/cache/rushia.${ext}`;
  
  
  const imageBuffer = (await axios.get(imageUrl, { responseType: 'arraybuffer' })).data;
  fs.writeFileSync(pathImg, Buffer.from(imageBuffer, 'utf-8'));
  
  
  return api.sendMessage({
   attachment: fs.createReadStream(pathImg)
  }, threadID, () => {
   if (fs.existsSync(pathImg)) fs.unlinkSync(pathImg);
   api.setMessageReaction("✅", messageID, (err) => {}, true);
  }, messageID);

 } catch (err) {
 
  api.setMessageReaction("☹️", messageID, (err) => {}, true);
  return api.sendMessage(
`───────────────
» ❌ 𝗧𝗵𝗲𝗿𝗲'𝘀 𝗮 𝗽𝗿𝗼𝗯𝗹𝗲𝗺 𝘄𝗵𝗶𝗹𝗲 𝗴𝗲𝗻𝗲𝗿𝗮𝘁𝗶𝗻𝗴 𝘁𝗵𝗲 𝗽𝗵𝗼𝘁𝗼, 𝗽𝗹𝗲𝗮𝘀𝗲 𝘁𝗿𝘆 𝗮𝗴𝗮𝗶𝗻!
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
 }
}
