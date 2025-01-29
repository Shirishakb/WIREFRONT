import auth from '../utils/auth';

interface Project {
  _id: string;
  projectName: string;
  projectId: string;
  image: string;
  name: string;
  author: string;
}

// GET All Projects
const getProjects = async ():  Promise<Project[] | []>=> {
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
      return [];
    }
};

// GET Projects by userId
const getUserProjects = async (token: string): Promise<Project[] | []> => {
    try {
        const response = await fetch(`/api/project/${token}`,
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
      return [];
    }
};

// GET Projects by projectId
const getProjectById = async (projectId: string): Promise<Project | null> => {
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
const createProject = async (userId: string, projectName: string): Promise<Project | null> => {
    try {
        const response = await fetch(`/api/project`,
            {
                method: 'POST',
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
const updateProject = async (projectId: string, projectName: string): Promise<Project | null> => {
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
const deleteProject = async (projectId: string): Promise<Project | null> => {
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

