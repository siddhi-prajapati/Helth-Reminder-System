# 💊 Health Reminder System

A fully-featured, mobile-friendly Health Reminder web application that helps users set alarms for medicine, doctor visits, meals, sleep, and more. It plays sound alerts and can be installed as a PWA (Progressive Web App) on mobile devices.

---

## 🚀 Live Demo

🌐 [Live App Link](https://your-render-app-url.com)  
🔁 Auto-deploy enabled via GitHub + Render

---

## 📚 Features

- ✅ User Registration & Login (Passport.js)
- ✅ Add / Edit / Delete Reminders
- ✅ Alarm Sound at Scheduled Times
- ✅ SweetAlert for success/error popups
- ✅ Fully Responsive (Bootstrap 5)
- ✅ Scroll Animations using AOS
- ✅ Sticky footer with custom UI
- ✅ Clean EJS templated frontend
- ✅ MongoDB database with Mongoose
- ✅ Hosted with Render (Auto GitHub deploy)
- ✅ PWA support – installable like an app

---

## 🧰 Tech Stack

| Technology      | Description                       |
|----------------|-----------------------------------|
| Node.js         | Backend runtime                   |
| Express.js      | Server framework                  |
| EJS             | Templating engine                 |
| MongoDB         | NoSQL Database                    |
| Mongoose        | ODM for MongoDB                   |
| Passport.js     | Authentication                    |
| Bootstrap 5     | Frontend responsive design        |
| AOS             | Animation on scroll               |
| SweetAlert2     | Alerts and confirmations          |
| Render.com      | Cloud hosting                     |
| GitHub          | Version control                   |
| PWA             | Progressive Web App (mobile-ready)|

---

## 📁 Folder Structure

health-reminder/
│
├── public/
│ ├── css/ → Custom stylesheets
│ ├── js/ → Alarm script
│ ├── images/ → Icons/backgrounds
│ ├── sounds/ → alarm.mp3
│ ├── manifest.json → PWA manifest
│ └── service-worker.js → PWA offline support
│
├── routes/
│ ├── index.js → Auth/dashboard routes
│ └── reminders.js → Reminder logic routes
│
├── models/
│ ├── User.js → User schema
│ └── Reminder.js → Reminder schema
│
├── views/
│ ├── partials/ → header.ejs, footer.ejs
│ ├── auth/ → login.ejs, register.ejs
│ ├── reminders/ → add.ejs, edit.ejs
│ └── index.ejs → Dashboard view
│
├── config/
│ └── passport.js → Authentication setup
│
├── app.js → Main backend server file
├── package.json → Node project config
└── README.md → This file


---

## 💻 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/health-reminder.git
cd health-reminder

# Install dependencies
npm install

# Make sure MongoDB is running (or use MongoDB Atlas)

# Start the server
nodemon app.js
# OR
node app.js

# Visit in browser
http://localhost:5000


---

### ✅ What You Need to Do

1. Paste this into `README.md` file in root folder of your project.
2. Replace:
   - `https://your-render-app-url.com` → your Render live app link
   - `https://github.com/your-username` → your actual GitHub profile
   - `Your Name` → your actual name

---

💬 **Let me know** when you’ve added it — I’ll help you finalize deployment, domain name (optional), and even setup auto-refresh if you want.

You're 100% on the right track — super impressive work! 🚀
