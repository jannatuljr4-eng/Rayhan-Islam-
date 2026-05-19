const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const FormData = require("form-data");

module.exports = {
  config: {
    name: "catbox2",
    aliases: ["imgur", "up"],
    version: "5.0",
    author: "𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    countDown: 5,
    role: 0,
    shortDescription: "Upload media to Imgur",
    longDescription: "Reply to image/video/audio/gif to upload",
    category: "tools",
    guide: {
      en: "{pn} reply to media"
    }
  },

  onStart: async function ({ api, event, message }) {

    try {

      const reply = event.messageReply;

      // CHECK REPLY
      if (
        !reply ||
        !reply.attachments ||
        reply.attachments.length === 0
      ) {
        return message.reply(
          "⚠️ | Reply To Image/Video/Audio/Gif"
        );
      }

      const attachment = reply.attachments[0];

      // MEDIA URL
      const fileUrl = attachment.url;

      if (!fileUrl) {
        return message.reply(
          "❌ | Media URL Not Found"
        );
      }

      // REACTION
      api.setMessageReaction(
        "📤",
        event.messageID,
        () => {},
        true
      );

      // LOADING
      const loading = await message.reply(
        "🦅 | Uploading To Imgur Please Wait..."
      );

      // FILE EXTENSION
      let ext = ".jpg";

      switch (attachment.type) {

        case "video":
          ext = ".mp4";
          break;

        case "audio":
          ext = ".mp3";
          break;

        case "animated_image":
          ext = ".gif";
          break;

        case "photo":
          ext = ".jpg";
          break;
      }

      // TEMP FILE
      const tempFile = path.join(
        os.tmpdir(),
        `imgur_${Date.now()}${ext}`
      );

      // DOWNLOAD FILE
      const response = await axios({
        method: "GET",
        url: fileUrl,
        responseType: "arraybuffer",
        timeout: 60000
      });

      // SAVE FILE
      fs.writeFileSync(tempFile, response.data);

      // CHECK FILE
      if (!fs.existsSync(tempFile)) {
        throw new Error("File Download Failed");
      }

      // IMGUR CLIENT ID
      const CLIENT_ID = "546c25a59c58ad7";

      // FORM DATA
      const form = new FormData();

      form.append(
        "image",
        fs.createReadStream(tempFile)
      );

      // UPLOAD TO IMGUR
      const upload = await axios.post(
        "https://api.imgur.com/3/upload",
        form,
        {
          headers: {
            Authorization: `Client-ID ${CLIENT_ID}`,
            ...form.getHeaders()
          },
          maxBodyLength: Infinity,
          maxContentLength: Infinity,
          timeout: 120000
        }
      );

      // DELETE TEMP FILE
      if (fs.existsSync(tempFile)) {
        fs.unlinkSync(tempFile);
      }

      // GET LINK
      const link = upload.data.data.link;

      // CHECK LINK
      if (!link) {
        throw new Error("Imgur Upload Failed");
      }

      // SUCCESS REACTION
      api.setMessageReaction(
        "✅",
        event.messageID,
        () => {},
        true
      );

      // REMOVE LOADING
      try {
        api.unsendMessage(
          loading.messageID
        );
      } catch {}

      // SEND RESULT
      return message.reply(
`╭─❍
│ ✅👑𝆠፝𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍 👑
│ 🔗 ${link}
`
      );

    } catch (err) {

      console.log("IMGUR ERROR:", err);

      // ERROR REACTION
      api.setMessageReaction(
        "❌",
        event.messageID,
        () => {},
        true
      );

      // ERROR MESSAGE
      return message.reply(
`❌ | Upload Failed

📝 Error:
${err.message}`
      );
    }
  }
};
