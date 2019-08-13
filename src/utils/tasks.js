import pick from 'lodash/pick';

export function convertFromBackend(backendTask) {
  return {
    ...pick(backendTask, 'id', 'title', 'description', 'priority', 'status', 'deadline'),
    projectId: backendTask.projectId,
    createdAt: backendTask.created_at,
    updatedAt: backendTask.updated_at,
  };
}