const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "Magi2",
    version: "5.0.0",
    author: "FARHAN-KHAN & SIYAM",
    role: 0,
    countDown: 5,
    category: "media",
    guide: {
      en: "Premium Auto Reply Video System"
    }
  },

  onStart: async function () {
    const cacheDir = path.join(__dirname, "cache");

    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }

    console.log("✅ MAGI2 READY");
  },

  onChat: async function ({ api, event }) {
    try {
      const body = (event.body || "").trim().toLowerCase();

      if (!body) return;

      // 🎬 VIDEO DATABASE
      const videoMap = [
        {
          key: "কলে আসো",
          link: "https://files.catbox.moe/p8qlso.mp4",
          text: `
╭〔 ☎️ CALL REPLY 〕╮
┃  @Everyone
┃ 📞  সবাই কলে আসো!
┃ 😎  gf bf দেওয়া হবে 🧑‍🍼
╰━━━━━━━━━━━━━━━╯
`
        },

        {
          key: "চিপা থেকে বাহির হও",
          link: "https://files.catbox.moe/atdk5k.mp4",
          text: `
 🤡 FUNNY REPLY
 🐸 চিপায় থাকলে লাভ নাই ভাই
 🚶 বাহির হও
 😂 সবাই  ডাকছে 🙄
`
        },

        {
          key: "রিয়েক্ট দে",
          link: "https://files.catbox.moe/hitsnc.mp4",
          text: `
╭〔 🔥 REACT BOOST 〕╮
┃ ❤️ রিয়েক্ট না দিলে কিক🤪
┃ 😩  প্রতিবন্ধী মেম্বার?
┃ 🖕  দরকার নাই🥴
╰━━━━━━━━━━━━━━━╯
`
        },

        {
          key: "জানু",
          link: "https://files.catbox.moe/k6acls.mp4",
          text: `
তার জন্য নিজেকে তিলে তিলে শেষ করে দেওয়া যেই বেপারটা....!🥺💔😭😅
`
        },

        {
          key: "চুত মারানি",
          link: "https://files.catbox.moe/zdirp4.mp4",
          text: `
╭〔 💀 ATTITUDE MODE 〕╮
┃ 😎 বেশি হাতমারা ভালো  না
┃ 🔥 শান্ত থাকো  না হলে কিন্তু
┃ 🖕 এমন চু*দাচু*দবো
┃ 🥵 ভার্চুয়াল এ মুখ 
┃ 😼 দেখাতে পারবে না🖕🥵
╰━━━━━━━━━━━━━━━━╯
`
        },

        // ✅ UPDATED JUTI LINK
        {
          key: "জুতি",
          link: "https://files.catbox.moe/3sjox4.mp4",
          text: `
হাতের দাগ গুলা না হয় সাক্ষী রইলো তোমায় কতটা ভালোবাসি...!🥺❤️‍🩹
`
        }
      ];

      // 🔍 MATCH COMMAND
      const match = videoMap.find(item =>
        body.includes(item.key.toLowerCase())
      );

      if (!match) return;

      // 📂 CACHE FIX
      const cacheDir = path.join(__dirname, "cache");

      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }

      // 🎥 UNIQUE FILE
      const fileName = `Magi2_${Date.now()}.mp4`;
      const filePath = path.join(cacheDir, fileName);

      // 🎭 RANDOM REACTION
      const reactions = ["💔", "👑", "💀", "😹", "🫶", "😔"];
      const reactEmoji =
        reactions[Math.floor(Math.random() * reactions.length)];

      // ✨ PREMIUM LOADING MESSAGE
      const loadingMsg = `
   👑 𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧 ✡️

📡 𝗩𝗜𝗗𝗘𝗢 𝗜𝗦 𝗟𝗢𝗔𝗗𝗜𝗡𝗚... ⏳
⚡ 𝗣𝗟𝗘𝗔𝗦𝗘 𝗪𝗔𝗜𝗧 𝗔 𝗠𝗢𝗠𝗘𝗡𝗧

      👑 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡 👑
`;

      api.sendMessage(
        loadingMsg,
        event.threadID,
        async (err, info) => {
          if (err) return console.log(err);

          const loadingMsgID = info.messageID;

          // ❤️ REACTION
          try {
            api.setMessageReaction(
              reactEmoji,
              event.messageID,
              () => {},
              true
            );
          } catch (e) {}

          try {
            // 📥 DOWNLOAD VIDEO
            const response = await axios({
              method: "GET",
              url: match.link,
              responseType: "stream",
              timeout: 60000
            });

            // 💾 SAVE FILE
            const writer = fs.createWriteStream(filePath);

            response.data.pipe(writer);

            writer.on("finish", async () => {
              try {
                // ❌ REMOVE LOADING
                api.unsendMessage(loadingMsgID);

                // 📤 SEND VIDEO
                await api.sendMessage(
                  {
                    body: `${match.text}

  👑𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑
 🎬 HIGH QUALITY RESPONSE
 👑 POWERED BY SIYAM

`,
                    attachment: fs.createReadStream(filePath)
                  },
                  event.threadID
                );

                // 🗑️ DELETE CACHE
                fs.unlink(filePath, () => {});
              } catch (sendErr) {
                console.log(sendErr);

                api.sendMessage(
                  "❌ ভিডিও পাঠাতে সমস্যা হয়েছে",
                  event.threadID
                );
              }
            });

            writer.on("error", async err => {
              console.log(err);

              api.unsendMessage(loadingMsgID);

              api.sendMessage(
                "❌ ভিডিও প্রসেস করতে সমস্যা হয়েছে",
                event.threadID
              );

              if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
              }
            });

          } catch (downloadErr) {
            console.log(downloadErr);

            api.unsendMessage(loadingMsgID);

            api.sendMessage(
              "❌ সার্ভার থেকে ভিডিও আনতে সমস্যা হয়েছে",
              event.threadID
            );
          }
        }
      );

    } catch (error) {
      console.log(error);

      api.sendMessage(
        "❌ Unexpected Error হয়েছে",
        event.threadID
      );
    }
  }
};
