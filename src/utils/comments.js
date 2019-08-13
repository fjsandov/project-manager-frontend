import pick from 'lodash/pick';

export function convertFromBackend(backendComment) {
  return {
    ...pick(backendComment, 'id', 'body'),
    createdAt: backendComment.created_at,
    updatedAt: backendComment.updated_at,
  }
}