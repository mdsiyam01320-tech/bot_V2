module.exports.config = {
    name: "approve",
    version: "2.0.0",
    hasPermssion: 2,
    credits: "Ullash (Re-designed)",
    description: "গ্রুপ চ্যাট অনুমোদন (Approve) করার প্রিমিয়াম সিস্টেম",
    commandCategory: "Admin",
    cooldowns: 5
};

const fs = require("fs");
const axios = require("axios");

const threadPath = __dirname + "/cache/threads.json";
const pendingPath = __dirname + "/cache/pending.json";
const ADMIN_ID = "61591371186179"; // আপনার নতুন আইডি এখানে বসানো হয়েছে

module.exports.onLoad = () => {
    if (!fs.existsSync(threadPath)) fs.writeFileSync(threadPath, JSON.stringify([]));
    if (!fs.existsSync(pendingPath)) fs.writeFileSync(pendingPath, JSON.stringify([]));
};

module.exports.run = async ({ api, event, args, Threads }) => {
    const { threadID, messageID, senderID } = event;

    // অ্যাডমিন ভেরিফিকেশন
    if (senderID !== ADMIN_ID) {
        return api.sendMessage("⚠️ এই কমান্ডটি শুধুমাত্র বটের প্রধান অ্যাডমিন ব্যবহার করতে পারবেন।", threadID, messageID);
    }

    let approvedThreads = JSON.parse(fs.readFileSync(threadPath));
    let pendingThreads = JSON.parse(fs.readFileSync(pendingPath));

    let subCommand = args[0]?.toLowerCase();

    // 1. লিস্ট কমান্ড
    if (subCommand === "list" || subCommand === "l") {
        if (approvedThreads.length === 0) return api.sendMessage("╭💡 𝖡𝖮𝖳 𝖲𝖳𝖳𝖴𝖲\n╰─────────────📌\n• বর্তমানে কোনো গ্রুপ অনুমোদিত নেই।", threadID, messageID);
        
        let msg = "╭✨ 𝖠𝖯𝖯𝖱𝖮𝖵𝖤𝖣 𝖦𝖱𝖮𝖴𝖯𝖲\n├─────────────🔰\n";
        for (let i = 0; i < approvedThreads.length; i++) {
            let name = (await Threads.getData(approvedThreads[i]))?.threadInfo?.threadName || "গোপন গ্রুপ";
            msg += `│ ${i + 1}. ${name}\n│ 𝖨𝖣: ${approvedThreads[i]}\n├── • • •\n`;
        }
        msg += `╰👉 মোট অনুমোদিত গ্রুপ: ${approvedThreads.length}`;
        return api.sendMessage(msg, threadID, messageID);
    }

    // 2. পেন্ডিং কমান্ড
    if (subCommand === "pending" || subCommand === "p") {
        if (pendingThreads.length === 0) return api.sendMessage("╭💡 𝖯𝖤𝖭𝖣𝖨𝖭𝖦 𝖲𝖳𝖳𝖴𝖲\n╰─────────────📌\n• বর্তমানে কোনো গ্রুপ পেন্ডিং তালিকায় নেই।", threadID, messageID);
        
        let msg = "╭⏳ 𝖯𝖤𝖭𝖣𝖨𝖭𝖦 𝖫𝖨𝖲𝖳\n├─────────────🔰\n";
        for (let i = 0; i < pendingThreads.length; i++) {
            let name = (await Threads.getData(pendingThreads[i]))?.threadInfo?.threadName || "অজানা গ্রুপ";
            msg += `│ ${i + 1}. ${name}\n│ 𝖨𝖣: ${pendingThreads[i]}\n├── • • •\n`;
        }
        msg += `╰👉 অনুমোদন করতে টাইপ করুন:\n/approve [আইডি]`;
        return api.sendMessage(msg, threadID, messageID);
    }

    // 3. ডিলিট/রিমুভ কমান্ড
    if (subCommand === "del" || subCommand === "d") {
        let targetID = args[1] || threadID;
        if (!approvedThreads.includes(targetID)) return api.sendMessage("⚠️ এই আইডিটি অনুমোদিত তালিকায় নেই।", threadID, messageID);
        
        approvedThreads = approvedThreads.filter(id => id !== targetID);
        fs.writeFileSync(threadPath, JSON.stringify(approvedThreads));
        return api.sendMessage(`✅ সফলভাবে গ্রুপ আইডিটি (${targetID}) রিমুভ করা হয়েছে।`, threadID, messageID);
    }

    // 4. সাহায্য/হেল্প কমান্ড
    if (subCommand === "help" || subCommand === "h") {
        let helpMsg = "╭💼 𝖠𝖯𝖯𝖱𝖮𝖵𝖤 𝖢𝖮𝖬𝖬𝖠𝖭𝖣𝖲\n├─────────────⚙️\n" +
                      "│ • /approve l/list ➜ অনুমোদিত লিস্ট\n" +
                      "│ • /approve p/pending ➜ পেন্ডিং লিস্ট\n" +
                      "│ • /approve d/del [ID] ➜ গ্রুপ রিমুভ করুন\n" +
                      "│ • /approve [ID] ➜ নতুন গ্রুপ অনুমোদন করুন\n" +
                      "╰────────────────𓆩🖤𓆪";
        return api.sendMessage(helpMsg, threadID, messageID);
    }

    // 5. গ্রুপ অনুমোদন করার মূল ফাংশন (Fallback)
    let targetThreadID = args[0] || threadID;

    if (approvedThreads.includes(targetThreadID)) {
        return api.sendMessage("ℹ️ এই গ্রুপটি ইতিপূর্বেই অনুমোদন করা হয়েছে।", threadID, messageID);
    }

    // অনুমোদন প্রক্রিয়া শুরু
    approvedThreads.push(targetThreadID);
    pendingThreads = pendingThreads.filter(id => id !== targetThreadID);
    fs.writeFileSync(threadPath, JSON.stringify(approvedThreads));
    fs.writeFileSync(pendingPath, JSON.stringify(pendingThreads));

    api.sendMessage(`🎉 সফলভাবে গ্রুপটি অনুমোদন করা হয়েছে!\n🆔 আইডি: ${targetThreadID}`, threadID, messageID);

    // অনুমোদিত গ্রুপে চমৎকার ওয়েলকাম মেসেজ পাঠানো
    try {
        let welcomeMsg = "╭──────────────╮\n" +
                         "   🟢 𝖡𝖮𝖳 𝖠𝖢𝖳𝖨𝖵𝖠𝖳𝖤𝖣 𝖲𝖴𝖢𝖢𝖤𝖲𝖲𝖥𝖴𝖫𝖫𝖸\n" +
                         "╰──────────────╯\n\n" +
                         "🕋 لَآ إِلَـٰهَ إِلَّا ٱللَّهُ مُحَمَّدٌ رَّسُولُ ٱللَّهِ\n\n" +
                         "আসসালামু আলাইকুম! অত্যন্ত আনন্দের সাথে জানাচ্ছি যে, আমাদের বটের মেইন অ্যাডমিন এই গ্রুপে বটের কার্যকারিতা অনুমোদন করেছেন। 🎉\n\n" +
                         "╭📌 গ্রুপের জন্য জরুরি নিয়মাবলী:\n" +
                         "├── 📢 ১. গ্রুপে কোনো প্রকার স্প্যামিং করা যাবে না।\n" +
                         "├── 🚫 ২. কোনো ধরনের গালিগালাজ বা খারাপ আচরণ করা যাবে না।\n" +
                         "├── ⛔ ৩. বটকে উদ্দেশ্য করে কোনো সাইবার অ্যাটাক বা ক্ষতি করার চেষ্টা করবেন না।\n" +
                         "╰────────────────𓆩🖤𓆪\n\n" +
                         "সবাই নিয়ম মেনে চলুন এবং বটের চমৎকার ফিচারগুলো উপভোগ করুন। ধন্যবাদ! ✨";

        // একটি সুন্দর ছবি সহ ওয়েলকাম মেসেজ পাঠানো
        let imgUrl = "https://anime.apibypriyansh.repl.co/img/";
        let path = __dirname + `/cache/welcome_${targetThreadID}.jpg`;
        
        let response = await axios.get(imgUrl, { responseType: "arraybuffer" });
        fs.writeFileSync(path, Buffer.from(response.data, "utf-8"));

        api.sendMessage({
            body: welcomeMsg,
            attachment: fs.createReadStream(path)
        }, targetThreadID, () => fs.unlinkSync(path));

    } catch (error) {
        // ছবি লোড না হলে শুধু টেক্সট চলে যাবে
        api.sendMessage(welcomeMsg, targetThreadID);
    }
};
