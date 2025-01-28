import ProjectCard from "../components/projectCard";
import { Link } from "react-router-dom";
import Auth from "../utils/auth.js";

import { useEffect, useState } from "react";

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


    //const projects: Project[] = []

    const [ projects, setProjects ] = useState<Project[]>([]);

    const loggedIn: boolean = Auth.loggedIn();

    const getProjects = async () => {
        const response = await fetch("/api/project", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("id_token")}`,
            },
        });
        const data = await response.json();
        setProjects(data);
    };

    useEffect(() => {

       if (loggedIn) getProjects();
    }, []);

    return (
        <div className="text-light bg-dark p-5">
            {projects.map((project, index) => (
                <Link to={`/project/${project.projectId}`} key={index}>
                <ProjectCard key={index} project={project} />
                </Link>
            ))}
        </div>
    );

    /*

    if (loggedIn) {



        //projects.push({ _id: projectId, name: projectName, image: projectImage, author: '' });

        return (
            <>
                <div className="text-light bg-dark p-5">
                    {projects.map((project, index) => (
                        <Link to={`/project/${project._id}`} key={index}>
                          <ProjectCard key={index} project={project} />
                        </Link>
                    ))}
                </div>
            </>
        );
    } else {
      // Mock data for projects
      // This will be replaced with a GetAllProjects call
      for (let i = 0; i < 20; i++) {
        const projectId = i.toString();
        const projectName = "Project " + i;
        const projectImage = "https://via.placeholder.com/150";
        const projectAuthor = "Author " + i;
        projects.push({ _id: projectId, name: projectName, image: projectImage, author: projectAuthor });
    }

      return (
      <>
        <div className="text-light bg-dark p-5">
            <h1>Welcome!</h1>
            {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
            ))}
        </div>

      </>
      );
    }

    */

};

export default LandingPage;