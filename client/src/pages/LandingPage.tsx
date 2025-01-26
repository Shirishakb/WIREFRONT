import { createComponent, getComponents, getComponentById, updateComponent, deleteComponent } from '../api/components.js';
import { getPages, getPageById, createPage, updatePage, deletePage } from '../api/pages.js';
import { getProjects, getUserProjects, getProjectById, createProject, updateProject, deleteProject } from '../api/projects.js';

const LandingPage = () => {

  const projectName = "My Project";
  const userId = "1";
  const randomFunction = async () => {
    const projectData = await createProject( userId, projectName );
    console.log( projectData );
    const allProjects = await getProjects();
    console.log( allProjects );
    const userProjects = await getUserProjects( userId );
    console.log( userProjects );
    const projectGet = await getProjectById( projectData.id );
    console.log( projectGet );
    const projectUpdate = await updateProject( projectData.id, projectName );
    console.log( projectUpdate );

    const pageName = "Home";
    const pageWidth = 1920;
    const pageHeight = 1080;
    const projectId = projectData.id;
    
    const pageData = await createPage( projectId, pageName, pageWidth, pageHeight );
    console.log( pageData );
    const allPages = await getPages( projectId );
    console.log( allPages );
    const pageGet = await getPageById( pageData.id );
    console.log( pageGet );
    const pageUpdate = await updatePage( pageData.id, pageName, pageWidth, pageHeight );
    console.log( pageUpdate );

    const pageId = pageData.id;
    const compType = "TEXTBOX";
    const compStyle = "StyleSetA";
    const compWidth = 100;
    const compHeight = 100;
    const compX = 500;
    const compY = 500;

    const componentData = await createComponent( pageId, compType, compStyle );
    console.log( componentData );
    const allComponents = await getComponents( pageId );
    console.log( allComponents );
    const componentGet = await getComponentById( componentData.id );
    console.log( componentGet );
    const componentUpdate = await updateComponent( componentData.id, compType, compStyle, compWidth, compHeight, compX, compY );
    console.log( componentUpdate );

    const componentDelete = await deleteComponent( componentData.id );
    console.log( componentDelete );
    const pageDelete = await deletePage( pageData.id );
    console.log( pageDelete );
    const projectDelete = await deleteProject( projectData.id );
    console.log( projectDelete );
  }

  randomFunction();


    return (
    <>
      <div className="text-light bg-dark p-5">
          <h1>Welcome!</h1>
      </div>

    </>
    );
};

export default LandingPage;