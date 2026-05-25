require("dotenv").config();

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error("Добавьте TELEGRAM_BOT_TOKEN в файл .env");
  process.exit(1);
}

async function main() {
  const response = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
  const data = await response.json();

  if (!data.ok) {
    console.error("Ошибка:", data.description);
    process.exit(1);
  }

  if (!data.result.length) {
    console.log("Напишите боту любое сообщение в Telegram и запустите команду снова:");
    console.log("npm run chat-id");
    return;
  }

  const chats = new Map();

  data.result.forEach((update) => {
    const message = update.message || update.edited_message;
    if (!message || !message.chat) return;

    const chat = message.chat;
    chats.set(chat.id, {
      id: chat.id,
      type: chat.type,
      title: chat.title || `${chat.first_name || ""} ${chat.last_name || ""}`.trim(),
      username: chat.username || "",
    });
  });

  console.log("Доступные chat_id:\n");
  chats.forEach((chat) => {
    console.log(`TELEGRAM_CHAT_ID=${chat.id}  // ${chat.type}: ${chat.title || chat.username}`);
  });
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
