import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getComponents, deleteComponent } from '../api/components';
import { getPages, deletePage } from '../api/pages';
import { deleteProject } from '../api/projects';
import { useNavigate } from 'react-router-dom';

interface Props {
  loggedIn: boolean;
  project: {
    projectId: string;
    image: string;
    projectName: string;
    author: string;
  },
  onDelete?: () => void;
}

const ProjectCard = (props: Props) => {
  const { project, loggedIn, onDelete } = props;
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  if (!project.image) {
    project.image = "./public/placeholder2.png";
  }

  const deleteProjectCard = async (projectId: string) => {    
    const pages = await getPages(projectId);

    for (let i = 0; i < pages.length; i++) {
      const components = await getComponents(pages[i].pageId);

      for (let j = 0; j < components.length; j++) {
        await deleteComponent(components[j].componentId);
      }
      await deletePage(pages[i].pageId);
    }

    await deleteProject(projectId);
    setShowModal(false);
    if (onDelete) {
      onDelete();
    }
  }

  const moveToProjectPage = (projectId: string) => {
    navigate(`/project/${projectId}`);
  }

  return (
    <>
      <div className="projectCardContainer">
        <div className="projectCard bg-dark" onClick={() => {moveToProjectPage(project.projectId)}}>
            <img className="projectImg" src={project.image} alt={project.projectName} />
            <h3 className="projectH3">{project.projectName}</h3>
            <p className="projectP">{project.author}</p>
        </div>
        {loggedIn ?
          <div className="deleteProject">
            <input className="deleteButton" type="button" value="X" onClick={(e) => {
              e.stopPropagation();
              setShowModal(true)}} />
        </div> : null}
      </div>
      <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby='delete-project-modal'>
          <Modal.Header closeButton>
              <Modal.Title>Delete Project</Modal.Title>
          </Modal.Header>

          <Modal.Body>
              <p>Are you sure you want to delete {project.projectName} project?</p>
          </Modal.Body>

          <Modal.Footer>
              <Button variant="secondary" onClick={()=> setShowModal(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => deleteProjectCard(project.projectId)}>Confirm</Button>
          </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProjectCard;