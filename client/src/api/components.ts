import auth from '../utils/auth';

// POST Component
const createComponent = async (pageId: string, compType: string, compSet: string) => {
    try {
        const response = await fetch(`/api/comp`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${auth.getToken()}`,
                },
                body: JSON.stringify({ 
                    pageId: pageId,
                    compType: compType,
                    compSet: compSet
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

// GET Components by pageId
const getComponents = async (pageId: string) => {
  try {
      const response = await fetch(`/api/comp/${pageId}`,
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

// GET Component by component Id
const getComponentById = async (compId: string) => {
  try {
      const response = await fetch(`/api/comp/${compId}`,
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

// PUT Component
const updateComponent = async ( compId: string, compType: string, compSet: string, compWidth: number, compHeight: number, compXPos: number, compYPos: number, radioGroup: number | null = null, nodePage: number | null = null, parentComp: string | null = null, lockFlag: boolean | null = null ) => {
    try {
        const compBody: {
            compType: string,
            compSet: string,
            compWidth: number,
            compHeight: number,
            compXPos: number,
            compYPos: number,
            radioGroup?: number | null,
            nodePage?: number | null,
            parentComp?: string | null,
            lockFlag?: boolean | null
        } = { 
            compType: compType,
            compSet: compSet,
            compWidth: compWidth,
            compHeight: compHeight,
            compXPos: compXPos,
            compYPos: compYPos,
        };
        if (radioGroup) {
            compBody.radioGroup = radioGroup;
        }
        if (nodePage) {
            compBody.nodePage = nodePage;
        }
        if (parentComp) {
            compBody.parentComp = parentComp;
        }
        if (lockFlag) {
            compBody.lockFlag = lockFlag;
        }

        const response = await fetch(`/api/comp/${compId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${auth.getToken()}`,
                },
                body: JSON.stringify( compBody ),
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

// DELETE Component
const deleteComponent = async (compId: string) => {
    try {
        const response = await fetch(`/api/comp/${compId}`,
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
    getComponents,
    getComponentById,
    createComponent,
    updateComponent,
    deleteComponent
};