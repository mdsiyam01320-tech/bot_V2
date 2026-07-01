module.exports.config = {
    name: "autosetname",
    version: "1.0.1",
    hasPermssion: 1,
    credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    description: "Automatic setname for new members",
    commandCategory: "Box Chat",
    usages: "[add <name> /remove] ",
    cooldowns: 5
};

module.exports.onLoad = () => {
    const { existsSync, writeFileSync, mkdirSync } = require("fs-extra");
    const { join } = require("path");
    const dirPath = join(__dirname, "cache");
    const pathData = join(dirPath, "autosetname.json");
    if (!existsSync(dirPath)) mkdirSync(dirPath, { recursive: true });
    if (!existsSync(pathData)) writeFileSync(pathData, "[]", "utf-8"); 
};

module.exports.run = async function  ({ event, api, args, Users })  {
    const { threadID, messageID } = event;
    const { readFileSync, writeFileSync } = require("fs-extra");
    const { join } = require("path");

    const pathData = join(__dirname, "cache", "autosetname.json");
    const content = (args.slice(1, args.length)).join(" ");
    let dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
    let thisThread = dataJson.find(item => item.threadID == threadID) || { threadID, nameUser: [] };

    switch (args[0]) {
        case "add": {
            if (content.length == 0) {
                return api.sendMessage(
`───────────────
» ⚠️ 𝗧𝗵𝗲 𝗰𝗼𝗻𝗳𝗶𝗴𝘂𝗿𝗮𝘁𝗶𝗼𝗻 𝗼𝗳 𝘁𝗵𝗲 𝗻𝗲𝘄 𝗺𝗲𝗺𝗯𝗲𝗿'𝘀 𝗻𝗮𝗺𝗲 𝗺𝘂𝘀𝘁 𝗻𝗼𝘁 𝗯𝗲 𝘃𝗮𝗰𝗮𝘁𝗲𝗱!
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
            }
            if (thisThread.nameUser.length > 0) {
                return api.sendMessage(
`───────────────
» ⚠️ 𝗣𝗹𝗲𝗮𝘀𝗲 𝗿𝗲𝗺𝗼𝘃𝗲 𝘁𝗵𝗲 𝗼𝗹𝗱 𝗻𝗮𝗺𝗲 𝗰𝗼𝗻𝗳𝗶𝗴𝘂𝗿𝗮𝘁𝗶𝗼𝗻 𝗯𝗲𝗳𝗼𝗿𝗲 𝗻𝗮𝗺𝗶𝗻𝗴 𝗮 𝗻𝗲𝘄 𝗻𝗮𝗺𝗲!!!
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
            } 
            thisThread.nameUser.push(content);
            const name = (await Users.getData(event.senderID)).name;
            if (!dataJson.some(item => item.threadID == threadID)) dataJson.push(thisThread);
            writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
            return api.sendMessage(
`───────────────
» 📝 𝗖𝗼𝗻𝗳𝗶𝗴𝘂𝗿𝗲 𝗮 𝘀𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹 𝗻𝗲𝘄 𝗺𝗲𝗺𝗯𝗲𝗿 𝗻𝗮𝗺𝗲
» 𝗣𝗿𝗲𝘃𝗶𝗲𝘄: ${content} ${name}
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
        }
        case "rm":
        case "remove":
        case "delete": {
            if (thisThread.nameUser.length == 0) {
                return api.sendMessage(
`───────────────
» ⚠️ 𝗬𝗼𝘂𝗿 𝗴𝗿𝗼𝘂𝗽 𝗵𝗮𝘀𝗻'𝘁 𝗰𝗼𝗻𝗳𝗶𝗴𝘂𝗿𝗲𝗱 𝗮 𝗻𝗲𝘄 𝗺𝗲𝗺𝗯𝗲𝗿'𝘀 𝗻𝗮𝗺𝗲!!
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
            }
            thisThread.nameUser = [];
            dataJson = dataJson.filter(item => item.threadID != threadID);
            writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
            return api.sendMessage(
`───────────────
» 🗑️ 𝗦𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 𝗱𝗲𝗹𝗲𝘁𝗲𝗱 𝘁𝗵𝗲 𝗰𝗼𝗻𝗳𝗶𝗴𝘂𝗿𝗮𝘁𝗶𝗼𝗻 𝗼𝗳 𝗮 𝗻𝗲𝘄 𝗺𝗲𝗺𝗯𝗲𝗿'𝘀 𝗻𝗮𝗺𝗲
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
        }
        default: {
            return api.sendMessage(
`───────────────
» ⚙️ 𝗨𝘀𝗲: 𝗮𝘂𝘁𝗼𝘀𝗲𝘁𝗻𝗮𝗺𝗲 𝗮𝗱𝗱 𝘁𝗼 𝗰𝗼𝗻𝗳𝗶𝗴𝘂𝗿𝗲 𝗮 𝗻𝗶𝗰𝗸𝗻𝗮𝗺𝗲 𝗳𝗼𝗿 𝗮 𝗻𝗲𝘄 𝗺𝗲𝗺𝗯𝗲𝗿
» ⚙️ 𝗨𝘀𝗲: 𝗮𝘂𝘁𝗼𝘀𝗲𝘁𝗻𝗮𝗺𝗲 𝗿𝗲𝗺𝗼𝘃𝗲 𝘁𝗼 𝗿𝗲𝗺𝗼𝘃𝗲 𝘁𝗵𝗲 𝗻𝗶𝗰𝗸𝗻𝗮𝗺𝗲 𝗰𝗼𝗻𝗳𝗶𝗴𝘂𝗿𝗮𝘁𝗶𝗼𝗻
───────────────
» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
        }
    }
};
