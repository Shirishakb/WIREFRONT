import ProjectCard from "../components/projectCard";
import { getProjects, getUserProjects } from "../api/projects";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../utils/auth.js";
import { createProject } from "../api/projects";

import { useEffect, useState } from "react";

interface Project {
    _id: string;
    projectName: string;
    projectId: string;
    image: string;
    name: string;
    author: string;
}
/*
interface User {
    _id: string;
    username: string;
    email: string;
}*/

const LandingPage = () => {

    const navigate = useNavigate();
    //const projects: Project[] = []

    const [ projects, setProjects ] = useState<Project[]>([]);

    const loggedIn: boolean = Auth.loggedIn();

    useEffect(() => {
        const projectFiller = async () => {
            if (loggedIn) {
                const data:Project[] = await getUserProjects(Auth.getToken());
                setProjects(data);
            } else {
                const data:Project[] = await getProjects();
                setProjects(data);
            }
        }

        projectFiller();
    }, []);

    console.log("projects:", projects);

    if (loggedIn) {

        // Mock data for user
        /*const user: User = {
            _id: "1", 
            username: "admin",
            email: "admin@admin.com",
        };*/

        // Mock data for projects
        // This will be replaced with a GetUserProjects call
        /*for (let i = 0; i < 5; i++) {
            const projectId = i.toString();
            const projectName = "Project " + i;
            const projectImage = "./placeholder2.png";
            projects.push({ _id: projectId, projectName: projectName, projectId: projectId, name: projectName, image: projectImage, author: '' });
        }*/
        const projectsComponent = projects.map((project, index) => (
            <Link to={`/project/${project._id}`} key={index}>
                <ProjectCard key={index} project={project} />
            </Link>
        ))

        return (
            <>
                <div id="projects" className="text-light p-5">
                    <h1 id="projectsTitle">Welcome back, insertusername!</h1>
                    <div className="projectsContainer">
                        {projects.length > 0 ? projectsComponent : <p>No projects found, please click 
                            <button onClick={ async () => {
                                const projectName = prompt('Enter the name of your project');

                                if (projectName) {
                                    const project = await createProject(projectName);
                                    console.log("project: ", project);
                                    if (project) {
                                        navigate(`/project/${project.projectId}`);
                                    }
                                }
                            }}>here</button> to create one!</p>}
                        {}
                    </div>
                </div>
            </>
        );
    } else {
      // Mock data for projects
      // This will be replaced with a GetAllProjects call
      /*for (let i = 0; i < 20; i++) {
            const projectId = i.toString();
            const projectName = "Project " + i;
            const projectImage = "./placeholder2.png";
            const projectAuthor = "Author " + i;
            projects.push({ _id: projectId, projectName: projectName, projectId: projectId, name: projectName, image: projectImage, author: projectAuthor });
        }*/

      return (
      <>
        <div id="projects" className="text-light p-5">
            <h1 id="projectsTitle">Community Projects</h1>
            <div className="projectsContainer">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>
        </div>

      </>
      );
    }

};

export default LandingPage;