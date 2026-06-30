module.exports.config = {
  name: "create",
  version: "1.0.5",
  hasPermssion: 0,
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "Generate AI images using Pollinations AI",
  commandCategory: "Images",
  usages: "create [prompt]",
  cooldowns: 2,
};

module.exports.run = async ({ api, event, args }) => {
  const axios = require('axios');
  const fs = require('fs-extra');
  let { threadID, messageID } = event;
  
  let query = args.join(" ");
  if (!query) return api.sendMessage(`───────────────\n» ⚠️ 𝗣𝗹𝗲𝗮𝘀𝗲 𝗽𝗿𝗼𝘃𝗶𝗱𝗲 𝗮 𝘁𝗲𝗑𝘁 𝘁𝗼 𝗴𝗲𝗻𝗲𝗿𝗮𝘁𝗲 𝗶𝗺𝗮𝗴𝗲\n» 𝗘𝘅𝗮𝗺𝗽𝗹𝗲: ${global.config.PREFIX}𝗰𝗿𝗲𝗮𝘁𝗲 𝗮 𝗰𝘂𝘁𝗲 𝗰𝗮𝘁\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);

  try {
    let path = __dirname + `/cache/poli.png`;
    
    // Generating Image from API
    const poli = (await axios.get(`https://image.pollinations.ai/prompt/${encodeURIComponent(query)}`, {
      responseType: "arraybuffer",
    })).data;
    
    fs.writeFileSync(path, Buffer.from(poli, "utf-8"));
    
    return api.sendMessage({
      body: `───────────────\n» ✨ 𝗦𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 𝗰𝗿𝗲𝗮𝘁𝗲𝗱 𝘆𝗼𝘂𝗿 𝗶𝗺𝗮𝗴𝗲\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`,
      attachment: fs.createReadStream(path)
    }, threadID, () => fs.unlinkSync(path), messageID);

  } catch (error) {
    return api.sendMessage(`───────────────\n» ❌ 𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗿𝗲𝗱: ${error.message}\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`, threadID, messageID);
  }
};
