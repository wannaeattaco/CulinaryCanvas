from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.config.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False, default="user")

    recipes = relationship("Recipe", back_populates="author")
    comments = relationship("Comment", back_populates="author", cascade="all, delete")
    ratings = relationship("Rating", back_populates="user", cascade="all, delete")
    favorites = relationship("Favorite", back_populates="user", cascade="all, delete")
    comment_likes = relationship("CommentLike", cascade="all, delete")
