import Axios from 'axios';
import React, { Component } from 'react';
import {Form, FormControl, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../../servises/Constant';

class Sidebar extends Component {

  state = {
    projects: [],
    isloading: false,
  };

  componentDidMount () {
    this.getProject();
  }

  getProject = async() => {
    this.setState({isloading:true});
    Axios.get(`${PUBLIC_URL}api/project`).then((res) => {
      const projects = res.data.data;
      this.setState({
        projects,
        isloading: false,
      });
    });
  }

  render() {
    return (
      <>
        <div className="">
          <Form>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          </Form>
          <Link className="my-2 btn btn-info text-dark" to={`${PUBLIC_URL}projectCreate`}>+ Create New Peoject</Link>
        </div>      
        <h5 className="border-bottom pb-2 font-weight-bold mb-4"> Projects</h5>
        
        {/* loading spinner  */}
        { this.state.isloading && <h1 className="text-center"><Spinner animation="border" variant="info" /></h1>}
        {/* loading spinner  end */}


        {this.state.projects.map((item, index) => (
          <div className="ml-2" key={index} ><Link className="text-dark" to={`${PUBLIC_URL}projectView/${item.id}`}>{item.name}</Link>
            
            {/* task count by project   */}
            {item.tasks_count > 0 && (
              <sup className="text-primary border rounded">{item.tasks_count}</sup>
            )}
          </div>
        ))}
      </>


    );
  }
}

export default Sidebar;