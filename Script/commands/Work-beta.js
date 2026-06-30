module.exports.config = {
    name: "job",
    version: "1.0.3",
    hasPermssion: 0,
    credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍", 
    description: "Earn money by doing random jobs",
    commandCategory: "Economy",
    usages: "ব্যবহারের নিয়ম: job",
    cooldowns: 5,
    envConfig: {
        cooldownTime: 5000
    }
};

module.exports.languages = {
    "en": {
        "cooldown": "𝗬𝗼𝘂'𝗿𝗲 𝗱𝗼𝗻𝗲, 𝗰𝗼𝗺𝗲 𝗯𝗮𝗰𝗸 𝗹𝗮𝘁𝗲𝗿: %1 𝗺𝗶𝗻𝘂𝘁𝗲(𝘀) %2 𝘀𝗲𝗰𝗼𝗻𝗱(𝘀)."
    }
};

module.exports.handleReply = async ({ event, api, handleReply, Currencies, getText }) => {
    const { threadID, messageID, senderID } = event;
    let data = (await Currencies.getData(senderID)).data || {};

    var coinscn = Math.floor(Math.random() * 401) + 200; 
    var coinsdv = Math.floor(Math.random() * 801) + 200; 
    var coinsmd = Math.floor(Math.random() * 401) + 200; 
    var coinsq = Math.floor(Math.random() * 601) + 200; 
    var coinsdd = Math.floor(Math.random() * 201) + 200; 
    var coinsdd1 = Math.floor(Math.random() * 801) + 200; 

    var rdcn = ['hiring staff', 'hotel administrator', 'at the power plant', 'restaurant chef', 'worker']; 
    var work1 = rdcn[Math.floor(Math.random() * rdcn.length)];   

    var rddv = ['plumber', 'neighbors air conditioner repair', 'multi-level sale', 'flyer distribution', 'shipper', 'computer repair', 'tour guide', 'breastfeeding']; 
    var work2 = rddv[Math.floor(Math.random() * rddv.length)]; 

    var rdmd = ['earn 13 barrels of oil', 'earn 8 barrels of oil', 'earn 9 barrels of oil', 'earn 8 barrels of oil', 'steal the oil', 'take water and pour it into oil and sell it']; 
    var work3 = rdmd[Math.floor(Math.random() * rdmd.length)]; 

    var rdq = ['iron ore', 'gold ore', 'coal ore', 'lead ore', 'copper ore', 'oil ore']; 
    var work4 = rdq[Math.floor(Math.random() * rdq.length)]; 

    var rddd = ['diamond', 'gold', 'coal', 'emerald', 'iron', 'ordinary stone', 'lazy', 'bluestone']; 
    var work5 = rddd[Math.floor(Math.random() * rddd.length)]; 

    var rddd1 = ['vip guest', 'patent', 'stranger', '23-year-old fool', 'stranger', 'patron', '92-year-old tycoon', '12-year-old boyi']; 
    var work6 = rddd1[Math.floor(Math.random() * rddd1.length)];

    var msg = "";
    switch(handleReply.type) {
        case "choosee": {
            const choose = parseInt(event.body);
            if (isNaN(event.body)) {
                return api.sendMessage(
`───────────────
» ⚠️ 𝗣𝗹𝗲𝗮𝘀𝗲 𝗲𝗻𝘁𝗲𝗿 𝗮 𝘃𝗮𝗹𝗶𝗱 𝗻𝘂𝗺𝗯𝗲𝗿!
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
            }
            if (choose > 7 || choose < 1) {
                return api.sendMessage(
`───────────────
» ⚠️ 𝗢𝗽𝘁𝗶𝗼𝗻 𝗶𝘀 𝗻𝗼𝘁 𝗼𝗻 𝘁𝗵𝗲 𝗹𝗶𝘀𝘁!
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
            }

            switch(event.body) {
                case "1": msg = `⚡️ 𝗬𝗼𝘂 𝗮𝗿𝗲 𝘄𝗼𝗿𝗸𝗶𝗻𝗴 ${work1} 𝗶𝗻 𝘁𝗵𝗲 𝗶𝗻𝗱𝘂𝘀𝘁𝗿𝗶𝗮𝗹 𝘇𝗼𝗻𝗲 𝗮𝗻𝗱 𝗲𝗮𝗿𝗻 ${coinscn}$`; Currencies.increaseMoney(senderID, coinscn); break;             
                case "2": msg = `⚡️ 𝗬𝗼𝘂 𝗮𝗿𝗲 𝘄𝗼𝗿𝗸𝗶𝗻𝗴 ${work2} 𝗶𝗻 𝘁𝗵𝗲 𝘀𝗲𝗿𝘃𝗶𝗰𝗲 𝗮𝗿𝗲𝗮 𝗮𝗻𝗱 𝗲𝗮𝗿𝗻 ${coinsdv}$`; Currencies.increaseMoney(senderID, coinsdv); break;
                case "3": msg = `⚡️ 𝗬𝗼𝘂 ${work3} 𝗮𝘁 𝘁𝗵𝗲 𝗼𝗽𝗲𝗻 𝗼𝗶𝗹 𝗮𝗻𝗱 𝘀𝗲𝗹𝗹 ${coinsmd}$`; Currencies.increaseMoney(senderID, coinsmd); break;
                case "4": msg = `⚡️ 𝗬𝗼𝘂 𝗮𝗿𝗲 𝗺𝗶𝗻𝗶𝗻𝗴 ${work4} 𝗮𝗻𝗱 𝗲𝗮𝗿𝗻 ${coinsq}$`; Currencies.increaseMoney(senderID, coinsq); break;
                case "5": msg = `⚡️ 𝗬𝗼𝘂 𝗰𝗮𝗻 𝗱𝗶𝗴 ${work5} 𝗮𝗻𝗱 𝗲𝗮𝗿𝗻 ${coinsdd}$`; Currencies.increaseMoney(senderID, coinsdd); break;
                case "6": msg = `⚡️ 𝗬𝗼𝘂 𝗰𝗵𝗼𝗼𝘀𝗲 ${work6} 𝗮𝗻𝗱 𝗴𝗶𝘃𝗲𝗻 ${coinsdd1}$ 𝗶𝗳 𝘅𝘅𝘅 𝟭 𝗻𝗶𝗴𝗵𝘁, 𝘁𝗵𝗲𝗻 𝘆𝗼𝘂 𝗮𝗴𝗿𝗲𝗲 𝗿𝗶𝗴𝗵𝘁 𝗮𝘄𝗮𝘆 :)))`; Currencies.increaseMoney(senderID, coinsdd1); break;
                case "7": msg = "⚡️ 𝗨𝗽𝗱𝗮𝘁𝗲 𝘀𝗼𝗼𝗻..."; break; 
                default: break;
            }

            api.unsendMessage(handleReply.messageID);
            
            return api.sendMessage(
`───────────────
» ${msg}
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, async () => {
                data.work2Time = Date.now();
                await Currencies.setData(senderID, { data });
            });
        }
    }
};

module.exports.run = async ({ event, api, Currencies, getText }) => {
    const { threadID, messageID, senderID } = event;
    const cooldown = global.configModule[this.config.name].cooldownTime;
    let data = (await Currencies.getData(senderID)).data || {};
    
    if (typeof data !== "undefined" && cooldown - (Date.now() - data.work2Time) > 0) {
        var time = cooldown - (Date.now() - data.work2Time),
            minutes = Math.floor(time / 60000),
            seconds = ((time % 60000) / 1000).toFixed(0); 
        return api.sendMessage(
`───────────────
» ⏳ ${getText("cooldown", minutes, (seconds < 10 ? "0" + seconds : seconds))}
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
    } else {    
        return api.sendMessage(
`───────────────
» 💼 𝗖𝗼𝗶𝗻 𝗘𝗮𝗿𝗻 𝗝𝗼𝗯 𝗖𝗲𝗻𝘁𝗲𝗿

𝟭. 𝘄𝗼𝗿𝗸𝟭
𝟮. 𝘄𝗼𝗿𝗸𝟮
𝟯. 𝘄𝗼𝗿𝗸𝟯
𝟰. 𝘄𝗼𝗿𝗸𝟰
𝟱. 𝘄𝗼𝗿𝗸𝟱
𝟲. 𝘄𝗼𝗿𝗸𝟲
𝟳. 𝗨𝗽𝗱𝗮𝘁𝗲 𝘀𝗼𝗼𝗻...

📥 𝗣𝗹𝗲𝗮𝘀𝗲 𝗿𝗲𝗽𝗹𝘆 𝘁𝗼 𝘁𝗵𝗶𝘀 𝗺𝗲𝘀𝘀𝗮𝗴𝗲 𝗮𝗻𝗱 𝗰𝗵𝗼𝗼𝘀𝗲 𝗮 𝗻𝘂𝗺𝗯𝗲𝗿!
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, (error, info) => {
            data.work2Time = Date.now();
            global.client.handleReply.push({
                type: "choosee",
                name: this.config.name,
                author: senderID,
                messageID: info.messageID
            });
        });
    }
};
