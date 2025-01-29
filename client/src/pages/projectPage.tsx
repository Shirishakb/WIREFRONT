import PageCard from '../components/pageCard';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getPages } from '../api/pages';
import { useEffect, useState } from 'react';
import { getProjectById } from '../api/projects';
import { createPage } from '../api/pages';

/*interface Project {
    _id: string;
    image: string;
    name: string;
    author: string;
  }*/

const ProjectPage = () => {
    const navigate = useNavigate();
    const { projectId = '' } = useParams();
    console.log('projectId', projectId);
    // Hit getProject with projectId
    // Mock data for project
    /*const project: Project = {
        _id: projectId,
        name: "Project " + projectId,
        image: "./placeholder2.png",
        author: "Author " + projectId,
    };*/

    const [project, setProject] = useState<any>({
        _id: '',
        image: '',
        name: '',
        author: '',
    });
    const [pages, setPages] = useState<any[]>([]);

    useEffect(() => {
        const fetchProject = async () => {
            const data = await getProjectById(projectId);
            console.log('project by id: ', data);
            setProject(data);
        };
        const fetchPages = async () => {
            const data = await getPages(projectId);
            console.log('pages: ', data);
            setPages(data);
        };

        fetchProject();
        fetchPages();
    }, [projectId]);

    // This would hit getPages with projectId
    // Mock data for pages
    /*const pages = [];
    for (let i = 0; i < 5; i++) {
        const pageId = i.toString();
        const pageName = "Page " + i;
        const pageImage = "./placeholder2.png";
        const pageWidth = Math.floor(Math.random() * 1920);
        const pageHeight = Math.floor(Math.random() * 1080);
        pages.push({ _id: pageId, name: pageName, image: pageImage, width: pageWidth, height: pageHeight });
    }*/
   const pagesComponent = pages.map((page, index) => (
        <Link to={`/pageeditor/${page._id}`} key={index}>
            <PageCard key={index} page={page} />
        </Link>
    ));

    return (
        <div id="projectPages" className="text-light p-5">
            <h1 id="pagesTitle">{project.projectName}</h1>
            <div className="pagesContainer">
                {pages.length > 0 ? pagesComponent : <p>No pages found, please click 
                            <button onClick={ async () => {
                                const pageName = prompt('Enter the name of your page');

                                if (pageName) {
                                    const page = await createPage(project.projectId, pageName);
                                    console.log("page: ", page);
                                    if (page) {
                                        navigate(`/pageeditor/${page.pageId}`);
                                    }
                                }
                            }}>here</button> to create one!</p>}
            </div>
        </div>
    );
};

export default ProjectPage;
