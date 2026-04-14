from app.models.user import User


def create(db, user: User):
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def get_by_username(db, username: str):
    return db.query(User).filter(User.username == username).first()


def get_by_id(db, user_id: int):
    return db.query(User).filter(User.id == user_id).first()
