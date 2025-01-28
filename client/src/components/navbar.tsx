import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './signupform';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            Wireframe Builder
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
            <Nav className='ml-auto d-flex'>
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>

                  <button onClick={ () => {
                    const projectName = prompt('Enter the name of your project');

                    if (projectName) {
                      fetch('/api/project', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          authorization: `Bearer ${Auth.getToken()}`,
                        },
                        body: JSON.stringify({ name: projectName }),
                      }).then(async (r:any) => {

                        if (!r.ok) {
                          const errorData = await r.json();
                          console.log('Failed to create project', errorData);
                          return;
                        }

                        const data = await r.json();
                        console.log('Created project', data);

                        window.location.href = `/project/${data.projectId}`;

                      });
                    }
                  }}>New Project</button>

                  <Nav.Link as={Link} to='/projects'>
                    See Your Projects
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>

                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
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
    </>
  );
};

export default AppNavbar;