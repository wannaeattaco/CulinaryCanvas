from fastapi import HTTPException, status


def ensure_valid_credentials(user, password_valid: bool):
    if not user or not password_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
        )


def build_login_response(access_token: str, user_response: dict):
    return {
        "access_token": access_token,
        "user": user_response,
    }
