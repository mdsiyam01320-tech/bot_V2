module.exports.config = {
    name: "ban",
    version: "1.2.0",
    hasPermssion: 0,
    credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    description: "গ্রুপ মেম্বার ওয়ার্নিং এবং পার্মানেন্ট ব্যান ম্যানেজমেন্ট টুল।",
    commandCategory: "group",
    usages: "[key / @mention / reply]",
    cooldowns: 5
};

module.exports.run = async function({ api, args, event }) {
    const { messageID, threadID, senderID } = event;
    const fs = require("fs");
    const path = require("path");

    // প্রিমিয়াম সিগনেচার ডিজাইন
    const signature = "\n───────────────\n  𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑";

    // হেল্পার ফাংশন: মেসেজ ফরম্যাটিং (একই স্টাইল বজায় রাখার জন্য)
    const sendMsg = (text) => api.sendMessage(`───────────────\n${text}${signature}`, threadID, messageID);

    let info;
    try {
        info = await api.getThreadInfo(threadID);
    } catch (e) {
        return sendMsg("» ❌ গ্রুপ ইনফো লোড করতে ব্যর্থ হয়েছে।");
    }

    // বটের এডমিন পারমিশন চেক
    if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) {
        return sendMsg("» ⚠️ এই কমান্ডটি ব্যবহার করতে হলে বটকে অবশ্যই গ্রুপের এডমিন হতে হবে।");
    }

    // ডাটাবেজ ফাইল ও ফোল্ডার সেটআপ
    const cacheDir = path.join(__dirname, "cache");
    const cachePath = path.join(cacheDir, "bans.json");

    if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
    }

    if (!fs.existsSync(cachePath)) {
        fs.writeFileSync(cachePath, JSON.stringify({ warns: {}, banned: {} }, null, 2));
    }

    let bans = JSON.parse(fs.readFileSync(cachePath));

    // থ্রেড ডাটা ইনিশিয়ালাইজেশন
    if (!bans.warns.hasOwnProperty(threadID)) bans.warns[threadID] = {};
    if (!bans.banned.hasOwnProperty(threadID)) bans.banned[threadID] = [];

    const saveDB = () => fs.writeFileSync(cachePath, JSON.stringify(bans, null, 2));
    const isAdmin = (uid) => info.adminIDs.some(item => item.id == uid) || (global.config.ADMINBOT || []).includes(uid);

    // ১. ইউজার গাইডলাইন (হেল্প মেনু)
    if (!args[0]) {
        const helpMsg = `» 🚫 𝗚𝗥𝗢𝗨𝗣 𝗕𝗔𝗡 & 𝗪𝗔𝗥𝗡 𝗧𝗢𝗢𝗟\n\n` +
                        `» 𝗚𝘂𝗶𝗱𝗲𝗹𝗶𝗻𝗲:\n` +
                        `» ban view : নিজের ওয়ার্নিং হিস্টোরি দেখতে।\n` +
                        `» ban view [@mention] : নির্দিষ্ট ইউজারের ওয়ার্নিং দেখতে।\n` +
                        `» ban view all : গ্রুপের সবার ওয়ার্নিং লিস্ট দেখতে।\n` +
                        `» ban listban : ব্যান হওয়া মেম্বারদের লিস্ট দেখতে।\n` +
                        `» ban unban [UID] : কাউকে ব্যান মুক্ত করতে (Admin)।\n` +
                        `» ban reset : গ্রুপের সব ওয়ার্নিং ডাটা রিসেট করতে (Admin)।\n` +
                        `» ban [@mention/reply] [কারণ] : কাউকে ওয়ার্নিং দিতে (Admin)।`;
        return sendMsg(helpMsg);
    }

    // ২. ভিউ অপশন (Warning Info View)
    if (args[0] === "view") {
        // নিজের ওয়ার্নিং দেখতে
        if (!args[1]) {
            let mywarn = bans.warns[threadID][senderID];
            if (!mywarn || mywarn.length === 0) {
                return sendMsg("» ✅ আপনি কখনো কোনো ওয়ার্নিং পাননি।");
            }
            let msg = mywarn.map((r, i) => `${i + 1}. ${r}`).join(" | ");
            return sendMsg(`» ❎ আপনাকে যে কারণে ওয়ার্নিং দেওয়া হয়েছে:\n${msg}`);
        }
        
        // নির্দিষ্ট মেনশন করা ইউজারের ওয়ার্নিং দেখতে
        else if (Object.keys(event.mentions).length !== 0) {
            let message = "";
            let mentions = Object.keys(event.mentions);
            
            for (let id of mentions) {
                try {
                    let name = (await api.getUserInfo(id))[id].name;
                    let reasonarr = bans.warns[threadID][id];
                    let msg = (!reasonarr || reasonarr.length === 0) ? "কোনো ওয়ার্নিং নেই।" : reasonarr.map((r, i) => `${i + 1}. ${r}`).join(" | ");
                    message += `» 👤 𝗡𝗮𝗺𝗲: ${name}\n» 📋 𝗪𝗮𝗿𝗻𝘀: ${msg}\n\n`;
                } catch (e) {
                    message += `» 👤 𝗨𝗜𝗗: ${id}\n» 📋 𝗪𝗮𝗿𝗻𝘀: ডাটা পাওয়া যায়নি।\n\n`;
                }
            }
            return sendMsg(message.trim());
        }
        
        // গ্রুপের সবার ওয়ার্নিং লিস্ট একসাথে দেখতে
        else if (args[1] === "all") {
            let dtwbox = bans.warns[threadID];
            let allwarn = "";
            
            for (let idtvw in dtwbox) {
                if (dtwbox[idtvw].length > 0) {
                    try {
                        let name = (await api.getUserInfo(idtvw))[idtvw].name;
                        allwarn += `» 👤 𝗡𝗮𝗺𝗲: ${name} (𝗪𝗮𝗿𝗻𝘀: ${dtwbox[idtvw].length}/3)\n`;
                    } catch (e) {
                        allwarn += `» 👤 𝗨𝗜𝗗: ${idtvw} (𝗪𝗮𝗿𝗻𝘀: ${dtwbox[idtvw].length}/3)\n`;
                    }
                }
            }
            return allwarn === "" ? sendMsg("» ✅ এই গ্রুপের কোনো মেম্বারের ওয়ার্নিং নেই।") : sendMsg(`» 📝 𝗪𝗮𝗿𝗻𝗲𝗱 𝗠𝗲𝗺𝗯𝗲𝗿𝘀:\n${allwarn.trim()}`);
        }
    }

    // ৩. আনব্যান মেকানিজম (Unban)
    else if (args[0] === "unban") {
        if (!isAdmin(senderID)) {
            return sendMsg("» ❌ এই কমান্ডটি শুধু গ্রুপের এডমিন বা বট এডমিনরা ব্যবহার করতে পারবেন।");
        }
        
        let id = args[1];
        let mybox = bans.banned[threadID];
        
        if (!id) return sendMsg("» ⚠️ দয়া করে আনব্যান করার জন্য ইউজারের UID প্রদান করুন।");
        
        let targetID = parseInt(id);
        if (!mybox.includes(targetID)) return sendMsg("» ✅ এই ইউজারটি এই গ্রুপে ব্যান অবস্থায় নেই।");
        
        // রিমুভ ও ডাটা ক্লিনআপ
        mybox.splice(mybox.indexOf(targetID), 1);
        if (bans.warns[threadID].hasOwnProperty(id)) {
            delete bans.warns[threadID][id];
        }
        saveDB();
        return sendMsg(`» ✅ সফলভাবে ইউজার আইডি (ID: ${id}) ব্যান মুক্ত করা হয়েছে।`);
    }

    // ৪. ব্যান লিস্ট (List Ban)
    else if (args[0] === "listban") {
        let mybox = bans.banned[threadID];
        let msg = "";
        
        for (let iduser of mybox) {
            try {
                let name = (await api.getUserInfo(iduser))[iduser].name;
                msg += `» 👤 𝗡𝗮𝗺𝗲: ${name} (${iduser})\n`;
            } catch (e) {
                msg += `» 👤 𝗙𝗕 𝗨𝘀𝗲𝗿 (${iduser})\n`;
            }
        }
        return msg === "" ? sendMsg("» ✅ ব্যান লিস্ট সম্পূর্ণ খালি।") : sendMsg(`» 🚫 𝗕𝗮𝗻𝗻𝗲𝗱 𝗨𝘀𝗲𝗿𝘀:\n${msg.trim()}`);
    }

    // ৫. ডাটা রিসেট (Reset)
    else if (args[0] === "reset") {
        if (!isAdmin(senderID)) {
            return sendMsg("» ❌ এই কমান্ডটি শুধু গ্রুপ এডমিনরা ব্যবহার করতে পারবেন।");
        }
        
        bans.warns[threadID] = {};
        bans.banned[threadID] = [];
        saveDB();
        return sendMsg("» 🔄 এই গ্রুপের সব ওয়ার্নিং এবং ব্যান ডাটা সফলভাবে রিসেট করা হয়েছে।");
    }

    // ৬. মেম্বার ওয়ার্নিং ও অটো ব্যান এক্সিকিউশন (Warn & Auto-Ban)
    else {
        if (!isAdmin(senderID)) {
            return sendMsg("» ❌ মেম্বারদের ওয়ার্নিং দেওয়ার ক্ষমতা শুধু এডমিনদের রয়েছে।");
        }
        
        if (event.type !== "message_reply" && Object.keys(event.mentions).length === 0) {
            return sendMsg("» ⚠️ ওয়ার্নিং দিতে কাউকে মেনশন করুন অথবা তার মেসেজে রিপ্লাই করুন।");
        }
        
        let iduser = [];
        let reason = "কোনো কারণ দর্শানো হয়নি";
        
        // রিপ্লাই মেকানিজম চেক
        if (event.type === "message_reply") {
            iduser.push(event.messageReply.senderID);
            if (args.length > 0) reason = args.join(" ").trim();
        } 
        // মেনশন মেকানিজম চেক
        else if (Object.keys(event.mentions).length !== 0) {
            iduser = Object.keys(event.mentions);
            let message = args.join(" ");
            for (let valuemention of Object.values(event.mentions)) {
                message = message.replace(valuemention, "");
            }
            if (message.trim()) reason = message.replace(/\s+/g, ' ').trim();
        }
        
        let arraytag = [];
        
        for (let iid of iduser) {
            let id = parseInt(iid);
            let nametag;
            try {
                nametag = (await api.getUserInfo(id))[id].name;
            } catch(e) {
                nametag = "Group Member";
            }
            
            arraytag.push({ id: id, tag: nametag });
            
            if (!bans.warns[threadID].hasOwnProperty(id)) {
                bans.warns[threadID][id] = [];
            }
            
            bans.warns[threadID][id].push(reason);
            let currentWarns = bans.warns[threadID][id].length;
            
            // ৩ বার ওয়ার্নিং পূর্ণ হলে অটো-ব্যান এক্সিকিউশন
            if (currentWarns >= 3) {
                try {
                    await api.removeUserFromGroup(id, threadID);
                } catch (e) {
                    // যদি মেম্বার অলরেডি লিভ নেয় বা বট রিমুভ করতে না পারে
                }
                if (!bans.banned[threadID].includes(id)) {
                    bans.banned[threadID].push(id);
                }
                sendMsg(`» 🚫 𝗨𝘀𝗲𝗿 ${nametag} কে ৩ বার ওয়ার্নিং দেওয়ার কারণে গ্রুপ থেকে ব্যান করা হয়েছে!\n» 📋 𝗞𝗮𝗿𝗼𝗻: ${reason}`);
            } else {
                api.sendMessage({
                    body: `───────────────\n» ⚠️ 𝗠𝗲𝗺𝗯𝗲𝗿: ${nametag}\n» 📊 𝗪𝗮𝗿𝗻 𝗖𝗼𝘂𝗻𝘁: ${currentWarns}/3\n» 📋 𝗞𝗮𝗿𝗼𝗻: ${reason}${signature}`,
                    mentions: arraytag
                }, threadID, messageID);
            }
        }
        saveDB();
    }
};
