import RecipeModalBody from "./recipeModal/RecipeModalBody";
import RecipeModalComments from "./recipeModal/RecipeModalComments";
import RecipeModalHero from "./recipeModal/RecipeModalHero";
import RecipeModalMetaBar from "./recipeModal/RecipeModalMetaBar";

function RecipeModal({
  recipe,
  user,
  comments,
  draft,
  onDraftChange,
  onCommentSubmit,
  commentEdits,
  onCommentEditStart,
  onCommentEditChange,
  onCommentEditCancel,
  onCommentEditSave,
  onCommentDelete,
  onCommentLikeToggle,
  replyDrafts,
  replyingTo,
  onReplyToggle,
  onReplyDraftChange,
  onReplySubmit,
  onClose,
  onFavoriteToggle,
  onRate,
  onRecipeEdit,
  onRecipeDelete,
}) {
  if (!recipe) {
    return null;
  }

  const canManageRecipe = user && (user.role === "admin" || user.id === recipe.user_id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 px-4 py-8">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-[32px] bg-white shadow-2xl">
        <RecipeModalHero recipe={recipe} onClose={onClose} />

        <div className="flex flex-col gap-5 p-6">
          <RecipeModalMetaBar
            recipe={recipe}
            canManageRecipe={canManageRecipe}
            onFavoriteToggle={onFavoriteToggle}
            onRate={onRate}
            onRecipeEdit={onRecipeEdit}
            onRecipeDelete={onRecipeDelete}
          />
          <RecipeModalBody recipe={recipe} />
          <RecipeModalComments
            comments={comments}
            user={user}
            draft={draft}
            onDraftChange={onDraftChange}
            onCommentSubmit={onCommentSubmit}
            commentEdits={commentEdits}
            onCommentEditStart={onCommentEditStart}
            onCommentEditChange={onCommentEditChange}
            onCommentEditCancel={onCommentEditCancel}
            onCommentEditSave={onCommentEditSave}
            onCommentDelete={onCommentDelete}
            onCommentLikeToggle={onCommentLikeToggle}
            replyDrafts={replyDrafts}
            replyingTo={replyingTo}
            onReplyToggle={onReplyToggle}
            onReplyDraftChange={onReplyDraftChange}
            onReplySubmit={onReplySubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default RecipeModal;
