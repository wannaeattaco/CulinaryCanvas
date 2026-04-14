from sqlalchemy import func

from app.models.rating import Rating


def get_for_user(db, recipe_id: int, user_id: int):
    return (
        db.query(Rating)
        .filter(Rating.recipe_id == recipe_id, Rating.user_id == user_id)
        .first()
    )


def upsert(db, recipe_id: int, user_id: int, value: int):
    rating = get_for_user(db, recipe_id, user_id)
    if rating:
        rating.value = value
    else:
        rating = Rating(recipe_id=recipe_id, user_id=user_id, value=value)
        db.add(rating)

    db.commit()
    db.refresh(rating)
    return rating


def get_summary(db, recipe_id: int):
    average_rating, ratings_count = (
        db.query(func.avg(Rating.value), func.count(Rating.id))
        .filter(Rating.recipe_id == recipe_id)
        .one()
    )
    return {
        "average_rating": round(float(average_rating or 0), 1),
        "ratings_count": int(ratings_count or 0),
    }
