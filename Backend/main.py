from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import Ticket
from schemas import TicketCreate, TicketUpdate
from datetime import datetime

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database Connection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Home Route
@app.get("/")
def home():
    return {"message": "Support CRM API Running Successfully"}


# Create Ticket
@app.post("/api/tickets")
def create_ticket(ticket: TicketCreate, db: Session = Depends(get_db)):

    total = db.query(Ticket).count() + 1

    ticket_id = f"TKT-{str(total).zfill(3)}"

    new_ticket = Ticket(
        ticket_id=ticket_id,
        customer_name=ticket.customer_name,
        customer_email=ticket.customer_email,
        subject=ticket.subject,
        description=ticket.description,
        status="Open"
    )

    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)

    return {
        "ticket_id": ticket_id,
        "created_at": new_ticket.created_at
    }


# Get All Tickets
@app.get("/api/tickets")
def get_tickets(
    search: str = "",
    status: str = "",
    db: Session = Depends(get_db)
):

    query = db.query(Ticket)

    if status:
        query = query.filter(Ticket.status == status)

    if search:
        query = query.filter(
            Ticket.customer_name.contains(search) |
            Ticket.customer_email.contains(search) |
            Ticket.subject.contains(search) |
            Ticket.description.contains(search)
        )

    tickets = query.all()

    return tickets


# Get Single Ticket
@app.get("/api/tickets/{ticket_id}")
def get_ticket(ticket_id: str, db: Session = Depends(get_db)):

    ticket = db.query(Ticket).filter(
        Ticket.ticket_id == ticket_id
    ).first()

    return ticket


# Update Ticket
@app.put("/api/tickets/{ticket_id}")
def update_ticket(
    ticket_id: str,
    update: TicketUpdate,
    db: Session = Depends(get_db)
):

    ticket = db.query(Ticket).filter(
        Ticket.ticket_id == ticket_id
    ).first()

    ticket.status = update.status
    ticket.notes = update.notes
    ticket.updated_at = datetime.utcnow()

    db.commit()

    return {
        "success": True,
        "updated_at": ticket.updated_at
    }