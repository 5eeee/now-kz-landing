const { submitLead } = require("../lib/telegram");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    await submitLead(body);
    return res.status(200).json({ ok: true });
  } catch (error) {
    const status = error.message === "Заполните все поля формы." ? 400 : 500;
    return res.status(status).json({
      ok: false,
      error: error.message || "Не удалось отправить заявку.",
    });
  }
};
