module.exports.config = {
  name: "acp",
  version: "1.0.1",
  hasPermssion: 2,
  credits: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
  description: "Make friends via Facebook id",
  commandCategory: "bot id",
  usages: "ইউজার আইডি",
  cooldowns: 0
};

module.exports.handleReply = async ({ handleReply, event, api }) => {
  const { author, listRequest } = handleReply;
  if (author != event.senderID) return;
  const args = event.body.replace(/ +/g, " ").toLowerCase().split(" ");
  
  const baseForm = {
    av: api.getCurrentUserID(),
    fb_api_caller_class: "RelayModern"
  };
  
  const success = [];
  const failed = [];
  
  let friendlyName, docId;
  if (args[0] == "add") {
    friendlyName = "FriendingCometFriendRequestConfirmMutation";
    docId = "3147613905362928";
  } else if (args[0] == "del") {
    friendlyName = "FriendingCometFriendRequestDeleteMutation";
    docId = "4108254489275063";
  } else {
    return api.sendMessage("───────────────\n» ⚠️ Please choose <𝗮𝗱𝗱 | 𝗱𝗲𝗹> <𝗻𝘂𝗺𝗲𝗿𝗶𝗰𝗮𝗹 𝗼𝗿𝗱𝗲𝗿 | or \"𝗮𝗹𝗹\">\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍", event.threadID, event.messageID);
  }
  
  let targetIDs = args.slice(1);
  if (args[1] == "all") {
    targetIDs = [];
    const lengthList = listRequest.length;
    for (let i = 1; i <= lengthList; i++) targetIDs.push(i);
  }
  
  const newTargetIDs = [];
  const promiseFriends = [];
  
  for (const stt of targetIDs) {
    const u = listRequest[parseInt(stt) - 1];
    if (!u) {
      failed.push(`𝗦𝗧𝗧 𝗻𝗼𝘁 𝗳𝗼𝘂𝗻𝗱 ${stt}`);
      continue;
    }
    
    const form = {
      ...baseForm,
      fb_api_req_friendly_name: friendlyName,
      doc_id: docId,
      variables: JSON.stringify({
        input: {
          source: "friends_tab",
          actor_id: api.getCurrentUserID(),
          client_mutation_id: Math.round(Math.random() * 19).toString(),
          friend_requester_id: u.node.id
        },
        scale: 3,
        refresh_num: 0
      })
    };
    
    newTargetIDs.push(u);
    promiseFriends.push(api.httpPost("https://www.facebook.com/api/graphql/", form));
  }
  
  const lengthTarget = newTargetIDs.length;
  for (let i = 0; i < lengthTarget; i++) {
    try {
      const friendRequest = await promiseFriends[i];
      if (JSON.parse(friendRequest).errors) {
        failed.push(newTargetIDs[i].node.name);
      } else {
        success.push(newTargetIDs[i].node.name);
      }
    } catch(e) {
      failed.push(newTargetIDs[i].node.name);
    }
  }
  
  const actionType = args[0] == 'add' ? '𝗔𝗖𝗖𝗘𝗣𝗧' : '𝗘𝗥𝗔𝗦𝗘';
  let replyMsg = `───────────────\n» ✅ ${actionType} 𝘀𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹 𝗳𝗼𝗿 ${success.length} 𝗽𝗲𝗼𝗽𝗹𝗲:\n${success.join("\n")}`;
  if (failed.length > 0) {
    replyMsg += `\n\n» ❌ 𝗙𝗮𝗶𝗹𝗲𝗱 𝘄𝗶𝘁𝗵 ${failed.length} 𝗽𝗲𝗼𝗽𝗹𝗲:\n${failed.join("\n")}`;
  }
  replyMsg += `\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`;
  
  api.sendMessage(replyMsg, event.threadID, event.messageID);
};

module.exports.run = async ({ event, api }) => {
  const moment = require("moment-timezone");
  const form = {
    av: api.getCurrentUserID(),
    fb_api_req_friendly_name: "FriendingCometFriendRequestsRootQueryRelayPreloader",
    fb_api_caller_class: "RelayModern",
    doc_id: "4499164963466303",
    variables: JSON.stringify({input: {scale: 3}})
  };
  
  try {
    const response = await api.httpPost("https://www.facebook.com/api/graphql/", form);
    const listRequest = JSON.parse(response).data.viewer.friending_possibilities.edges;
    
    let msg = "";
    let i = 0;
    for (const user of listRequest) {
      i++;
      msg += (`\n${i}. 𝗡𝗮𝗺𝗲: ${user.node.name}`
           + `\n𝗨𝗜𝗗: ${user.node.id}`
           + `\n𝗨𝗿𝗹: ${user.node.url.replace("www.facebook", "fb")}`
           + `\n𝗧𝗶𝗺𝗲: ${moment(user.time * 1000).tz("Asia/Manila").format("DD/MM/YYYY HH:mm:ss")}\n`);
    }
    
    const finalMsg = `───────────────\n» 👥 𝗣𝗲𝗻𝗱𝗶𝗻𝗴 𝗥𝗲𝗾𝘂𝗲𝘀𝘁𝘀:${msg}\n» ℹ️ Reply <𝗮𝗱𝗱 | 𝗱𝗲𝗹> <𝗻𝘂𝗺𝗲𝗿𝗶𝗰 𝗼𝗿𝗱𝗲𝗿 | 𝗮𝗹𝗹>\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍`;
    
    api.sendMessage(finalMsg, event.threadID, (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        listRequest,
        author: event.senderID
      });
    }, event.messageID);
  } catch (error) {
    api.sendMessage("───────────────\n» ❌ 𝗘𝗿𝗿𝗼𝗿 𝗳𝗲𝘁𝗰𝗵𝗶𝗻𝗴 𝗳𝗿𝗶𝗲𝗻𝗱 𝗿𝗲𝗾𝘂𝗲𝘀𝘁𝘀.\n───────────────\n» 👤 𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍", event.threadID, event.messageID);
  }
};
