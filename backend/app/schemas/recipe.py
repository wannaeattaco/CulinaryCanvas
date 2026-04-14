from pydantic import BaseModel, Field


class RecipeCreate(BaseModel):
    title: str = Field(min_length=2, max_length=120)
    description: str = Field(min_length=5, max_length=500)
    ingredients: str = Field(min_length=3)
    steps: str = Field(min_length=3)
    category: str = Field(min_length=2, max_length=60)
    image_url: str = Field(min_length=10)


class RecipeUpdate(BaseModel):
    title: str = Field(min_length=2, max_length=120)
    description: str = Field(min_length=5, max_length=500)
    ingredients: str = Field(min_length=3)
    steps: str = Field(min_length=3)
    category: str = Field(min_length=2, max_length=60)
    image_url: str = Field(min_length=10)


class RecipeOut(BaseModel):
    id: int
    title: str
    description: str
    ingredients: str
    steps: str
    category: str
    image_url: str | None = None
    user_id: int
    average_rating: float
    ratings_count: int
    is_favorite: bool = False
    user_rating: int | None = None

    class Config:
        from_attributes = True
