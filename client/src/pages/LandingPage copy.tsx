//import { j } from 'vitest/dist/reporters-yx5ZTtEV.js';
/*import { createComponent, getComponents, getComponentById, updateComponent, deleteComponent } from '../api/components.js';
import { getPages, getPageById, createPage, updatePage, deletePage } from '../api/pages.js';
import { getProjects, getUserProjects, getProjectById, createProject, updateProject, deleteProject } from '../api/projects.js';
import { loginUser, createUser } from '../utils/api.js';
import { jwtDecode } from 'jwt-decode';
*/
const LandingPageCopy = () => {
  /*
  const randomFunction = async () => {
    const username = "admin1";
    const password = "password";

    const user = {
      username: username+Math.floor(Math.random()*1000),
      password: password
    }

    const userResponse = await createUser( user );
    const userData = await userResponse.json();
    console.log( "userData: ", userData );
    const userLoginResponse = await loginUser( user );
    const userString = userLoginResponse.toString();
    const userLoginData = jwtDecode( userString );
    console.log( "userLoginData", userLoginData );

    const projectName = "My Project";
    const userId = "1";

    const projectData = await createProject( userId, projectName );
    console.log( "projectData: ", projectData );
    const allProjects = await getProjects();
    console.log( "allProjects: ", allProjects );
    const userProjects = await getUserProjects( userId );
    console.log( "userProjects: ", userProjects );
    const projectGet = await getProjectById( projectData.id );
    console.log( "projectGet: ", projectGet );
    const projectUpdate = await updateProject( projectData.id, projectName );
    console.log( "projectUpdate: ", projectUpdate );

    const pageName = "Home";
    const pageWidth = 1920;
    const pageHeight = 1080;
    const projectId = projectData.id;
    
    const pageData = await createPage( projectId, pageName, pageWidth, pageHeight );
    console.log( "pageData: ", pageData );
    const allPages = await getPages( projectId );
    console.log( "allPages: ", allPages );
    const pageGet = await getPageById( pageData.id );
    console.log( "pageGet: ", pageGet );
    const pageUpdate = await updatePage( pageData.id, pageName, pageWidth, pageHeight );
    console.log( "pageUpdate: ", pageUpdate );

    const pageId = pageData.id;
    const compType = "TEXTBOX";
    const compStyle = "StyleSetA";
    const compWidth = 100;
    const compHeight = 100;
    const compX = 500;
    const compY = 500;

    const componentData = await createComponent( pageId, compType, compStyle );
    console.log( "componentData: ", componentData );
    const allComponents = await getComponents( pageId );
    console.log( "allComponents: ", allComponents );
    const componentGet = await getComponentById( componentData.id );
    console.log( "componentGet: ", componentGet );
    const componentUpdate = await updateComponent( componentData.id, compType, compStyle, compWidth, compHeight, compX, compY );
    console.log( "componentUpdate: ", componentUpdate );

    const componentDelete = await deleteComponent( componentData.id );
    console.log( "componentDelete: ", componentDelete );
    const pageDelete = await deletePage( pageData.id );
    console.log( "pageDelete: ", pageDelete );
    const projectDelete = await deleteProject( projectData.id );
    console.log( "projectDelete: ", projectDelete );
  }

  randomFunction();
*/

    return (
    <>
      <div className="text-light bg-dark p-5">
          <h1>Welcome!</h1>
      </div>

    </>
    );
};

export default LandingPageCopy;