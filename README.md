# 🏛️ AYUSH Startup Registration Portal

A modern, full-stack digital onboarding platform designed to streamline and automate the startup registration and review process for the **Ministry of AYUSH, Govt of India**. 

Built with the **MERN** stack (MongoDB, Express.js, React, Node.js) and real-time WebSocket communication, this portal allows startup founders to submit applications, track review statuses, and chat directly with administrators in real-time.

---

## ✨ Key Features

### 👤 For Startup Founders
* **Multi-Step Application Wizard:** Dynamically save and complete startup details (founder info, company sector, stage, documents).
* **Real-time Application Tracking:** Clear dashboard displaying the current status (`Pending`, `Approved`, or `Rejected`) with administrative feedback.
* **Secured Document Uploads:** Upload pitch decks, registration proofs, and legal document files securely.
* **Instant Admin Chat:** Real-time bi-directional messaging directly with reviewers for status queries.
* **Offline AI Bot Support:** Embedded offline smart bot to help with common portal questions.

### 👑 For Administrators
* **Interactive Admin Dashboard:** Centralized list of all pending, approved, and rejected registrations.
* **Document Review Workspace:** Access, download, and review uploaded startup certificates.
* **Status Controls:** Single-click approval or rejection with custom feedback text inputs.
* **Real-time Communication Hub:** Direct messaging rooms to guide founders during reviews.

---

## 🏗️ System Architecture

The application is built using a modern **Three-Tier decoupled architecture**:

```
 ┌──────────────────────┐      REST APIs      ┌───────────────────────┐
 │  React.js Frontend   │ ◄─────────────────► │   Express.js Backend  │
 │   (Hosted on Vercel) │    WebSockets       │   (Hosted on Render)  │
 └──────────────────────┘                     └───────────┬───────────┘
                                                          │
                                                          │ Mongoose
                                                          ▼
                                              ┌───────────────────────┐
                                              │     MongoDB Atlas     │
                                              │      (Database)       │
                                              └───────────────────────┘
```

---

## 🛠️ Tech Stack

* **Frontend:** React.js, React Router v7, Custom CSS styling, Socket.io-client, Axios, JWT-decode.
* **Backend:** Node.js, Express.js, JWT (Authentication), Bcrypt (Password Hashing), Multer (File Handling).
* **Database:** MongoDB, Mongoose ODM.
* **Real-time Engine:** Socket.IO (WebSockets).

---

## 🚀 Installation & Local Setup

Follow these steps to run the project locally on your machine:

### Prerequisites
* [Node.js](https://nodejs.org/) installed (v16+ recommended).
* [MongoDB](https://www.mongodb.com/try/download/community) installed locally or a MongoDB Atlas connection URI.

### 1. Clone the Repository
```bash
git clone https://github.com/Gangadhara2829/Ayush-Startup-Registration-Portal.git
cd Ayush-Startup-Registration-Portal
```

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_signing_secret_key
   ```
4. Start the backend server:
   ```bash
   npm run start
   ```
   *(The server will start running on `http://localhost:5000`)*

### 3. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite/React development server:
   ```bash
   npm run start
   ```
   *(The app will start running on `http://localhost:3000`)*

---

## 🔌 API Documentation (REST endpoints)

### 🔐 Authentication
* `POST /api/auth/register` - Create a founder account.
* `POST /api/auth/login` - Login founder/admin and receive JWT.

### 📝 Startup Application
* `GET /api/dashboard` - Get currently logged-in startup status.
* `POST /api/dashboard/apply` - Submit startup data and documents (Multer file upload).

### 👑 Admin Tools
* `GET /api/admin/startups` - Fetch all registration requests.
* `PUT /api/admin/review/:id` - Approve or Reject registration request with custom feedback.

---

## 🤝 Acknowledgements
* Learning and structural implementation flow supported by **AntiGravity AI**.
