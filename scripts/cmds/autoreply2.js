module.exports = {
  config: {
    name: "autoreply2",
    version: "3.0",
    author: "siyam",
    description: "Premium emoji-based rotating auto reply system"
  },

  // 👤 per-user memory system
  userState: new Map(),

  onStart: async function () {},

  onChat: async function ({ message, event }) {
    const text = event.body;
    if (!text) return;

    // =========================
    // 🎯 TRIGGER EMOJIS
    // =========================
    const emojis = ["✡️", "🔐", "🔮", "🪬", "🚬"];
    const isTrigger = emojis.some(e => text.includes(e));
    if (!isTrigger) return;

    const userID = event.senderID;

    // =========================
    // 💎 30+ PREMIUM REPLIES
    // =========================
    const replies = [
      "🌙✨ আসসালামু আলাইকুম 🤍 কেমন আছেন আপনি?",
      "💫 আমি ভালো নাই 😌 আপনি কেমন আছেন?",
      "😏 বেবি কোথায় ছিলে এতক্ষণ? miss করছিলাম...",
      "💖 ওহ জানু… তুমি আসলে কোথায় হারিয়ে গেছিলে?",
      "🌌 তোমার presence detect করা গেছে আবার 😌",
      "🪬 তুমি আসলে chat এর vibe change করে দাও ✨",
      "💬 কেমন আছো বলো তো জান?",
      "😌 আমি তো তোমার অপেক্ষায় ছিলাম...",
      "💖 উম্মাহ 😘 ভালোবাসা তোমার জন্য",
      "🌙 রাতের মতো শান্ত তুমি আবার ফিরে এলে",
      "🔥 কিরে তুই কোথায় ছিলি এতক্ষণ? 😏",
      "💫 তুমি আসলেই একটা interesting মানুষ",
      "🧿 তোমার energy আলাদা vibe দিচ্ছে",
      "😏 বেবি আবার হাজির… welcome back",
      "💖 জানু কই ছিলে? mood off করছিলা নাকি?",
      "🌌 universe আবার তোমাকে connect করলো",
      "💬 কেমন আছেন আপনি? একটু বলুন না",
      "😌 তুমি আসলেই একটা soft vibe",
      "🔥 চিপামো স্টাইল আবার শুরু করলা নাকি 😏",
      "💫 তুমি না আসলে chat boring লাগে",
      "💖 তোমার সাথে কথা বলতে ভালো লাগে 😌",
      "🌙 আসসালামু আলাইকুম জানু 🤍",
      "😏 কোথায় গেছিলে, আমাকে ছাড়া?",
      "💬 তুমি আসলে missing piece 😌",
      "🪬 vibe check complete ✔️",
      "💖 উম্মাহ জানু 😘",
      "🔥 আবার তুমি… interesting timing 😏",
      "💫 তোমার presence special মনে হচ্ছে",
      "🌌 chat এ তুমি ঢুকলেই vibe change হয়",
      "😌 ভালো আছো তো? বলো দেখি",
      "💖 তুমি আসলে chat এর main attraction 😏",
      "🌙 আবার চলে এসেছো… nice to see you"
    ];

    // =========================
    // 🔁 USER ROTATION SYSTEM
    // =========================
    let index = this.userState.get(userID) || 0;

    const reply = replies[index];

    index = (index + 1) % replies.length;

    this.userState.set(userID, index);

    // =========================
    // 💥 RANDOM REACTION
    // =========================
    const reactions = ["✡️", "🪬", "🚬"];
    const react = reactions[Math.floor(Math.random() * reactions.length)];

    // =========================
    // 📩 SEND RESPONSE
    // =========================
    await message.reply("💎 " + reply);

    if (message.react) {
      message.react(react);
    }
  }
};
