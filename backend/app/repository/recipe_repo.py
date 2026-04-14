from sqlalchemy import or_

from app.models.recipe import Recipe


def create_recipe(db, recipe: Recipe):
    db.add(recipe)
    db.commit()
    db.refresh(recipe)
    return recipe


def get_all_recipes(db, query=None, category=None):
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


def get_recipe_by_id(db, recipe_id: int):
    return db.query(Recipe).filter(Recipe.id == recipe_id).first()


def update_recipe(db, db_recipe: Recipe, data: dict):
    for key, value in data.items():
        setattr(db_recipe, key, value)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe


def delete_recipe(db, db_recipe: Recipe):
    db.delete(db_recipe)
    db.commit()
