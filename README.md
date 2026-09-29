# 🎓 CampusHub — Smart College Management Platform

CampusHub is a full-stack modern college and campus management web application built with **React (Vite)** on the frontend and **Node.js, Express, MongoDB (Mongoose)** on the backend. It offers student and faculty portals for managing attendance, timetables, assignments, academic results, placement drives, campus events, profile settings, and authentication with OTP password recovery.

---

## 🚀 Key Features

### 👨‍🎓 Student Portal
- **Dashboard Overview**: Quick glance at attendance percentages, pending assignments, upcoming exams, and academic performance.
- **Attendance Tracker**: View personal attendance records, presence percentages, and class attendance statistics.
- **Timetable**: View weekly class schedules organized by day and time slots.
- **Assignment Manager**: Track subject-wise assignments and submission statuses.
- **Placement Opportunities**: Browse job and internship listings from top companies and submit applications directly.
- **Campus Events**: Discover upcoming workshops, hackathons, and seminars with 1-click registration.
- **Academic Results**: Check subject-wise marks, grades, and overall percentage calculated from the database.
- **Smart Settings**: Customize dark mode, font sizes, preferred study times, focus shield, and dual language support (English & Hindi).

### 👨‍🏫 Teacher / Faculty Portal
- **Teacher Dashboard**: Comprehensive controls to manage students and academic activities.
- **Attendance Management**: Mark and update attendance for students by roll number.
- **Timetable Scheduler**: Create, edit, and delete class schedule entries.
- **Assignment Creator**: Post new assignments and update assignment submission statuses.
- **Result Publishing**: Add, update, and manage semester marks and grades for any student.
- **Student Directory**: Search, filter by course and year, add, edit, and remove student accounts.

### 🔐 Authentication & Security
- Role-based login and registration (**Student** & **Teacher**).
- JWT Authentication & bcrypt password hashing.
- Password recovery via **Email OTP verification** (Nodemailer).

---

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router v7, Vite, Vanilla CSS design system.
- **Backend**: Node.js, Express 5, MongoDB Atlas, Mongoose 9.
- **Authentication**: JWT (JSON Web Tokens), Bcryptjs.
- **Email Service**: Nodemailer (Gmail SMTP).

---

## 📁 Project Structure

```
CampusHub/
├── backend/
│   ├── config/
│   ├── controllers/
│   │   ├── applicationController.js
│   │   ├── assignmentController.js
│   │   ├── attendanceController.js
│   │   ├── eventController.js
│   │   ├── eventRegistrationController.js
│   │   ├── examController.js
│   │   ├── placementController.js
│   │   ├── resultController.js
│   │   ├── studentController.js
│   │   └── timetableController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Application.js
│   │   ├── Assignment.js
│   │   ├── Attendance.js
│   │   ├── Event.js
│   │   ├── EventRegistration.js
│   │   ├── Exam.js
│   │   ├── PasswordReset.js
│   │   ├── Placement.js
│   │   ├── Result.js
│   │   ├── Student.js
│   │   └── Timetable.js
│   ├── routes/
│   ├── utils/
│   │   └── sendEmail.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── _redirects
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── Stats.jsx
│   │   │   ├── Placements.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── CTA.jsx
│   │   │   └── Footer.jsx
│   │   ├── layouts/
│   │   │   ├── DashboardLayout.jsx
│   │   │   └── TeacherDashboardLayout.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── VerifyOTP.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Attendance.jsx
│   │   │   ├── Timetable.jsx
│   │   │   ├── Assignments.jsx
│   │   │   ├── StudentPlacements.jsx
│   │   │   ├── StudentEvents.jsx
│   │   │   ├── Results.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── TeacherDashboard.jsx
│   │   │   ├── TeacherAttendance.jsx
│   │   │   └── TeacherResults.jsx
│   │   ├── apiConfig.js
│   │   ├── SettingsContext.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── vercel.json
│   ├── .env.example
│   └── package.json
└── README.md
```

---

## ⚙️ Local Setup & Installation

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB instance

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env from .env.example
cp .env.example .env
```
Fill in your `.env` values:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
JWT_SECRET=your_secret_key
```
Start backend:
```bash
npm start
# Server runs on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env from .env.example
cp .env.example .env
```
Ensure `VITE_API_URL` is set:
```env
VITE_API_URL=http://localhost:5000/api
```
Start frontend:
```bash
npm run dev
# App runs on http://localhost:5173
```

---

## 🌐 Deployment Guide

### Deploy Backend (Render / Railway / Cyclic)
1. Push this repository to GitHub.
2. Create a new **Web Service** on [Render](https://render.com/).
3. Root directory: `backend`.
4. Build Command: `npm install`.
5. Start Command: `node server.js`.
6. Add Environment Variables:
   - `MONGO_URI`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `JWT_SECRET`
   - `PORT`: `5000`

### Deploy Frontend (Vercel / Netlify)
1. Create a new project on [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
2. Root directory: `frontend`.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Add Environment Variable:
   - `VITE_API_URL`: `https://<your-render-backend-url>/api`

---

## 📄 License
ISC License © 2026 CampusHub. Developed by Sachin Kumar.
