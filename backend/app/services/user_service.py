from fastapi import HTTPException, status

from app.core.security import hash_password
from app.models.user import User
from app.repository import user_repo

ALLOWED_ROLES = {"admin", "contributor", "user"}


def register(db, data):
    role = data.role.lower()
    if role not in ALLOWED_ROLES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Role must be admin, contributor, or user",
        )

    existing_user = user_repo.get_user_by_username(db, data.username)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists",
        )

    user = User(
        username=data.username,
        password=hash_password(data.password),
        role=role,
    )
    return user_repo.create_user(db, user)
