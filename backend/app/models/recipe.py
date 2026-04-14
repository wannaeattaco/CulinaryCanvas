from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.config.database import Base


class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    ingredients = Column(String, nullable=False)
    steps = Column(String, nullable=False)
    category = Column(String, nullable=False, index=True)
    image_url = Column(String, nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)

    author = relationship("User", back_populates="recipes")
    comments = relationship("Comment", back_populates="recipe", cascade="all, delete")
    ratings = relationship("Rating", back_populates="recipe", cascade="all, delete")
    favorites = relationship("Favorite", back_populates="recipe", cascade="all, delete")
