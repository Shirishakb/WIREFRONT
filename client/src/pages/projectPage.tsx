import PageCard from '../components/pageCard';
import { Link, useParams } from 'react-router-dom';

interface Project {
    _id: string;
    image: string;
    name: string;
    author: string;
  }

const ProjectPage = () => {
    const { projectId = '' } = useParams();
    console.log('projectId', projectId);
    // Hit getProject with projectId
    // Mock data for project
    const project: Project = {
        _id: projectId,
        name: "Project " + projectId,
        image: "./placeholder2.png",
        author: "Author " + projectId,
    };

    // This would hit getPages with projectId
    // Mock data for pages
    const pages = [];
    for (let i = 0; i < 5; i++) {
        const pageId = i.toString();
        const pageName = "Page " + i;
        const pageImage = "./placeholder2.png";
        const pageWidth = Math.floor(Math.random() * 1920);
        const pageHeight = Math.floor(Math.random() * 1080);
        pages.push({ _id: pageId, name: pageName, image: pageImage, width: pageWidth, height: pageHeight });
    }

    return (
        <div id="projectPages" className="text-light p-5">
            <h1 id="pagesTitle">{project.name}</h1>
            <div className="pagesContainer">
                {pages.map((page, index) => (
                    <Link to={`/pageeditor/${page._id}`} key={index}>
                        <PageCard key={index} page={page} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProjectPage;
