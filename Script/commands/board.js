module.exports.config = {
    name: "board",
    version: "1.0.5",
    hasPermssion: 0,
    credits: " can 𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    description: "Comment on the board ( ͡° ͜ʖ ͡°)",
    commandCategory: "general",
    usages: "[text]",
    cooldowns: 5,
    dependencies: {
        "canvas": "",
        "axios": "",
        "fs-extra": ""
    }
};

// টেক্সট র‍্যাপিং মেকানিজম অপ্টিমাইজেশন (ক্র্যাশ-ফ্রি)
const wrapText = (ctx, text, maxWidth) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        let width = ctx.measureText(currentLine + word).width;
        if (width < maxWidth) {
            currentLine += word + ' ';
        } else {
            lines.push(currentLine.trim());
            currentLine = word + ' ';
        }
    }
    lines.push(currentLine.trim());
    return lines;
};

module.exports.run = async function({ api, event, args }) {
    const { senderID, threadID, messageID } = event;
    const { loadImage, createCanvas } = require("canvas");
    const fs = require("fs-extra");
    const axios = require("axios");
    const path = require("path");

    const text = args.join(" ");
    
    // সিগনেচার
    const signature = "\n───────────────\n  𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑";

    if (!text) {
        return api.sendMessage(`───────────────\n» ⚠️ Please enter the text you want to write on the board!${signature}`, threadID, messageID);
    }

    const cacheDir = path.join(__dirname, "cache");
    const pathImg = path.join(cacheDir, "board_output.png");

    // ক্যাশ ডিরেক্টরি নিশ্চিত করা
    if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
    }

    try {
        // বোর্ড ব্যাকগ্রাউন্ড ডাউনলোড
        const response = await axios.get(`https://i.imgur.com/Jl7sYMm.jpeg`, { responseType: 'arraybuffer' });
        fs.writeFileSync(pathImg, Buffer.from(response.data, 'utf-8'));

        const baseImage = await loadImage(pathImg);
        const canvas = createCanvas(baseImage.width, baseImage.height);
        const ctx = canvas.getContext("2d");

        // ক্যানভাসে ইমেজ ড্র করা
        ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
        
        // ফন্ট কনফিগারেশন
        ctx.font = "bold 22px sans-serif";
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "start";

        // টেক্সট র‍্যাপ করা এবং বোর্ডে প্লেস করা
        const lines = wrapText(ctx, text, 430);
        let y = 100; // স্টার্টিং Y পজিশন
        
        for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], 85, y);
            y += 28; // লাইন হাইট বা স্পেসিং
        }

        ctx.beginPath();
        const imageBuffer = canvas.toBuffer();
        fs.writeFileSync(pathImg, imageBuffer);

        // প্রিমিয়াম স্টাইলে মেসেজ পাঠানো
        return api.sendMessage({
            body: `───────────────\n📝 𝗛𝗲𝗿𝗲 𝗶𝘀 𝘆𝗼𝘂𝗿 𝗯𝗼𝗮𝗿𝗱 𝗰𝗼𝗺𝗺𝗲𝗻𝘁!${signature}`,
            attachment: fs.createReadStream(pathImg)
        }, threadID, (err) => {
            if (!err && fs.existsSync(pathImg)) {
                fs.unlinkSync(pathImg);
            }
        }, messageID);

    } catch (error) {
        console.error(error);
        return api.sendMessage(`───────────────\n» ❌ Something went wrong while generating the image!${signature}`, threadID, messageID);
    }
};
