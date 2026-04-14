from sqlalchemy import or_

from app.models.recipe import Recipe


def create(db, recipe: Recipe):
    db.add(recipe)
    db.commit()
    db.refresh(recipe)
    return recipe


def list_all(db, query=None, category=None):
    recipe_query = db.query(Recipe)

    if query:
        pattern = f"%{query}%"
        recipe_query = recipe_query.filter(
            or_(
                Recipe.title.ilike(pattern),
                Recipe.description.ilike(pattern),
                Recipe.ingredients.ilike(pattern),
                Recipe.category.ilike(pattern),
            )
        )

    if category:
        recipe_query = recipe_query.filter(Recipe.category.ilike(category))

    return recipe_query.order_by(Recipe.id.desc()).all()


def get_by_id(db, recipe_id: int):
    return db.query(Recipe).filter(Recipe.id == recipe_id).first()


def update(db, recipe: Recipe, data: dict):
    for key, value in data.items():
        setattr(recipe, key, value)
    db.commit()
    db.refresh(recipe)
    return recipe


def delete(db, recipe: Recipe):
    db.delete(recipe)
    db.commit()
