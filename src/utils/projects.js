import pick from 'lodash/pick';

export function convertFromBackend(backendProject) {
  return {
    ...pick(backendProject, 'id', 'name'),
    projectType: backendProject.project_type,
    startAt: backendProject.start_at,
    endAt: backendProject.end_at,
    createdAt: backendProject.created_at,
    updatedAt: backendProject.updated_at,
  }
}