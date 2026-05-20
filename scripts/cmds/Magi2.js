const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "Mug2",
    version: "3.0.0",
    author: "FARHAN-KHAN & SIYAM",
    countDown: 5,
    role: 0,
    shortDescription: "Premium Auto Video",
    longDescription: "Auto Reply Premium Video System",
    category: "media",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function () {},

  handleEvent: async function ({ api, event }) {
    try {
      if (!event.body) return;

      const body = event.body.toLowerCase();

      // 🎬 AUTO TRIGGER SYSTEM
      const videoMap = [
        {
          key: "কলে আসো",
          link: "https://files.catbox.moe/p8qlso.mp4",
          text: `
╭〔 ☎️ CALL REPLY 〕╮
┃ 📞 সবাই কলে আসো!
┃ 😎 gf bf দেওয়া হবে 🧑‍🍼
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
😂 সবাই ডাকছে 🙄
`
        },

        {
          key: "রিয়েক্ট দে",
          link: "https://files.catbox.moe/hitsnc.mp4",
          text: `
╭〔 🔥 REACT BOOST 〕╮
┃ ❤️ রিয়েক্ট না দিলে কিক🤪
┃ 😩 প্রতিবন্ধী মেম্বার?
┃ 🖕 দরকার নাই🥴
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
┃ 😎 বেশি হাতমারা ভালো না
┃ 🔥 শান্ত থাকো না হলে কিন্তু
┃ 🖕 এমন চু*দাচু*দবো
┃ 🥵 ভার্চুয়াল এ মুখ
┃ 😼 দেখাতে পারবে না🖕🥵
╰━━━━━━━━━━━━━━━━╯
`
        },

        {
          key: "জুতি",
          link: "https://files.catbox.moe/3sjox4.mp4",
          text: `
হাতের দাগ গুলা না হয় সাক্ষী রইলো তোমায় কতটা ভালোবাসি...!🥺❤️‍🩹
`
        }
      ];

      // 🔍 MATCH
      const match = videoMap.find(item =>
        body.includes(item.key)
      );

      if (!match) return;

      // 📂 CACHE
      const cacheDir = path.join(__dirname, "cache");
      await fs.ensureDir(cacheDir);

      const filePath = path.join(
        cacheDir,
        `video_${Date.now()}.mp4`
      );

      // 🎭 RANDOM REACTION
      const reactions = ["💔", "👑", "💀", "😹", "🫶", "😔"];

      const reactEmoji =
        reactions[Math.floor(Math.random() * reactions.length)];

      // ✨ LOADING MESSAGE
      const loading = `
👑 𝗡𝗜𝗝𝗛𝗨𝗠 𝗕𝗢𝗧 ✡️

📡 VIDEO LOADING...

⏳ PLEASE WAIT...

👑 𝗦𝗜𝗬𝗔𝗠 𝗛𝗔𝗦𝗔𝗡 👑
`;

      api.sendMessage(
        loading,
        event.threadID,
        async (err, info) => {
          if (err) return console.log(err);

          const msgID = info.messageID;

          // ❤️ REACTION
          try {
            api.setMessageReaction(
              reactEmoji,
              event.messageID,
              () => {},
              true
            );
          } catch {}

          try {
            // 📥 DOWNLOAD
            const response = await axios({
              url: match.link,
              method: "GET",
              responseType: "stream",
              timeout: 120000
            });

            const writer = fs.createWriteStream(filePath);

            response.data.pipe(writer);

            writer.on("close", async () => {
              try {

                try {
                  api.unsendMessage(msgID);
                } catch {}

                await api.sendMessage(
                  {
                    body: `${match.text}

👑𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑
🎬 HIGH QUALITY RESPONSE
⚡ POWERED BY SIYAM
`,
                    attachment: fs.createReadStream(filePath)
                  },
                  event.threadID
                );

                if (fs.existsSync(filePath)) {
                  fs.unlinkSync(filePath);
                }

              } catch (sendErr) {
                console.log(sendErr);

                api.sendMessage(
                  "❌ ভিডিও পাঠানো যায় নাই",
                  event.threadID
                );
              }
            });

            writer.on("error", async err => {
              console.log(err);

              try {
                api.unsendMessage(msgID);
              } catch {}

              api.sendMessage(
                "❌ ভিডিও প্রসেস error",
                event.threadID
              );

              if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
              }
            });

          } catch (downloadErr) {
            console.log(downloadErr);

            try {
              api.unsendMessage(msgID);
            } catch {}

            api.sendMessage(
              "❌ ভিডিও download fail হয়েছে",
              event.threadID
            );
          }
        }
      );

    } catch (error) {
      console.log(error);

      api.sendMessage(
        "❌ Unexpected Error",
        event.threadID
      );
    }
  }
};
