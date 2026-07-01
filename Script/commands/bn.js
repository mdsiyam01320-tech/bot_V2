module.exports.config = {
    name: "bn",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑",
    usePrefix: false,
    description: "যেকোনো টেক্সটকে বিভিন্ন ভাষায় অনুবাদ করার টুল।",
    commandCategory: "media",
    usages: "[ল্যাঙ্গুয়েজ কোড] [টেক্সট] অথবা মেসেজে রিপ্লাই করে: [ল্যাঙ্গুয়েজ কোড]",
    cooldowns: 3
};

module.exports.run = async ({ api, event, args }) => {
    const axios = require("axios");
    const { threadID, messageID, type, messageReply } = event;

    let targetLang = "bn"; // ডিফল্ট ভাষা বাংলা
    let textToTranslate = "";

    // সমর্থিত কিছু কমন ল্যাঙ্গুয়েজ কোড চেক করার জন্য
    const langPattern = /^[a-zA-Z]{2,3}$/;

    // ১. যদি মেসেজে রিপ্লাই দেওয়া হয়
    if (type === "message_reply") {
        textToTranslate = messageReply.body;
        // যদি রিপ্লাই করার সাথে কোনো ল্যাঙ্গুয়েজ কোড উল্লেখ করা হয় (যেমন: !bn en)
        if (args[0] && langPattern.test(args[0])) {
            targetLang = args[0].toLowerCase();
        }
    } 
    // ২. যদি নরমাল টেক্সট ইনপুট দেওয়া হয়
    else {
        if (args.length === 0) {
            return api.sendMessage(
                `───────────────\n` +
                `⚠️ 𝗣𝗹𝗲𝗮𝘀𝗲 𝗽𝗿𝗼𝘃𝗶𝗱𝗲 𝘁𝗲𝘅𝘁!\n\n` +
                `💡 𝗨𝘀𝗮𝗴𝗲:\n` +
                `• !bn [text] -> সরাসরি বাংলায় অনুবাদ\n` +
                `• !bn en [text] -> ইংরেজিতে অনুবাদ\n` +
                `• !bn ar [text] -> আরবিতে অনুবাদ\n` +
                `───────────────\n  𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑`, 
                threadID, messageID
            );
        }

        // প্রথম আর্গুমেন্টটি ল্যাঙ্গুয়েজ কোড কিনা তা যাচাই করা
        if (langPattern.test(args[0]) && args.length > 1) {
            targetLang = args[0].toLowerCase();
            textToTranslate = args.slice(1).join(" ");
        } else {
            textToTranslate = args.join(" ");
        }
    }

    try {
        // গুগল ট্রান্সলেট ফ্রি এপিআই কল
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(textToTranslate)}`;
        const res = await axios.get(url);
        
        if (!res.data || !res.data[0]) {
            return api.sendMessage("» ❌ অনুবাদ করতে ব্যর্থ হয়েছে। পুনরায় চেষ্টা করুন।", threadID, messageID);
        }

        // সম্পূর্ণ টেক্সট একসাথে জোড়া লাগানো (মাল্টিপল লাইনের জন্য)
        let translatedText = "";
        res.data[0].forEach(item => {
            if (item[0]) translatedText += item[0];
        });

        const srcLang = res.data[2] ? res.data[2].toUpperCase() : "AUTO";

        // প্রিমিয়াম ডিজাইন আউটপুট
        const output = `───────────────\n` +
                       `🌐 𝗧𝗥𝗔𝗡𝗦𝗟𝗔𝗧𝗜𝗢𝗡 𝗦𝗨𝗖𝗖𝗘𝗦𝗦\n\n` +
                       `📥 𝗙𝗿𝗼𝗺: ${srcLang} ➜ 📤 𝗧𝗼: ${targetLang.toUpperCase()}\n` +
                       `✍️ 𝗥𝗲𝘀𝘂𝗹𝘁:\n${translatedText}\n` +
                       `───────────────\n  𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑`;

        return api.sendMessage(output, threadID, messageID);

    } catch (error) {
        return api.sendMessage(`───────────────\n» ❌ An error occurred while translating!\n───────────────\n  𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑`, threadID, messageID);
    }
};
