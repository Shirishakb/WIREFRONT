import ProjectCard from "../components/projectCard";
import { getProjects, getUserProjects } from "../api/projects";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth.js";
import { createProject } from "../api/projects";
import { getMe } from "../utils/api";
import { Modal, Button } from "react-bootstrap";

import { useEffect, useState } from "react";

const LandingPage = () => {

    interface Project {
        _id: string;
        projectName: string;
        projectId: string;
        image: string;
        name: string;
        author: string;
    }
    
    interface User {
        _id: string;
        username: string;
        email: string;
    }

    const navigate = useNavigate();
    //const projects: Project[] = []

    const [ projects, setProjects ] = useState<Project[]>([]);

    const loggedIn: boolean = Auth.loggedIn();
    const [ childDeleted, setChildDeleted ] = useState(false);

    useEffect(() => {
        const projectFiller = async () => {
            if (loggedIn) {
                const data:Project[] = await getUserProjects();
                setProjects(data);
            } else {
                const data:Project[] = await getProjects();
                setProjects(data);
            }
        }

        projectFiller();
    }, [childDeleted]);

    console.log("projects:", projects);

    if (loggedIn) {
        const [ user, setUser ] = useState<User | null>(null);
        const [ showModal, setShowModal ] = useState(false);

        useEffect(() => {
            const userFiller = async () => {
                const data:User = await getMe();
                setUser(data);
            }

            userFiller();
        }, []);

        const handleDelete = () => {
            setChildDeleted(true);
        }

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
            <ProjectCard loggedIn={loggedIn} key={index} onDelete={handleDelete} project={project} />
        ))

        const nameProject = async () => {
            const projectNameEl = document.getElementById("createProjectTextBox") as HTMLInputElement;
            const projectSpanEl = document.getElementById("createProjectSpan") as HTMLSpanElement;
            
            if (!projectNameEl || !projectSpanEl) {
                return;
            }
            const projectName = projectNameEl.value;

            if (projectName) {
                const project = await createProject(projectName);
                if (project) {
                    navigate(`/project/${project.projectId}`);
                }
            } else {
                projectSpanEl.innerText = "Please enter a project name!";
            }
        }

        return (
            <>
                <div id="projects" className="text-light p-5">
                    <h1 id="projectsTitle">Welcome back, {user?.username}!</h1>
                    <div className="projectsContainer">
                        {projects.length > 0 ? projectsComponent : <p>No projects found, please click 
                            <a id="projectCreate" onClick={ async (e) => {
                                e.preventDefault();

                                setShowModal(true);
                            }}> here</a> to create one!</p>}
                        {}
                    </div>
                </div>
                <Modal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    aria-labelledby='create-project-modal'>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Project</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div>
                            <span id="createProjectSpan"></span>
                        </div>
                        <div>
                            <label htmlFor="createProjectTextBox">Project Name: </label>
                            <input type="text" id="createProjectTextBox" name="createProjectTextBox"/>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=> setShowModal(false)}>Cancel</Button>
                        <Button variant="primary" onClick={() => nameProject()}>Create +</Button>
                    </Modal.Footer>
                </Modal>
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
                    <ProjectCard loggedIn={loggedIn} key={index} project={project} />
                ))}
            </div>
        </div>

      </>
      );
    }

};

export default LandingPage;