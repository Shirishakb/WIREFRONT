import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getComponents, deleteComponent } from '../api/components';
import { deletePage } from '../api/pages';
import { useNavigate } from 'react-router-dom';

interface Props {
    page: {
      pageId: string;
      image: string;
      pageName: string;
      width: number;
      height: number;
    },
    onDelete?: () => void;
  }
  
  const PageCard = (props: Props) => {
    const { page, onDelete } = props;
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    if (!page.image) {
      page.image = "../public/Placeholder2.png";
    }

    const deletePageCard = async (pageId: string) => {    
      const components = await getComponents(pageId);
  
      for (let j = 0; j < components.length; j++) {
        await deleteComponent(components[j]._id);
      }
  
      await deletePage(pageId);
      setShowModal(false);
      if (onDelete) {
        onDelete();
      }
    }
  
    const moveToPage = (pageId: string) => {
      navigate(`/pageeditor/${pageId}`);
    }

    return (
      <>
        <div className="pageCardContainer">
          <div className="pageCard bg-dark" onClick={() => {moveToPage(page.pageId)}}>
              <img className="pageImg" src={page.image} alt={page.pageName} />
              <h3 className="pageH3">{page.pageName}</h3>
          </div>
          <div className="deletePage">
              <input className="deleteButton" type="button" value="X" onClick={(e) => {
                e.stopPropagation();
                setShowModal(true)}} />
          </div>
        </div>
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby='delete-page-modal'>
          <Modal.Header closeButton>
              <Modal.Title>Delete Page</Modal.Title>
          </Modal.Header>

          <Modal.Body>
              <p>Are you sure you want to delete {page.pageName} page?</p>
          </Modal.Body>

          <Modal.Footer>
              <Button variant="secondary" onClick={()=> setShowModal(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => deletePageCard(page.pageId)}>Confirm</Button>
          </Modal.Footer>
      </Modal>
      </>
    );
  }
  
  export default PageCard;