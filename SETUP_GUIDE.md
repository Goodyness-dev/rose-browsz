# Toby's Auto Mechanic — Production System & Setup Guide

This system is a complete, finished full-stack application with:
1. **High-converting Customer Landing Page & 12-Step Quote Request Wizard**
2. **Dedicated Node 24 + SQLite Backend** (`server/`) with ACID persistence (`server/data/toby.db`)
3. **Protected Admin Dashboard** (`#/admin`) with cryptographic session authentication
4. **Self-Serve Telegram & Email Automation Panel** (so Toby can configure his own credentials privately without you ever asking confidential questions!)
5. **Production Quote Dispatch Studio** (enter price, turnaround time, guarantee, and personal note -> automatically dispatches an official branded HTML quote email to the customer)

---

## 🚀 How to Run the Application

### Option A: Run Both Backend & Frontend in Two Terminals

**Terminal 1 (Backend API & SQLite Server on Port 5001):**
```bash
npm run server
```

**Terminal 2 (Vite Frontend on Port 3000):**
```bash
npm run dev
```

Then visit:
- **Customer Website**: `http://localhost:3000/`
- **Toby's Admin Portal**: `http://localhost:3000/#/admin` (or click "Shop Admin Portal" in the footer)

---

## 🔑 Accessing the Admin Portal

- **Route:** `http://localhost:3000/#/admin`
- **Default Password:** `toby2024`
- Once logged in, Toby can immediately change his password in **Settings & Automations -> Change Admin Password**. The password is encrypted in SQLite using PBKDF2 + SHA-512 cryptographic salts.

---

## 📱 Self-Serve Telegram Automation (Zero Questions Needed)

Toby does not need to give you his credentials. He can configure Telegram himself in **60 seconds** right inside the Admin UI:

1. Log into the Admin Dashboard (`#/admin`).
2. Go to the **Settings & Automations** tab.
3. Under **Telegram Instant Order Alerts**:
   - Open Telegram on phone/desktop.
   - Search for **@BotFather**, send `/newbot`, choose a bot name (e.g. `Toby Auto Alerts`), and copy the **HTTP API Token**.
   - Search for **@userinfobot** on Telegram and tap Start to get the numeric **ID** (Chat ID).
   - Paste the Token and Chat ID into the inputs.
   - Check the **Enable Telegram Alerts** box.
4. Click **"Test Telegram Connection"** — the server immediately sends a confirmation message to Toby's phone!
5. Click **"Save All Settings"**.

From that moment on, whenever a customer requests a quote on the website, Toby's phone will immediately ding with the customer's vehicle, name, phone, service requested, and symptoms.

---

## 📧 Automated Customer Quote Emailing (Production Level)

When Toby is ready to quote a customer:
1. Go to **Orders & Quotes** tab.
2. Click any order row (or click **"Review & Quote"**).
3. The **Quote Dispatch Studio** opens up:
   - **Total Quoted Price:** Enter amount (e.g. `480.00`).
   - **Estimated Turnaround:** Enter completion time (e.g. `Same Day - Ready by 4 PM` or `1-2 Days`).
   - **Warranty Coverage:** Pre-filled with `12-month / 12,000-mile parts & labor warranty` (customizable).
   - **Toby's Personal Message:** Pre-filled with an encouraging customer note, fully editable.
4. Click **"Send Official Quote to Customer"**.
5. The system generates a high-converting, branded HTML email (matching Toby's shop aesthetic) and delivers it directly to the customer's inbox.
6. The order status automatically updates to `Quoted` in SQLite with timestamp and quote history.

### EmailJS Setup (Free Tier — 200 emails/mo):
Toby (or you) can plug the EmailJS credentials into **Settings & Automations**:
1. Sign up at [emailjs.com](https://www.emailjs.com) (free).
2. Connect an email service (Gmail or custom shop domain). Copy **Service ID**.
3. Create 2 templates:
   - **Customer Quote Template:** Sends official estimate back to customer. Copy **Template ID**.
   - **Admin Alert Template:** Alerts Toby when a new order arrives. Copy **Template ID**.
4. Copy **Public Key** from Account Settings.
5. Paste them into the dashboard and click **"Send Test Quote Email"** to verify delivery to your own inbox.

---

## ⚙️ Environment Variables Summary (`.env`)

You can either configure settings in `.env` OR directly inside the Admin Settings UI:

| Variable | Description | Where to Get |
|---|---|---|
| `PORT` | Backend server port (default: `5001`) | Set to `5001` |
| `VITE_API_URL` | Frontend API proxy | `/api` |
| `VITE_ADMIN_PASSWORD` | Default admin password | `toby2024` |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS Service ID | emailjs.com -> Email Services |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS Public Key | emailjs.com -> Account -> Public Key |
| `VITE_EMAILJS_TEMPLATE_ID` | New Order Notification Template | emailjs.com -> Email Templates |
| `VITE_EMAILJS_TEMPLATE_ID_QUOTE` | Customer Quote Response Template | emailjs.com -> Email Templates |
| `VITE_TELEGRAM_BOT_TOKEN` | Telegram Bot HTTP Token | Telegram -> @BotFather |
| `VITE_TELEGRAM_CHAT_ID` | Telegram Numeric Chat ID | Telegram -> @userinfobot |
