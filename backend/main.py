from fastapi import FastAPI
from routes.api import api
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI(
    title="Gestión Tickets API",
    description="API para gestionar tickets de soporte técnico",
    version="1.0.0"
)

app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                   "https://gestion-tickets-frontend.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

