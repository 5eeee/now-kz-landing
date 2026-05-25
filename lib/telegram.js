function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildLeadMessage({ name, phone, goal }) {
  return [
    "<b>Новая заявка NOW KZ</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> ${escapeHtml(phone)}`,
    `<b>Категория:</b> ${escapeHtml(goal)}`,
    "",
    `<i>${new Date().toLocaleString("ru-RU", { timeZone: "Asia/Almaty" })}</i>`,
  ].join("\n");
}

async function sendTelegramMessage(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Telegram bot is not configured on the server.");
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  const data = await response.json();

  if (!data.ok) {
    throw new Error(data.description || "Telegram API error");
  }

  return data;
}

async function submitLead({ name, phone, goal }) {
  const cleanName = String(name || "").trim();
  const cleanPhone = String(phone || "").trim();
  const cleanGoal = String(goal || "").trim();

  if (!cleanName || !cleanPhone || !cleanGoal) {
    throw new Error("Заполните все поля формы.");
  }

  await sendTelegramMessage(
    buildLeadMessage({ name: cleanName, phone: cleanPhone, goal: cleanGoal })
  );

  return { ok: true };
}

module.exports = {
  submitLead,
};
