import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab, Button } from 'react-bootstrap';
import {createProject} from '../api/projects';
import SignUpForm from './signupform';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';
//import { create } from '@mui/material/styles/createTransitions';
import { createPage } from '../api/pages';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [createModal, setCreateModal] = useState(false);
  const location = useLocation();
  const [state, setState] = useState('');

  console.log('location', location);

  const projectId = location.pathname.substring(9);

  useEffect(() => {
    if (location.pathname.substring(0, 9) === '/project/') {
      setState('project');
      console.log('projectId', projectId);
    } else if (location.pathname.substring(0, 11) === '/pageeditor/') {
      setState('page');
    } else {
      setState('landing');
    }
  }, [location]);

  const createProjectCard = async () => {
    const projectName = (document.getElementById('createProjectTextBox') as HTMLInputElement).value;
    console.log('projectName', projectName);
    const projectData = await createProject(projectName);
    setCreateModal(false);
    if (projectData) {
      navigate(`/project/${projectData.projectId}`);
    }
  }

  const createPageCard = async (projectId: string) => {
    const pageName = (document.getElementById('createPageTextBox') as HTMLInputElement).value;
    console.log('pageName', pageName);
    console.log('projectId', projectId);
    const pageData = await createPage(projectId, pageName);
    setCreateModal(false);
    if (pageData) {
      navigate(`/pageeditor/${pageData.pageId}`);
    }
  }

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            Wireframe Builder
          </Navbar.Brand>
          <Nav className='ml-auto d-flex'>
            {/* if user is logged in show saved books and logout */}
            {Auth.loggedIn() ? (
              <>
                {state === 'landing' &&  <Nav.Link onClick={() => {setCreateModal(true)}}>Create Project</Nav.Link> }
                {state === 'project' &&  <Nav.Link onClick={() => {setCreateModal(true)}}>Create Page</Nav.Link> }
                <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>

              </>
            ) : (
              <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
      {<Modal
          show={createModal}
          onHide={() => setCreateModal(false)}
          aria-labelledby='create-modal'>
          <Modal.Header closeButton>
              {state === 'landing' ? <Modal.Title>Create Project</Modal.Title> : <Modal.Title>Create Page</Modal.Title>}
          </Modal.Header>

          <Modal.Body>
            <div>
                {state === 'landing' ? <span id="createProjectSpan"></span> : <span id="createPageSpan"></span>}
            </div>
            <div>
                {state === 'landing' ? <label htmlFor="createProjectTextBox">Project Name: </label> : <label htmlFor="createPageTextBox">Page Name: </label> }
                {state === 'landing' ? <input type="text" id="createProjectTextBox" name="createPageTextBox"/> : <input type="text" id="createPageTextBox" name="createPageTextBox"/> }
            </div>
          </Modal.Body>

          <Modal.Footer>
              <Button variant="secondary" onClick={()=> setCreateModal(false)}>Cancel</Button>
              {state === 'landing' ? <Button variant="primary" onClick={() => createProjectCard()}>Confirm</Button> : <Button variant="primary" onClick={() => createPageCard(projectId)}>Confirm</Button> }
          </Modal.Footer>
      </Modal>}
    </>
  );
};

export default AppNavbar;