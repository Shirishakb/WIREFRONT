import PageCard from '../components/pageCard';
import { useParams, useNavigate } from 'react-router-dom';
import { getPages } from '../api/pages';
import { useEffect, useState } from 'react';
import { getProjectById } from '../api/projects';
import { createPage } from '../api/pages';
import { Modal, Button } from 'react-bootstrap';

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
    const [showModal, setShowModal] = useState(false);
    const [childDeleted, setChildDeleted] = useState(false);

    // Store the projectId in localStorage when the component loads
    useEffect(() => {

        if (projectId) {

            localStorage.setItem('projectId', projectId);

            console.log('Stored projectId in localStorage:', projectId);

        }

    }, [projectId]);
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
    }, [childDeleted]);

    const handleDelete = async () => {
        setChildDeleted(true);
    };

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
    if (!project) {
        return <div>Loading...</div>;
    }

   const pagesComponent = pages.map((page, index) => (
        <PageCard key={index} page={page} onDelete={handleDelete} />
    ));

    const namePage = async () => {
        const pageNameEl = document.getElementById("createPageTextBox") as HTMLInputElement;
        const pageSpanEl = document.getElementById("createPageSpan") as HTMLSpanElement;
        
        if (!pageNameEl || !pageSpanEl) {
            return;
        }
        const pageName = pageNameEl.value;

        if (pageName) {
            const page = await createPage(projectId, pageName);
            if (page) {
                navigate(`/pageeditor/${page.pageId}`);
            }
        } else {
            pageSpanEl.innerText = "Please enter a page name!";
        }
    }

    return (
        <>
            <div id="projectPages" className="text-light p-5">
                <span id="backButton" onClick={() => navigate(`/`)}>&lt;</span>
                <h1 id="pagesTitle">{project.projectName}</h1>
                <div className="pagesContainer">
                    {pages.length > 0 ? pagesComponent : <p>No pages found, please click 
                                <a id="pageCreate"onClick={ async (e) => {
                                    e.preventDefault();
                                    
                                    setShowModal(true);
                                }}> here</a> to create one!</p>}
                </div>
            </div>
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby='create-page-modal'>
                <Modal.Header closeButton>
                    <Modal.Title>Create Page</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>
                        <span id="createPageSpan"></span>
                    </div>
                    <div>
                        <label htmlFor="createPageTextBox">Page Name: </label>
                        <input type="text" id="createPageTextBox" name="createPageTextBox"/>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={()=> setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => namePage()}>Create +</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProjectPage;
