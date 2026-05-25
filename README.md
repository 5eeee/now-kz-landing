# NOW KZ Landing

Лендинг оригинальных БАДов из США с формой заявки в Telegram.

## Локальный запуск

```bash
cd now-kz-landing
npm install
```

1. Скопируйте `.env.example` в `.env` (если ещё не создан).
2. Напишите вашему Telegram-боту любое сообщение.
3. Получите `chat_id`:

```bash
npm run chat-id
```

4. Вставьте `TELEGRAM_CHAT_ID` в `.env`.
5. Запустите сайт:

```bash
npm run dev
```

Откройте: http://localhost:3000

## Деплой на Vercel (рекомендуется)

1. Залейте проект в GitHub.
2. Импортируйте репозиторий в [Vercel](https://vercel.com).
3. В **Settings → Environment Variables** добавьте:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
4. Задеплойте — форма будет отправлять заявки в Telegram.

> На обычном статическом хостинге без Node/API форма не сможет отправлять заявки. Нужен Vercel или свой сервер с `npm run start`.

## Безопасность

- Токен бота **никогда** не добавляйте в git — только в `.env` или переменные Vercel.
- Если токен был опубликован в чате, перевыпустите его через [@BotFather](https://t.me/BotFather).

## Структура

- `index.html` — страница
- `styles.css` — стили
- `script.js` — меню, анимации, форма
- `api/send-lead.js` — API для Vercel
- `server.js` — локальный сервер
- `lib/telegram.js` — отправка в Telegram
