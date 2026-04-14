from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import inspect, text

from app.config.database import Base, engine
from app.models import Comment, CommentLike, Favorite, Rating, Recipe, User
from app.presentation.api.routes import comment as comment_routes
from app.presentation.api.routes import favorite as favorite_routes
from app.presentation.api.routes import rating as rating_routes
from app.presentation.api.routes import recipe as recipe_routes
from app.presentation.api.routes import user as user_routes

app = FastAPI(title="CulinaryCanvas API")

Base.metadata.create_all(bind=engine)


def ensure_recipe_image_column():
    inspector = inspect(engine)
    if "recipes" not in inspector.get_table_names():
        return

    columns = {column["name"] for column in inspector.get_columns("recipes")}
    if "image_url" in columns:
        return

    with engine.begin() as connection:
        connection.execute(text("ALTER TABLE recipes ADD COLUMN image_url VARCHAR"))


def ensure_comment_parent_column():
    inspector = inspect(engine)
    if "comments" not in inspector.get_table_names():
        return

    columns = {column["name"] for column in inspector.get_columns("comments")}
    if "parent_id" in columns:
        return

    with engine.begin() as connection:
        connection.execute(text("ALTER TABLE comments ADD COLUMN parent_id INTEGER"))


ensure_recipe_image_column()
ensure_comment_parent_column()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "CulinaryCanvas API is running"}


app.include_router(user_routes.router)
app.include_router(recipe_routes.router)
app.include_router(comment_routes.router)
app.include_router(rating_routes.router)
app.include_router(favorite_routes.router)
