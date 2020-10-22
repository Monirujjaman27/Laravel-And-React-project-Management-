import Axios from 'axios';
import React, { Component } from 'react';
import { Badge, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../../servises/Constant';
import { DelProject } from '../../servises/ProjectService';



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

  delAction = async (id)=>{
    const response = await DelProject(id);
    if (response.success) {
      this.getData();
     } else {
       this.setState({
         errors: response.errors,
         isLoading: false,
       });
     }
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
              <Link className=" text-white btn btn-success btn-sm mr-2" to={`${PUBLIC_URL}projectView/${item.id}`}> <i className="fas fa-eye"></i></Link>
              <Link className="btn btn-primary btn-sm btn-sm mx-1" to={`${PUBLIC_URL}projectEdit/${item.id}`}><i className="fas fa-edit"></i></Link>
              <span onClick={() => this.delAction(item.id)} className="btn btn-danger btn-sm"><i className="fas fa-trash"></i></span>
            </Card.Body>
          </Card>
        ))}
      </>
    );
  }
}

export default Home;