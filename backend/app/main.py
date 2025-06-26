from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.models import Note
from app.database import SessionLocal, engine
from app.models import Base

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[f"{frontend}"],  # React ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.get("/notes")
def read_notes(db: Session = Depends(get_db)):
    return db.query(Note).all()

@app.post("/notes")
def create_note(content: str, db: Session = Depends(get_db)):
    note = Note(content=content)
    db.add(note)
    db.commit()
    db.refresh(note)
    return note