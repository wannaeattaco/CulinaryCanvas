from pydantic import BaseModel, Field


class RatingCreate(BaseModel):
    value: int = Field(ge=1, le=5)


class RatingSummary(BaseModel):
    average_rating: float
    ratings_count: int
    user_rating: int | None = None
