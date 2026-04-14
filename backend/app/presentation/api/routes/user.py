from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.application.services import auth_service, user_service
from app.config.database import get_db
from app.core.deps import get_current_user
from app.schemas.user import UserCreate, UserLogin, UserOut

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    return user_service.register_user(db, user)


@router.post("/login")
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    return auth_service.login_user(db, credentials.username, credentials.password)


@router.get("/me", response_model=UserOut)
def get_me(current_user=Depends(get_current_user)):
    return current_user
