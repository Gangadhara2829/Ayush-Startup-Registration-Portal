# AYUSH Startup Registration Portal

A centralized, secure, and scalable web application designed to digitize and streamline the startup registration process in the AYUSH sector. The portal enables guided compliance, secure authentication, AI-powered document verification, and real-time application tracking.

🔗 **Live Website:** https://ayush-registration-portal-ju7n.vercel.app/login  
🔗 **Backend API:** https://ayush-portal-backend.onrender.com  

---

## 🚀 Key Features

### 🔐 Authentication & Authorization
- Google OAuth login
- JWT-based authentication
- Role-based access (Startup / Official / Admin)

### 📝 Startup Registration
- Guided multi-step registration workflow
- Auto-validation of required fields
- Document upload with AI-powered verification
- Real-time registration status tracking

### 🧑‍💼 Admin & Official Panel
- Review startup applications
- Approve, reject, or request additional information
- Compliance status tracking
- Dashboard with analytics and insights

---

## 📡 Backend Features
- RESTful API using Node.js and Express
- MongoDB Atlas database
- Secure password hashing with bcrypt
- Input validation and error handling
- CORS protection for secure communication

---

## 🎨 Frontend Features
- Built with React.js and modern UI components
- Fully responsive design (Mobile, Tablet, Desktop)
- Reusable components with clean UI architecture
- Toast notifications for success and error messages

---

## 🛠 Tech Stack

### Frontend
- React.js
- Axios
- React Router
- Google OAuth API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📂 Project Structure

ayush-registration-portal/
│
├── backend/
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ ├── server.js
│ ├── package.json
│ └── .env (not included)
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ └── App.js
│ ├── package.json
│ └── .env
│
├── package.json
└── README.md


---

## ⚙️ Environment Variables

### 🔧 Frontend (.env)
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_BACKEND_URL=https://ayush-portal-backend.onrender.com


### 🔧 Backend (.env)
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GEMINI_API_KEY=your_gemini_api_key


---

## 🏗️ How to Run Locally

1️⃣ Clone the repository  
git clone https://github.com/Gangadhara2829/ayush-registration-portal.git
cd ayush-registration-portal


2️⃣ Install dependencies  

**Backend**
cd backend
npm install


**Frontend**
cd ../frontend
npm install


3️⃣ Start the servers  

**Backend**
npm start


**Frontend**
npm start


- Frontend → http://localhost:3000  
- Backend → http://localhost:5000  

---

## 🔌 API Endpoints Overview

### Authentication
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /api/auth/login | Login using email/password |
| POST | /api/auth/google | Google OAuth login |
| GET  | /api/auth/me | Get logged-in user details |

### Startup Registration
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /api/startup/register | Register a new startup |
| GET  | /api/startup/status/:id | Track application status |

---

## 🔒 Security Features
- HTTPS enabled
- Encrypted passwords
- JWT-based authentication
- CORS protection
- Environment variable-based secrets

---

## 🙌 Contribution Guidelines
Pull requests are welcome. Please open an issue before making major changes.

---

## ⭐ Support
If you find this project useful, consider giving it a ⭐ on GitHub!
🔥 WHY THIS VERSION IS PERFECT
✅ Clean headings (recruiters scan fast)
✅ Enterprise keywords (ATS-friendly)
✅ Clear frontend / backend separation
✅ Live links included (BIG PLUS)
✅ Looks industry-level, not student-level

This README alone makes your AYUSH project “INTERVIEW-WORTHY”.
