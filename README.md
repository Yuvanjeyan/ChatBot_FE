# Chatbot

A full-stack AI chat application with user authentication, persistent conversations, and markdown/code rendering in assistant replies.

## Features

- User registration and login
- JWT-based authentication
- Create, switch, and delete chat conversations
- Send messages to the AI assistant
- Render markdown and code blocks in assistant responses
- Copy code blocks with a one-click button
- Responsive chat layout with a collapsible sidebar on mobile

## Tech Stack

- Frontend: React, React Router, Axios, React Markdown, React Syntax Highlighter
- Backend: Node.js, Express, MongoDB, Mongoose
- AI: OpenAI / Groq SDK support in the server

## Project Structure

- `client/` - React frontend
- `server/` - Express backend and API routes

## Prerequisites

- Node.js 18+ recommended
- MongoDB connection string
- API key or model credentials required by the server

## Setup

### 1. Install dependencies

Run this in both folders:

```bash
npm install
```

### 2. Configure the server

Create a `.env` file inside `server/` with the values required by your backend, for example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
GROQ_API_KEY=your_groq_key
```

Only include the keys your server actually uses.

### 3. Start the backend

```bash
cd server
npm start
```

If your server file is run directly with Node, this should expose the API on the port from `.env`.

### 4. Start the frontend

```bash
cd client
npm start
```

The app will open at `http://localhost:3000`.

## API Endpoints

The frontend currently talks to these backend routes:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/chat`
- `POST /api/chat/new`
- `POST /api/chat/:id/message`
- `DELETE /api/chat/:id`

## Notes

- The frontend stores the JWT token and user profile in `localStorage`.
- Assistant messages support markdown and fenced code blocks.
- Copy buttons appear automatically above rendered code blocks.

## Available Scripts

Inside `client/`:

- `npm start` - run the app in development mode
- `npm test` - launch the test runner
- `npm run build` - create a production build
- `npm run eject` - eject from Create React App

Inside `server/`, the current package only defines a placeholder `test` script. Add start/dev scripts there if you want a one-command backend workflow.

## Future Improvements

- Add a top-level README at the repo root for easier onboarding
- Add backend start scripts and a shared root script for running both apps
- Document the expected response format for chat messages
