import auth from '../utils/auth';

// GET All Projects
const getProjects = async () => {
    try {
        const response = await fetch(`/api/project`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${auth.getToken()}`,
                },
            }
        );
  
      const data = await response.json();
  
      if(!response.ok) {
        throw new Error('invalid API response, check network tab!');
      }
  
      return data;
    } catch (err) {
      console.log('Error from data retrieval: ', err);
      return null;
    }
};

// GET Projects by userId
const getUserProjects = async (userId: string) => {
    try {
        const response = await fetch(`/api/project/${userId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${auth.getToken()}`,
                },
            }
        );
  
      const data = await response.json();
  
      if(!response.ok) {
        throw new Error('invalid API response, check network tab!');
      }
  
      return data;
    } catch (err) {
      console.log('Error from data retrieval: ', err);
      return null;
    }
};

// GET Projects by projectId
const getProjectById = async (projectId: string) => {
  try {
      const response = await fetch(`/api/project/${projectId}`,
          {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  authorization: `Bearer ${auth.getToken()}`,
              },
          }
      );

    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval: ', err);
    return null;
  }
};

// POST Project
const createProject = async (userId: string, projectName: string) => {
    try {
        const response = await fetch(`/api/project`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${auth.getToken()}`,
                },
                body: JSON.stringify({ 
                  userId: userId,
                  projectName: projectName
                }),
            }
        );
  
      const data = await response.json();
  
      if(!response.ok) {
        throw new Error('invalid API response, check network tab!');
      }
  
      return data;
    } catch (err) {
      console.log('Error from data retrieval: ', err);
      return null;
    }
};

// PUT Project
const updateProject = async (projectId: string, projectName: string) => {
    try {
        const response = await fetch(`/api/project/${projectId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${auth.getToken()}`,
                },
                body: JSON.stringify({ 
                    projectName: projectName 
                }),
            }
        );
  
      const data = await response.json();
  
      if(!response.ok) {
        throw new Error('invalid API response, check network tab!');
      }
  
      return data;
    } catch (err) {
      console.log('Error from data retrieval: ', err);
      return null;
    }
};

// DELETE Project
const deleteProject = async (projectId: string) => {
    try {
        const response = await fetch(`/api/project/${projectId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${auth.getToken()}`,
                },
            }
        );
  
      const data = await response.json();
  
      if(!response.ok) {
        throw new Error('invalid API response, check network tab!');
      }
  
      return data;
    } catch (err) {
      console.log('Error from data retrieval: ', err);
      return null;
    }
};

export {
    getProjects,
    getUserProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};

