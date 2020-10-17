import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PUBLIC_URL } from '../servises/Constant';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Header from './partials/Header';
import About from './pages/About';
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from './partials/Sidebar';
import Footer from './partials/Footer';
import Projects from './project/Projects';
import ProjectCreate from './project/ProjectCreate';
import ProjectView from './project/ProjectView';
export default function App() {
  return (

    <>
      <Router>
        {/* header area navebar */}
        <Header />
        {/* container  */}
        <Container fluid>
          <Row>
            <Col sm={12} md={2} style={{ height: '700px', overflowY: 'scroll', padding: '0px' }} className="pl-3 pt-2">
              <Sidebar />
            </Col>
            <Col sm={12} md={10} style={{ height: '700px', overflowY: 'scroll', padding: '0px' }} className="">
              <div className="pl-2" style={{height:'700px'}}>
                <Switch>
                  <Route path={`${PUBLIC_URL}about`} exact={true} component={About} />
                  <Route path={`${PUBLIC_URL}contact`} exact={true} component={Contact} />
                  <Route path={`${PUBLIC_URL}projects`} exact={true} component={Projects} />
                  <Route path={`${PUBLIC_URL}projectCreate`} exact={true} component={ProjectCreate} />
                  <Route path={`${PUBLIC_URL}projectView/:id`} exact={true} component={ProjectView} />
                  <Route path={`${PUBLIC_URL}`} exact={true} component={Home} />
                </Switch>
              </div>
              {/* Footer component  */}
              <Footer />
            </Col>
          </Row>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

        </Container>
      </Router>
    </>
  );
}


if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}
