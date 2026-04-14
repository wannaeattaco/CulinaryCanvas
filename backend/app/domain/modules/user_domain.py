from fastapi import HTTPException, status

ALLOWED_ROLES = {"admin", "contributor", "user"}


def normalize_role(role: str) -> str:
    normalized_role = role.lower()
    if normalized_role not in ALLOWED_ROLES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Role must be admin, contributor, or user",
        )
    return normalized_role


def ensure_username_available(existing_user):
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists",
        )


def to_user_response(user):
    return {
        "id": user.id,
        "username": user.username,
        "role": user.role,
    }
