import auth from '../utils/auth';

// GET Pages by projectId
const getPages = async (projectId: string) => {
  try {
    const response = await fetch(`/api/page/${projectId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${auth.getToken()}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval: ', err);
    return null;
  }
};

// GET Page by pageId
const getPageById = async (pageId: string) => {
  try {
    const response = await fetch(`/api/page/id/${pageId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${auth.getToken()}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval: ', err);
    return null;
  }
};

// POST Page
const createPage = async (projectId: string, pageName: string, pageWidth: number | null = null, pageHeight: number | null = null) => {
  try {
    const pageBody: {
      projectId: string,
      pageName: string,
      pageWidth?: number,
      pageHeight?: number,
    } = {
      projectId: projectId,
      pageName: pageName,
    };
    if (pageWidth) {
      pageBody.pageWidth = pageWidth;
    }
    if (pageHeight) {
      pageBody.pageHeight = pageHeight;
    }

    const response = await fetch(`/api/page`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${auth.getToken()}`,
        },
        body: JSON.stringify(pageBody),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval: ', err);
    return null;
  }
};

// PUT Page
const updatePage = async (pageId: string, updateData: { pageName?: string; pageWidth?: number; pageHeight?: number }) => {
  try {
    const response = await fetch(`/api/page/${pageId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${auth.getToken()}`,
        },
        /*body: JSON.stringify({ 
            pageName: pageName,
            pageWidth: pageWidth,
            pageHeight: pageHeight
        }),
    }
);*/
        body: JSON.stringify(updateData),
      }); const result = await response.json(); if (!response.ok) { throw new Error(result.msg || "Failed to update page"); } console.log("Success:", result);

  } catch (error) { 
    if (error instanceof Error) {
      console.error("Error updating page:", error.message);
    } else {
      console.error("Error updating page:", error);
    }
  }
};

/*const data = await response.json();

if (!response.ok) {
  throw new Error('invalid API response, check network tab!');
}

return data;
    } catch (err) {
  console.log('Error from data retrieval: ', err);
  return null;
}
};*/

// DELETE Page
const deletePage = async (pageId: string) => {
  try {
    const response = await fetch(`/api/page/${pageId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${auth.getToken()}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval: ', err);
    return null;
  }
};

export {
  getPages,
  getPageById,
  createPage,
  updatePage,
  deletePage
};