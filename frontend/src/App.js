import AuthScreen from "./components/AuthScreen";
import AppHeader from "./components/AppHeader";
import RecipeComposerModal from "./components/RecipeComposerModal";
import RecipeFeed from "./components/RecipeFeed";
import RecipeFilters from "./components/RecipeFilters";
import RecipeModal from "./components/RecipeModal";
import Toast from "./components/Toast";
import useAuth from "./hooks/useAuth";
import useNotifier from "./hooks/useNotifier";
import useRecipeComments from "./hooks/useRecipeComments";
import useRecipes from "./hooks/useRecipes";

function App() {
  const notifier = useNotifier();
  const auth = useAuth(notifier);
  const recipes = useRecipes({
    user: auth.user,
    setError: notifier.setError,
    setMessage: notifier.setMessage,
  });
  const comments = useRecipeComments({
    recipes: recipes.recipes,
    user: auth.user,
    setError: notifier.setError,
    setMessage: notifier.setMessage,
  });

  const handleRecipeDelete = async (recipeId) => {
    await recipes.handleRecipeDelete(recipeId);
    comments.handleRecipeDeleted(recipeId);
  };

  if (!auth.user) {
    return (
      <>
        <AuthScreen
          authMode={auth.authMode}
          authForm={auth.authForm}
          onAuthFormChange={auth.handleAuthFormChange}
          onSubmit={auth.handleAuthSubmit}
          onModeChange={auth.setAuthMode}
        />
        <Toast error={notifier.error} message={notifier.message} zIndexClass="z-[60]" />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#eff6ff] text-slate-900">
      <AppHeader
        activeView={recipes.activeView}
        availableViews={recipes.availableViews}
        canPostRecipes={recipes.canPostRecipes}
        user={auth.user}
        onChangeView={recipes.setActiveView}
        onOpenComposer={recipes.openComposer}
        onLogout={auth.handleLogout}
      />

      <RecipeFilters
        activeView={recipes.activeView}
        availableViews={recipes.availableViews}
        search={recipes.search}
        category={recipes.category}
        displayedCategories={recipes.displayedCategories}
        onChangeView={recipes.setActiveView}
        onSearchChange={recipes.setSearch}
        onCategoryChange={recipes.setCategory}
      />

      <main className="mx-auto max-w-6xl px-6 py-8 sm:px-8 lg:px-10">
        <RecipeFeed
          loading={recipes.loading}
          filteredRecipes={recipes.filteredRecipes}
          activeView={recipes.activeView}
          user={auth.user}
          onOpenRecipe={comments.setDetailRecipeId}
          onFavoriteToggle={recipes.handleFavoriteToggle}
          onRateRecipe={recipes.handleRateRecipe}
          onEditRecipe={recipes.handleRecipeEdit}
          onDeleteRecipe={handleRecipeDelete}
        />
      </main>

      {recipes.showComposer ? (
        <RecipeComposerModal
          editingRecipeId={recipes.editingRecipeId}
          recipeForm={recipes.recipeForm}
          onClose={recipes.closeComposer}
          onSubmit={recipes.handleRecipeSubmit}
          onRecipeFormChange={recipes.handleRecipeFormChange}
          onPhotoChange={recipes.handlePhotoChange}
        />
      ) : null}

      <RecipeModal
        recipe={comments.detailRecipe}
        user={auth.user}
        comments={comments.comments}
        draft={comments.commentDraft}
        onDraftChange={comments.setCommentDraft}
        onCommentSubmit={comments.handleCommentSubmit}
        commentEdits={comments.commentEdits}
        onCommentEditStart={comments.handleCommentEditStart}
        onCommentEditChange={comments.setCommentEdit}
        onCommentEditCancel={comments.clearCommentEdit}
        onCommentEditSave={comments.handleCommentEditSave}
        onCommentDelete={comments.handleCommentDelete}
        onCommentLikeToggle={comments.handleCommentLikeToggle}
        replyDrafts={comments.replyDrafts}
        replyingTo={comments.replyingTo}
        onReplyToggle={comments.setReplyingTo}
        onReplyDraftChange={comments.setReplyDraft}
        onReplySubmit={comments.handleReplySubmit}
        onClose={comments.closeRecipeDetail}
        onFavoriteToggle={recipes.handleFavoriteToggle}
        onRate={recipes.handleRateRecipe}
        onRecipeEdit={(recipe) => {
          recipes.handleRecipeEdit(recipe);
          comments.closeRecipeDetail();
        }}
        onRecipeDelete={handleRecipeDelete}
      />

      <Toast error={notifier.error} message={notifier.message} />
    </div>
  );
}

export default App;
