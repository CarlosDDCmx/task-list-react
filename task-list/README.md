# Task Tracker App

![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white&style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwindcss&logoColor=white&style=flat-square)
![React Router](https://img.shields.io/badge/React_Router-v6-CA4245?logo=reactrouter&logoColor=white&style=flat-square)
![Firebase Auth](https://img.shields.io/badge/Firebase_Auth-9+-FFCA28?logo=firebase&logoColor=white&style=flat-square)
![React Toastify](https://img.shields.io/badge/Toastify-React-1F2937?logo=react&style=flat-square)
![Drag and Drop](https://img.shields.io/badge/Drag_and_Drop-hello--pangea%2Fdnd-5A67D8?style=flat-square)

A responsive Task Tracker web application built with **React**, styled with **Tailwind CSS**, and enhanced with **context-based global state management**, drag-and-drop, local development mode, and notifications.

---

## Features

### Task Management

* Add, edit, delete tasks
* Mark tasks as completed/pending
* View filters: All / Completed / Pending
* Reorder tasks via drag-and-drop (using `@hello-pangea/dnd`)

### Routing

* `/` → Dashboard (requires login)
* `/add-task` → Create task
* `/task/:id` → Edit task
* `/login` → User login
* `/register` → User registration
* `*` → 404 Not Found page

### UI & UX

* Styled entirely with **Tailwind CSS**
* Fully responsive (mobile, tablet, desktop)
* Interactive modals and hover states
* Accessible buttons and form elements

### Notifications

* Custom hook `useNotifications` using `react-toastify`
* Success/error messages on actions like create, update, register

### Confirmation Dialogs

* Global custom confirmation modal using `ConfirmContext`
* Used for critical actions like task deletion

### Development Mode

* Enable local mock login via `.env`:

  ```env
  REACT_APP_USE_DEV_USER=true
  REACT_APP_DEV_EMAIL=test@example.com
  REACT_APP_DEV_PASSWORD=test123
  ```
* Auto-login as a mock user without Firebase authentication
* Displays a dev mode banner

---

## Tech Stack

| Technology        | Purpose                             |
| ----------------- | ----------------------------------- |
| React             | Frontend framework                  |
| React Router      | Client-side routing                 |
| Tailwind CSS      | Styling and responsiveness          |
| React Toastify    | Notifications                       |
| Context API       | Global state (Auth, Tasks, Confirm) |
| Firebase Auth     | (Optional) Authentication backend   |
| @hello-pangea/dnd | Drag and drop for task reordering   |

---

## Setup & Installation

1. **Clone the repo:**

   ```bash
   git clone https://github.com/CarlosDDCmx/task-list-react.git
   cd task-list
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **(Optional) Firebase Auth Setup:**

   If using Firebase, create `src/services/firebase.js` with your config.

4. **Enable local dev mode:**

   Create `.env` in root:

   ```env
   REACT_APP_USE_DEV_USER=true
   REACT_APP_DEV_EMAIL=test@example.com
   REACT_APP_DEV_PASSWORD=test123
   ```

5. **Start the app:**

   ```bash
   npm start
   ```

---

## Project Structure (simplified)

```
src/
├── components/           # UI components (TaskList, TaskCard, Layout, etc.)
├── contexts/             # AuthContext, TaskContext, ConfirmContext
├── hooks/                # useNotifications, etc.
├── pages/                # Login, Register, Dashboard, NotFound
├── services/             # Firebase auth (optional)
├── styles/               # Tailwind config, index.css
├── utils/                # Validators, notifications
├── App.js
└── index.js
```

---

## Testing Local Mode

When `REACT_APP_USE_DEV_USER=true`, Firebase is ignored and a mock user is injected automatically. This allows easy testing without registration or login.

---
