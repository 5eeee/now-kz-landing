# Техническая документация — NOW KZ Landing

> Репозиторий: [github.com/5eeee/now-kz-landing](https://github.com/5eeee/now-kz-landing)  
> Автор: Владимир Кутомкин

## 1. Назначение

Лендинг оригинальных БАДов из США с адаптивной вёрсткой, анимациями и формой заявки с отправкой в Telegram.

## 2. Стек

HTML5 · CSS3 · Vanilla JavaScript · Node.js (http) · dotenv · Vercel Serverless

## 3. Структура

```
├── index.html          # Лендинг
├── styles.css          # Стили, анимации, адаптив
├── script.js           # Меню, форма, fetch API
├── server.js           # Локальный dev-сервер
├── api/send-lead.js    # Vercel serverless function
├── lib/telegram.js     # Telegram Bot API helper
└── scripts/get-chat-id.js
```

## 4. API

| Метод | Путь | Описание |
|-------|------|----------|
| POST | `/api/send-lead` | Отправка заявки в Telegram |
| OPTIONS | `/api/send-lead` | CORS preflight |

Тело запроса (JSON): имя, телефон, сообщение и др. поля формы.

## 5. Переменные окружения

| Переменная | Описание |
|------------|----------|
| `TELEGRAM_BOT_TOKEN` | Токен бота |
| `TELEGRAM_CHAT_ID` | ID чата для заявок |
| `PORT` | Локальный порт (3000) |

Получить chat ID: `npm run chat-id`

## 6. Локальный запуск

```bash
npm install
cp .env.example .env   # заполните TELEGRAM_*
npm run dev
```

http://localhost:3000

## 7. Деплой на Vercel

1. Import репозитория GitHub
2. Environment Variables: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
3. Deploy — `api/send-lead.js` автоматически станет serverless endpoint

> Статический хостинг без Node **не поддерживает** форму — нужен serverless или свой сервер.

## 8. Frontend

- Адаптивная вёрстка (mobile-first)
- Плавные анимации и scroll-эффекты
- Валидация формы на клиенте
- Fetch POST на `/api/send-lead`
