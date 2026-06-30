module.exports.config = {
  name: "anhdaden",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "White brother :v",
  commandCategory: "Edit-IMG",
  usages: "ব্যবহারের নিয়ম: [text 1] | [text 2]",
  cooldowns: 10
};

module.exports.wrapText = (ctx, text, maxWidth) => {
  return new Promise((resolve) => {
    if (ctx.measureText(text).width < maxWidth) return resolve([text]);
    if (ctx.measureText("W").width > maxWidth) return resolve(null);
    const words = text.split(" ");
    const lines = [];
    let line = "";
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
      if (ctx.measureText(`${line}${words[0]}`).width < maxWidth)
        line += `${words.shift()} `;
      else {
        lines.push(line.trim());
        line = "";
      }
      if (words.length === 0) lines.push(line.trim());
    }
    return resolve(lines);
  });
};

module.exports.run = async function ({ api, event, args }) {
  let { threadID, messageID } = event;
  const { loadImage, createCanvas, registerFont } = require("canvas");
  const fs = require("fs-extra");
  const axios = require("axios");
  let pathImg = __dirname + `/cache/anhdaden.png`;
  let pathFont = __dirname + "/cache/SVN-Arial 2.ttf";
  
  if (!args.join(" ")) {
    return api.sendMessage(
      "───────────────\n" +
      "» ⚠️ অনুগ্রহ করে ব্যবহারের সঠিক নিয়ম অনুসরণ করুন।\n" +
      "───────────────\n" +
      "» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
      threadID,
      messageID
    );
  }

  const text = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|");
  
  try {
    let getImage = (await axios.get(encodeURI(`https://i.imgur.com/2ggq8wM.png`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathImg, Buffer.from(getImage, "utf-8"));

    if (!fs.existsSync(pathFont)) { 
      let getfont = (await axios.get(`https://drive.google.com/u/0/uc?id=11YxymRp0y3Jle5cFBmLzwU89XNqHIZux&export=download`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(pathFont, Buffer.from(getfont, "utf-8"));
    }

    let baseImage = await loadImage(pathImg);
    let canvas = createCanvas(baseImage.width, baseImage.height);
    let ctx = canvas.getContext("2d");
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    
    registerFont(pathFont, { family: "SVN-Arial 2" });
    ctx.font = "30px SVN-Arial 2";
    ctx.fillStyle = "#000077";
    ctx.textAlign = "center";
    
    const line = await this.wrapText(ctx, text[0] || "", 464);
    const lines = await this.wrapText(ctx, text[1] || "", 464);
    ctx.fillText(line.join("\n"), 170, 129);
    ctx.fillText(lines.join("\n"), 170, 440);
    ctx.beginPath();
    
    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, imageBuffer);
    
    return api.sendMessage(
      { attachment: fs.createReadStream(pathImg) },
      threadID,
      () => fs.unlinkSync(pathImg),
      messageID
    );
  } catch (error) {
    return api.sendMessage(
      "───────────────\n" +
      "» ❌ 𝗘𝗥𝗥: ইমেজ তৈরি করতে সমস্যা হয়েছে।\n" +
      "───────────────\n" +
      "» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
      threadID,
      messageID
    );
  }
};
