from app.core.security import hash_password
from app.data.repositories import user_repository
from app.domain.modules import user_domain
from app.models.user import User


def register_user(db, data):
    role = user_domain.normalize_role(data.role)
    existing_user = user_repository.get_by_username(db, data.username)
    user_domain.ensure_username_available(existing_user)

    user = User(
        username=data.username,
        password=hash_password(data.password),
        role=role,
    )
    created_user = user_repository.create(db, user)
    return user_domain.to_user_response(created_user)
