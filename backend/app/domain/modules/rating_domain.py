from fastapi import HTTPException, status


def ensure_rating_recipe_exists(recipe):
    if not recipe:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Recipe not found",
        )


def to_rating_summary_response(summary: dict, user_rating):
    return {
        "average_rating": summary["average_rating"],
        "ratings_count": summary["ratings_count"],
        "user_rating": user_rating,
    }
