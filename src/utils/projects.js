export function convertFromBackend(backendProject) {
  return {
    id: backendProject.id,
    name: backendProject.name,
    projectType: backendProject.project_type,
    startAt: backendProject.start_at,
    endAt: backendProject.end_at,
    createdAt: backendProject.created_at,
    updatedAt: backendProject.updated_at,
  }
}