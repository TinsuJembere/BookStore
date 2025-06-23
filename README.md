# Book Store MERN App

A full-stack Book Store application built with the MERN stack (MongoDB, Express, React, Node.js).

## Live Demo

The app is live at: https://book-store-rouge-nine.vercel.app

## Features
- User registration and login (with authentication)
- Browse, search, and view books
- Add books to cart (only for authenticated users)
- Edit user profile (name, email, profile picture)
- Checkout process
- Responsive and modern UI

## Tech Stack
- **Frontend:** React, Redux Toolkit, Tailwind CSS, Vite
- **Backend:** Node.js, Express, MongoDB (Mongoose)

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/your-username/book-store-mern-app.git
cd book-store-mern-app
```

#### 2. Setup Backend
```bash
cd backend
npm install
# Create a .env file with your MongoDB connection string
# Example .env:
# DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/bookstore?retryWrites=true&w=majority
npm start
```

#### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

- The frontend will run on `http://localhost:5173` by default.
- The backend will run on `http://localhost:3000` by default.

## Environment Variables
- Backend: Create a `.env` file in the `backend` directory with your MongoDB connection string as `DB_URL`.

## Folder Structure
```
bookstore/
  backend/
    src/
      Book/
      User/
      middleware/
  frontend/
    src/
      components/
      pages/
      redux/
      routes/
      utils/
```

