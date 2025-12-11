# 🎣 Phishing Simulation & Awareness Platform  
A full-stack phishing awareness application built with **NestJS**, **React**, **MongoDB**, and **Docker Compose**.

This system simulates phishing attacks, tracks user clicks, and provides an admin dashboard for monitoring campaigns.

---

# 🚀 Features

## ▶ Backend (NestJS)
### **Management Service (Port 3001)**
- User registration & login (JWT-based)
- Create phishing attempts
- Trigger email sending
- List all phishing attempts
- Connects to simulation-service via internal Docker networking

### **Simulation Service (Port 3002)**
- Sends phishing emails using SMTP (Gmail or Mailtrap)
- Generates unique click-tracking URLs
- Updates MongoDB when a user clicks the link
- Exposes click endpoint `/phishing/click/:token`

---

## ▶ Frontend (React + NGINX, Port 3000)
- Login / Register UI
- Protected Dashboard
- Create & send phishing attempts
- View all attempts with statuses:
  - **PENDING**
  - **SENT**
  - **CLICKED**
- Clean styling, error handling, and routing

---

# 🏗 System Architecture

┌────────────────┐ POST /auth/login ┌────────────────┐
│ Frontend │ ───────────────────────────▶│ Management API │
│ React + NGINX │◀───────────────────────────│ NestJS (3001) │
└────────────────┘ JSON Responses └──────┬─────────┘
│
│ POST /phishing/send
▼
┌───────────────────────┐
│ Simulation Service │
│ NestJS (3002) │
│ Sends Email + Tracks │
└──────────┬────────────┘
│
▼
┌─────────────────────────┐
│ MongoDB (27017) │
└─────────────────────────┘


---

# 🧰 Technologies

| Layer        | Technology                                   |
|--------------|-----------------------------------------------|
| Frontend     | React, TypeScript, Axios, NGINX               |
| Backend      | NestJS, Mongoose, JWT, Nodemailer             |
| Database     | MongoDB (Docker)                              |
| DevOps       | Docker, Docker Compose                        |

---

# 📦 Project Structure

cymulate-phishing/
management-service/
src/
Dockerfile
simulation-service/
src/
Dockerfile
frontend/
src/
Dockerfile
docker-compose.yml
README.md



# 🐳 Run the Project with Docker (Production Mode)

Make sure Docker is installed and running.

### 1️⃣ Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/cymulate-phishing.git
cd cymulate-phishing

export EMAIL_USER=your-email
export EMAIL_PASS=your-app-password

docker compose up --build

Access the app

Frontend: http://localhost:3000

Management API: http://localhost:3001

Simulation API: http://localhost:3002

MongoDB: localhost:27017