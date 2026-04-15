import API from "./client";

export const getComments = (recipeId) => API.get(`/comments/recipe/${recipeId}`);
export const createComment = (recipeId, data) => API.post(`/comments/recipe/${recipeId}`, data);
export const updateComment = (commentId, data) => API.put(`/comments/${commentId}`, data);
export const deleteComment = (commentId) => API.delete(`/comments/${commentId}`);
export const likeComment = (commentId) => API.post(`/comments/${commentId}/like`);
export const unlikeComment = (commentId) => API.delete(`/comments/${commentId}/like`);
