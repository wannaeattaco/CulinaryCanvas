from app.core.security import create_access_token, verify_password
from app.data.repositories import user_repository
from app.domain.modules import auth_domain, user_domain


def login_user(db, username: str, password: str):
    user = user_repository.get_by_username(db, username)
    auth_domain.ensure_valid_credentials(user, verify_password(password, user.password) if user else False)
    token = create_access_token({"sub": str(user.id), "role": user.role})
    return auth_domain.build_login_response(token, user_domain.to_user_response(user))
