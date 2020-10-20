import React from 'react';
import { Button, Form, FormControl, Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../../servises/Constant';



const Header = () => {
 
        return ( 
            <>
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="">
              <Nav.Item className=""><Link className="mr-2 text-white text-decoration-none hover" to={`${PUBLIC_URL}`}>Project Management</Link></Nav.Item>
              </Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Item><Link className="mr-2 text-white text-decoration-none hover" to={`${PUBLIC_URL}`}>Home</Link></Nav.Item>
                <Nav.Item><Link className="mr-2 text-white text-decoration-none hover" to={`${PUBLIC_URL}projects`}>Projects</Link></Nav.Item>
                <Nav.Item><Link className="mr-2 text-white text-decoration-none hover" to={`${PUBLIC_URL}about`}>About</Link></Nav.Item>
                <Nav.Item><Link className="mr-2 text-white text-decoration-none hover" to={`${PUBLIC_URL}contact`}>Contact</Link></Nav.Item>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
              </Form>
            </Navbar>
            </>

         );
    }
 
export default Header;