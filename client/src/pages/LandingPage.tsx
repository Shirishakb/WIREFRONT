import ProjectCard from "../components/projectCard";
import { Link } from "react-router-dom";
import Auth from "../utils/auth.js";

interface Project {
    _id: string;
    image: string;
    name: string;
    author: string;
}

interface User {
    _id: string;
    username: string;
    email: string;
}

const LandingPage = () => {
    const projects: Project[] = []

    const loggedIn: boolean = Auth.loggedIn();

    if (loggedIn) {
        // Mock data for user
        const user: User = {
            _id: "1", 
            username: "admin",
            email: "admin@admin.com",
        }

        // Mock data for projects
        // This will be replaced with a GetUserProjects call
        for (let i = 0; i < 5; i++) {
            const projectId = i.toString();
            const projectName = "Project " + i;
            const projectImage = "./placeholder2.png";
            projects.push({ _id: projectId, name: projectName, image: projectImage, author: '' });
        }

        return (
            <>
                <div id="projects" className="text-light p-5">
                    <h1 id="projectsTitle">Welcome back, {user.username}!</h1>
                    <div className="projectsContainer">
                        {projects.map((project, index) => (
                            <Link to={`/project/${project._id}`} key={index}>
                                <ProjectCard key={index} project={project} />
                            </Link>
                        ))}
                    </div>
                </div>
            </>
        );
    } else {
      // Mock data for projects
      // This will be replaced with a GetAllProjects call
      for (let i = 0; i < 20; i++) {
        const projectId = i.toString();
        const projectName = "Project " + i;
        const projectImage = "./placeholder2.png";
        const projectAuthor = "Author " + i;
        projects.push({ _id: projectId, name: projectName, image: projectImage, author: projectAuthor });
    }

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