from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = f"postgresql://{os.environ.get('db_admin')}:{os.environ.get('db_password')}@{os.environ.get('host')}:{os.environ.get('port')}/{os.environ.get('db_name')}"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)