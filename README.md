# 🧇 Waffle Chat App
A **real-time chat application** with user authentication, profile management, theme customization, and live updates of online users.  

🌐 **Live Demo**: [waffle-chat-app.onrender.com](https://waffle-chat-app.onrender.com)  
📂 **GitHub Repo**: [github.com/u3qureshi/waffle-chat-app](https://github.com/u3qureshi/waffle-chat-app)

---

## ✨ Features

- 👤 **User Authentication**
  - Sign up, Login, Logout
  - JWT-based authentication with protected API routes
- 🖊️ **Profile Management**
  - Upload profile pictures (Cloudinary integration)
  - Edit name, username, and personal details
- 💬 **Real-time Messaging**
  - WebSocket-powered chat using **Socket.IO**
  - Live updates of online users
  - Typing indicators (optional enhancement)
- 🖼️ **Image Sharing**
  - Send images in chat with previews
- 🎨 **Themes & Responsive UI**
  - Mobile-first design with Tailwind CSS + DaisyUI
  - Light & Dark mode support
- 🚀 **Deployment**
  - Backend & Frontend deployed on Render

---

## 🛠️ Tech Stack

### 🌐 Frontend
- ⚛️ React (with Hooks)
- Zustand (Lightweight state management)
- Vite (Fast build tool)
- Tailwind CSS + DaisyUI (Modern UI framework)
- Axios (API client)
- React Hot Toast (Toast notifications)

### 🖥 Backend
- Node.js + Express 5
- MongoDB Atlas (Cloud Database)
- Mongoose (ODM)
- Socket.IO (WebSockets)
- Cloudinary API (Image storage)
- JWT (Authentication)
- bcrypt (Password hashing)
- CORS, Cookie-Parser

### ☁️ Deployment
- **Render** (Hosting Backend & Frontend)
- **MongoDB Atlas** (Database)

---

## 📸 Screenshots

| 🖥 Desktop | 📱 Mobile |
|-----------|-----------|
| ![Desktop UI](public/images/desktop-preview.png) | ![Mobile UI](public/images/mobile-preview.png) |

---

## 📦 Run Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/u3qureshi/waffle-chat-app.git
