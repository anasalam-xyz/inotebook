# iNotebook

A simple MERN (MongoDB, Express, React, Node.js) note-taking app with user authentication.  
Users can create, read, update, and delete notes after signing in.

---

### Features

- User authentication with JWT  
- Add, edit, delete, and view notes  
- Frontend built with React (Vite)  
- Backend REST API with Express and MongoDB  

---

---

## Getting Started

### Prerequisites

- Node.js & npm installed  
- MongoDB Atlas account or local MongoDB  

### Installation

1. Clone the repo:

```bash
git clone https://github.com/anasalam-xyz/inotebook.git
cd inotebook
```

2. Install backend dependencies
```bash
cd server
npm install
```

4. Install frontend dependencies
```bash
cd ../client
npm install
```

### Environment Variables

Server :
PORT=port
MONGO_URI=your-db-uri
JWT_SECRET=your-jwt-secret

Client :
VITE_API_URL=backend-url

### Running the App
1. Server :
```bash
cd server
npm run dev
```

2. Client :
```bash
cd client
npm run dev
```

Now open http://localhost:5173/ inn your browser to see the app.

### API Endpoints

- POST /api/auth/createuser → Register a new user

- POST /api/auth/login → Login user and get JWT

- GET /api/notes/all-notes → Get all notes (auth required)

- POST /api/notes/new-note → Add a new note (auth required)

- PUT /api/notes/edit-note/:id → Edit a note (auth required)

- DELETE /api/notes/delete-note/:id → Delete a note (auth required)

---

## Tech Stack

- Frontend: React, Vite
- Backend: Node.js, Express, JWT
- Database: MongoDB

## Contributing

---

1. Fork the repository
2. Create a new branch (git checkout -b feature-name)
3. Make your changes
4. Commit your changes (git commit -m "Description")
5. Push to the branch (git push origin feature-name)
6. Create a Pull Request

---

## License

MIT License
