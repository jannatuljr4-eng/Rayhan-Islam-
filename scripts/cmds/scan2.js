const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "scan2",
    version: "3.4.0",
    author: "Uday Hasan Siam",
    role: 2,
    category: "system",
    shortDescription: {
      en: "Smart full bot audit with video report"
    }
  },

  onStart: async function ({ message }) {

    const commands = global.GoatBot?.commands;

    if (!commands) {
      return message.reply("❌ সিয়াম বস! কোনো কমান্ড সিস্টেম পাওয়া যায়নি");
    }

    const videoUrl = "https://files.catbox.moe/96m226.mp4";
    const filePath = path.join(__dirname, "scan_report.mp4");

    let ok = 0;
    let error = 0;
    let slow = 0;

    let report = [];
    let brokenFiles = [];

    const startTime = Date.now();

    report.push("🔍 সিয়াম বস... স্ক্যান শুরু করা হয়েছে...\n");

    for (const [name, cmd] of commands) {
      const t1 = Date.now();

      try {
        if (!cmd || !cmd.config) throw new Error("Config missing");
        if (typeof cmd.onStart !== "function") throw new Error("onStart missing");

        const time = Date.now() - t1;

        if (time > 250) {
          slow++;
          report.push(`⚠️ স্লো → ${name}`);
        } else {
          ok++;
          report.push(`✅ OK → ${name}`);
        }

      } catch (e) {
        error++;
        brokenFiles.push(name);

        report.push(`❌ ERROR → ${name}`);
        report.push(`👉 ${e.message}`);
      }
    }

    const totalTime = Date.now() - startTime;

    // =========================
    // PANEL ADDED HERE
    // =========================
    const panel = `
╔═══════════════╗
  ‿🪯𝐔𝐃𝐀𝐘 𝐇𝐀𝐒𝐀𝐍🪯  
     🔮 𝐒𝐈𝐘𝐀𝐌🔮
╚═══════════════╝

╭..〔 🤖 ‿𝐁𝐎𝐓 𝐏𝐀𝐍𝐄𝐋〕.. ╮
│ 🤖 ‿𝐁𝐎𝐓 𝐍𝐀𝐌𝐄 ➤ 
│ 🤝 ‿NIJHUM
│ ⚡ ‿𝐏𝐑𝐄𝐅𝐈𝐗 ➤ ,
│ 📦 ‿𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 ➤ ${commands.size}
╰─────────────────╯

╭〔 👤 ‿𝐎𝐖𝐍𝐄𝐑 𝐈𝐍𝐅𝐎 〕╮
│ 👑 ‿𝐍𝐀𝐌𝐄 ➤ ‿𝐔𝐃𝐀𝐘 
│ 🪬 ‿𝐇𝐀𝐒𝐀𝐍 𝐒𝐈𝐘𝐀𝐌
│ 🎂 ‿𝐀𝐆𝐄 ➤ 𝟏𝟕+
│ 📘 ‿𝐒𝐓𝐔𝐃𝐘 ➤ 
│ 📝 ‿𝐂𝐋𝐀𝐒𝐒 𝟏𝟎
│ 🚹 ‿𝐆𝐄𝐍𝐃𝐄𝐑 ➤ 
│ 🕵️ ‿𝐌𝐀𝐋𝐄
│ 💔 ‿𝐒𝐓𝐀𝐓𝐔𝐒 ➤ 
│ 💔 ‿𝐒𝐈𝐍𝐆𝐋𝐄
╰────────────────╯

╭─〔 📍 ‿𝐋𝐎𝐂𝐀𝐓𝐈𝐎𝐍 〕─╮
│ 🏠 ‿𝐃𝐈𝐒𝐓𝐑𝐈𝐂𝐓 ➤ 
│ 🔭 ‿𝐊𝐈𝐒𝐇𝐎𝐑𝐄𝐆𝐀𝐍𝐉
│ 🌍 ‿𝐂𝐎𝐔𝐍𝐓𝐑𝐘 ➤ 
│ 🇧🇩‿𝐁𝐀𝐍𝐆𝐋𝐀𝐃𝐄𝐒𝐇
╰────────────────╯

╭〔 🧬 ‿𝐏𝐄𝐑𝐒𝐎𝐍𝐀𝐋 〕╮
│ 👪 ‿𝐅𝐀𝐌𝐈𝐋𝐘 ➤ 
│ 🥀‿𝐎𝐍𝐋𝐘 𝐒𝐎𝐍 😎
│ 💞 ‿𝐆𝐅 ➤ ‿𝐘𝐄𝐒 
│ ⚜️(𝐍𝐀𝐊𝐀𝐌𝐎 😏)
╰────────────────╯

╭─〔 🎯 ‿𝐇𝐎𝐁𝐁𝐘 〕─╮
│ 🔥 ➤ ‿𝐅𝐑𝐈𝐄𝐍𝐃𝐒 𝐀𝐃𝐃𝐃𝐀
│ 🏍️ ➤ ‿𝐁𝐈𝐊𝐄 𝐑𝐈𝐃𝐄
│ 📱 ➤ ‿𝐌𝐎𝐁𝐈𝐋𝐄 𝐔𝐒𝐄
╰─────────────────╯

╭〔 💋 ‿𝐒𝐏𝐄𝐂𝐈𝐀𝐋 〕╮
│ 😘 ➤ ‿𝐆𝐈𝐑𝐋𝐒 = 𝐔𝐌𝐌𝐀𝐇
╰────────────────╯

╭─〔 🌐 ‿𝐂𝐎𝐍𝐓𝐀𝐂𝐓 〕─╮
│ 🌐 FB ➤ https://www.facebook.com/share/1LDy7c49aK/
│
│
│ 📞 WA ➤ +8801789138157
╰─────────────────╯
`;

    // =========================
    // FINAL REPORT
    // =========================

    let bossNote = error === 0
      ? "✔ সব ঠিক আছে সিয়াম বস 😎"
      : `❌ কিছু সমস্যা পাওয়া গেছে\n👉 ${brokenFiles.join(", ")}`;

    const finalReport = `
${panel}

╔═════════════════╗
 𝘽𝙊𝙎𝙎 𝘽𝙊𝙏 𝙁𝙐𝙇𝙇 𝘼𝙐𝘿𝙄𝙏
╚═════════════════╝

📦 Total Commands: ${commands.size}

✅ OK: ${ok}
❌ ERROR: ${error}
⚠️ SLOW: ${slow}

⏱️ TIME: ${totalTime}ms

🧠 NOTE:
${bossNote}

🔐 STATUS: ${error > 0 ? "NEEDS FIX ❌" : "ALL GOOD ✅"}
`;

    // =========================
    // VIDEO PART (UNCHANGED)
    // =========================

    try {
      const res = await axios({
        url: videoUrl,
        method: "GET",
        responseType: "stream"
      });

      const writer = fs.createWriteStream(filePath);
      res.data.pipe(writer);

      writer.on("finish", async () => {
        await message.reply({
          body: finalReport + "\n  𝆠፝🪯𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍🪯",
          attachment: fs.createReadStream(filePath)
        });

        fs.unlinkSync(filePath);
      });

      writer.on("error", async () => {
        return message.reply(finalReport + "\n⚠️ ভিডিও লোড হয়নি");
      });

    } catch (err) {
      return message.reply(finalReport + "\n⚠️ ভিডিও আনতে সমস্যা হয়েছে");
    }
  }
};
