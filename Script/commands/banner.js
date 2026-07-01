module.exports.config = {
    name: "banner",
    version: "1.0.5",
    hasPermssion: 0,
    credits: "𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑",
    description: "generates banner with lots of characters available",
    commandCategory: "game",
    usages: "{number}|{name1}|{name2}|{name3}|{color}",
    cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
    const fs = require('fs');
    const path = require('path');
    const axios = require('axios');
    const { loadImage, createCanvas, registerFont } = require('canvas');

    const { messageID, threadID } = event;
    const tadDir = path.join(__dirname, 'tad');

    // 'tad' ফোল্ডার না থাকলে তৈরি করার লজিক
    if (!fs.existsSync(tadDir)) {
        fs.mkdirSync(tadDir, { recursive: true });
    }

    // ইনপুট প্রসেসিং
    const rawArgs = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").split("|");
    const text1 = rawArgs[0] || "21";
    const text2 = rawArgs[1] || "";
    const text3 = rawArgs[2] || "";
    const text4 = rawArgs[3] || "";
    const color = rawArgs[4] || "";

    const pathImg = path.join(tadDir, 'avatar_1.png');
    const pathAva = path.join(tadDir, 'avatar_2.png');

    try {
        // ক্যারেক্টার লিস্ট লোড করা
        const response = await axios.get('https://run.mocky.io/v3/0dcc2ccb-b5bd-45e7-ab57-5dbf9db17864');
        const lengthchar = response.data;
        
        // ইনডেক্স ভ্যালিডেশন
        const charIndex = parseInt(text1) - 1;
        if (charIndex < 0 || charIndex >= lengthchar.length) {
            return api.sendMessage(`» ❌ Invalid character number! Available: 1 to ${lengthchar.length}`, threadID, messageID);
        }

        // এনিমে অবতার ডাউনলোড
        let avtAnime = (await axios.get(encodeURI(lengthchar[charIndex].imgAnime), { responseType: "arraybuffer" })).data;
        fs.writeFileSync(pathAva, Buffer.from(avtAnime, "utf-8"));

        // ব্যাকগ্রাউন্ড ইমেজ ডাউনলোড
        let background = (await axios.get(encodeURI(`https://imgur.com/Ch778s2.png`), { responseType: "arraybuffer" })).data;
        fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));

        // ফন্ট ডাউনলোড লজিক
        const fonts = [
            { name: 'PastiOblique-7B0wK.otf', url: 'https://github.com/hanakuUwU/font/raw/main/PastiOblique-7B0wK.otf' },
            { name: 'gantellinesignature-bw11b.ttf', url: 'https://github.com/hanakuUwU/font/raw/main/gantellinesignature-bw11b.ttf' },
            { name: 'UTM%20Bebas.ttf', url: 'https://github.com/hanakuUwU/font/blob/main/UTM%20Bebas.ttf?raw=true' }
        ];

        for (const font of fonts) {
            const fontPath = path.join(tadDir, decodeURIComponent(font.name));
            if (!fs.existsSync(fontPath)) {
                let fontData = (await axios.get(font.url, { responseType: "arraybuffer" })).data;
                fs.writeFileSync(fontPath, Buffer.from(fontData, "utf-8"));
            }
        }

        // কালার সেটআপ
        let color_ = (color.toLowerCase() === "no" || color === "") ? lengthchar[charIndex].colorBg : color;

        // ক্যানভাস ড্রয়িং শুরু
        let a = await loadImage(pathImg);
        let ab = await loadImage(pathAva);
        let canvas = createCanvas(a.width, a.height);
        let ctx = canvas.getContext("2d");

        ctx.fillStyle = "#e6b030";
        ctx.drawImage(a, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(ab, 1500, -400, 1980, 1980);
        ctx.textAlign = "start";

        // ফন্ট রেজিস্ট্রেশন ও টেক্সট রেন্ডারিং
        registerFont(path.join(tadDir, 'PastiOblique-7B0wK.otf'), { family: "PastiOblique-7B0wK" });
        ctx.fillStyle = color_;
        ctx.font = "370px PastiOblique-7B0wK";
        ctx.fillText(text2, 500, 750);

        registerFont(path.join(tadDir, 'gantellinesignature-bw11b.ttf'), { family: "gantellinesignature-bw11b" });
        ctx.fillStyle = "#fff";
        ctx.font = "350px gantellinesignature-bw11b";
        ctx.fillText(text3, 500, 680);
        ctx.save();

        registerFont(path.join(tadDir, 'UTM%20Bebas.ttf'), { family: "Bebas" });
        ctx.textAlign = "end";
        ctx.fillStyle = "#f56236";
        ctx.font = "145px PastiOblique-7B0wK";
        ctx.fillText(text4, 2100, 870);
        ctx.beginPath();

        // ইমেজ বাফার সেভ করা
        const imageBuffer = canvas.toBuffer();
        fs.writeFileSync(pathImg, imageBuffer);

        // মোটর মেসেজ সেন্ড ও ক্লিনিং
        return api.sendMessage({
            body: `✨ Here's Your Custom Banner! ✨\n\nCreated By: 𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑`,
            attachment: fs.createReadStream(pathImg)
        }, threadID, (err) => {
            if (!err) {
                if (fs.existsSync(pathImg)) fs.unlinkSync(pathImg);
                if (fs.existsSync(pathAva)) fs.unlinkSync(pathAva);
            }
        }, messageID);

    } catch (error) {
        console.error(error);
        return api.sendMessage("» ❌ An error occurred while generating the banner. Please try again later.", threadID, messageID);
    }
};
