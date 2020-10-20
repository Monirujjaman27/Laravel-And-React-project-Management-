import Axios from 'axios';
import React, { Component } from 'react';
import { Badge, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../../servises/Constant';

class Home extends Component {

  state = {
    projects: [],
    isloading: false,

  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({ isloading: true });
    Axios.get(`${PUBLIC_URL}api/project`).then((res) => {
      const projects = res.data.data;
      this.setState({
        projects,
        isloading: false
      });
    });
  }

  render() {
    return (
      <>

        <div className="">
          <Badge variant="info"><h2>Projects <sup>{this.state.projects.length}</sup></h2></Badge>
          <Badge variant="info float-right text-dark p-2"><Link className="text-dark" to={`${PUBLIC_URL}projectCreate`}>+Create New Projects</Link></Badge>
        </div>


        {/* loading spinner  */}
        { this.state.isloading && <h1 className="text-center"><Spinner animation="border" variant="info" /></h1>}
        {/* loading spinner  end */}


        {this.state.projects.map((item, index) => (
          <Card key={index} className="mb-4 mt-2">
            <Card.Header><h4 className="d-inline-flex">{item.name}
              {item.tasks_count > 0 && (
                <sup className="text-primary">{item.tasks_count}</sup>
              )}
            </h4></Card.Header>
            <Card.Body>
              <Card.Text>{item.description}</Card.Text>
              <Link className=" text-white btn btn-success mr-2" to={`${PUBLIC_URL}projectView/${item.id}`}>View</Link>
              <Link className=" text-white btn btn-info mr-2" to={`${PUBLIC_URL}editProject/`}>Edit</Link>
              <Link className=" text-white btn btn-danger mr-2" to={`${PUBLIC_URL}editProject/`}>Edit</Link>
            </Card.Body>
          </Card>
        ))}
      </>
    );
  }
}

export default Home;