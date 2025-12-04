AYUSH Startup Registration Portal
A centralized, secure, and scalable web application for registering startups in the AYUSH sector.
The portal provides guided compliance steps, secure authentication, AI‑powered document verification, real‑time status tracking, and seamless integration with government databases.

🔗 Live Website: https://ayush-registration-portal-ju7n.vercel.app/login
🔗 Backend API: https://ayush-portal-backend.onrender.com

Features
Authentication
Google OAuth Login

JWT‑based authentication

Role‑based access (Startup / Official)

Startup Registration
Guided multi‑step registration process

Auto‑validation of required fields

Document upload & AI‑based verification

Admin & Official Panel
Review startup applications

Track compliance status

Approve, reject, or request more info

Real‑time dashboard with analytics

📡 Backend Features
Node.js + Express REST API

MongoDB Atlas database

Secure password hashing (bcrypt)

Input validation

CORS protection

Frontend
React.js + Modern UI Components

Fully responsive (Mobile, Tablet, Desktop)

Reusable components & clean UI

Toast notifications for errors & success

📁 Project Structure
ayush-registration-portal/
│
├── backend/                 # Node.js + Express REST API
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── server.js
│   ├── package.json
│   └── .env                 # environment variables (not included in repo)
│
├── frontend/                # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.js
│   ├── package.json
│   └── .env
│
├── package.json             # root file for monorepo support
└── README.md
🚀 Tech Stack
Frontend
React.js

Axios

React Router

Google OAuth API

Backend
Node.js

Express.js

Mongoose

JWT

Bcrypt

Database
MongoDB Atlas

Deployment
Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

⚙️ Environment Variables
🔧 Frontend (.env)
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_BACKEND_URL=https://ayush-portal-backend.onrender.com
🔧 Backend (.env)
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GEMINI_API_KEY=your_gemini_api_key
🏗️ How to Run Locally
1️⃣ Clone the Repository
git clone https://github.com/Gangadhara2829/ayush-registration-portal.git
cd ayush-registration-portal
2️⃣ Install dependencies
Backend:
cd backend
npm install
Frontend:
cd ../frontend
npm install
3️⃣ Start the servers
Backend:
npm start
Frontend:
npm start
App runs at:
Frontend → http://localhost:3000

Backend → http://localhost:5000

🛠️ API Endpoints Overview
Auth
Method	Endpoint	Description
POST	/api/auth/login	Login with email/password
POST	/api/auth/google	Google OAuth login
GET	/api/auth/me	Get logged‑in user
Startup Registration
Method	Endpoint	Description
POST	/api/startup/register	Register new startup
GET	/api/startup/status/:id	Track registration status
📊 Admin Features
Dashboard & analytics

Review startup submissions

Approve/Reject applications

Add comments & feedback

Manage users

🔒 Security
HTTPS enabled

Encrypted passwords

JWT authentication

CORS protection

Environment variable based secrets

📸 Screenshots
(You can add images from your repo’s screenshots/ folder)

🙌 Contribution Guidelines
Pull requests are welcome!
Please open an issue before making major changes.

⭐ Support
If you like this project, consider giving it a ⭐ on GitHub!
