# Support CRM System

A full-stack Customer Support CRM application built using React.js, FastAPI, SQLite, and Tailwind CSS.

## 🚀 Features

- Create support tickets
- Search and filter tickets
- Update ticket status
- Priority management (High, Medium, Low)
- Ticket analytics dashboard
- Responsive user interface
- FastAPI REST API backend
- SQLite database integration

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Icons

### Backend
- FastAPI
- Python
- SQLAlchemy
- SQLite
- Uvicorn

## 📂 Project Structure

```text
support-crm-system/
│
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## ⚙️ Installation

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

API Documentation:

```text
http://127.0.0.1:8000/docs
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## 📊 Dashboard Features

- Ticket creation
- Ticket status updates
- Search functionality
- Status filtering
- Interactive dashboard
- Analytics cards
- Modern responsive UI

---

## 🌐 Deployment

### Frontend
Deployed using Vercel

### Backend
Deployed using Render

---

## 📸 Screenshots

Add screenshots of your dashboard here after deployment.

---

## 👨‍💻 Author

**Shreyash Rane**

Data Analytics & Data Science Graduate

GitHub: https://github.com/shreyash070106

---

## 📄 License

This project is licensed under the MIT License.