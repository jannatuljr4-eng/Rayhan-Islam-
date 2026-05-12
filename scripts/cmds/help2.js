const axios = require("axios");

module.exports = {
  config: {
    name: "help2",
    version: "3.0.0",
    author: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Show all commands"
    },
    longDescription: {
      en: "Display command list and usage"
    },
    category: "info",
    guide: {
      en: "{pn}help2 / {pn}help2 <command>"
    }
  },

  onStart: async function ({ message, args, event, role }) {
    const prefix = global.GoatBot.config.prefix;
    const groupName = event.threadName || "UNKNOWN GROUP";

    const mediaLinks = [
      "https://files.catbox.moe/41hfau.jpg",
      "https://files.catbox.moe/81i9c7.jpg",
      "https://files.catbox.moe/3hhite.jpg"
    ];

    // 🔁 IMAGE ROTATION SYSTEM
    global.help2Index = global.help2Index || 0;
    const currentIndex = global.help2Index;
    global.help2Index = (global.help2Index + 1) % mediaLinks.length;

    const { commands, aliases } = global.GoatBot;

    // 🔥 MAIN MENU
    if (!args[0]) {
      let msg = `
✡️┏━★━━━━━━━━★━┓✡️

👑 ╭─❖ GROUP ❖─╮
   ╰➤ 『${groupName}』

⚙️ ╭─❖ PREFIX ❖─╮
   ╰➤ 『${prefix}』

🔮 ╭─❖ COMMAND ❖─╮
   ╰➤ 『${prefix}help2』

✡️┗━★━━━━━━━━★━┛✡️
`;

      const categories = {};

      for (const [name, cmd] of commands) {
        if (!cmd.config || cmd.config.role > role) continue;

        const category = (cmd.config.category || "OTHER").toUpperCase();
        if (!categories[category]) categories[category] = [];

        categories[category].push(name);
      }

      for (const cat of Object.keys(categories).sort()) {
        msg += `
╭━━━❖ 『 ${cat} 』 ❖━━━╮
`;
        for (const name of categories[cat].sort()) {
          msg += `┃ ✡️ ${name}\n`;
        }
        msg += `╰━━━━━━━━━━━━━━━╯\n`;
      }

      const total = Object.values(categories).reduce((a, b) => a + b.length, 0);

      msg += `
✡️┏━★━━━━━━━━★━┓✡️

📊 ╭─❖ TOTAL COMMAND ❖─╮
   ╰➤ 『${total}』

📖 ╭─❖ HOW TO USE ❖─╮
   ╰➤ 『${prefix}help2 <command>』

🌐 ╭─❖ FACEBOOK ❖─╮
   ╰➤ 『https://www.facebook.com/share/18K1jti9xb/』

👑 ╭─❖ OWNER ❖─╮
   ╰➤『𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍』

┗━★━━━━━━━━★━┛
`;

      try {
        const randomLink = mediaLinks[currentIndex];
        const stream = await axios.get(randomLink, { responseType: "stream" }).then(res => res.data);

        return message.reply({
          body: msg,
          attachment: stream
        });

      } catch (e) {
        return message.reply(msg);
      }
    }

    // 🔍 COMMAND INFO
    const cmdName = args[0].toLowerCase();
    const cmd = commands.get(cmdName) || commands.get(aliases.get(cmdName));

    if (!cmd) {
      return message.reply(`❌ Command "${cmdName}" not found`);
    }

    const cfg = cmd.config;

    const roleText =
      cfg.role == 0 ? "All Users" :
      cfg.role == 1 ? "Group Admin" :
      cfg.role == 2 ? "Bot Admin" : "Unknown";

    const usage = (cfg.guide?.en || "No guide")
      .replace(/{pn}/g, prefix)
      .replace(/{n}/g, cfg.name);

    const info = `
✡️┏━★━━━━━━━━★━┓✡️

👑 ╭─❖ COMMAND ❖─╮
   ╰➤ 『${cfg.name}』

📂 ╭─❖ CATEGORY ❖─╮
   ╰➤ 『${cfg.category}』

📜 ╭─❖ DESCRIPTION ❖─╮
   ╰➤ 『${cfg.longDescription?.en || "No description"}』

⚙️ ╭─❖ GUIDE ❖─╮
   ╰➤ 『${usage}』

🔐 ╭─❖ PERMISSION ❖─╮
   ╰➤ 『${roleText}』

🔄 ╭─❖ VERSION ❖─╮
   ╰➤ 『${cfg.version}』

👑 ╭─❖ AUTHOR ❖─╮
   ╰➤ 『${cfg.author}』

┗━★━━━━━━━━★━┛
`;

    return message.reply(info);
  }
};
