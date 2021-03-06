import Axios from 'axios';
import React, { Component } from 'react';
import { Form, FormControl, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../../servises/Constant';

class Sidebar extends Component {

  state = {
    projects: [],
    isloading: false,
    toggleAddTask: false,
  };


  // Component componentDidMount getProject
  componentDidMount() {
    this.getProject();
  }
// get data 
  getProject = async () => {
    this.setState({ isloading: true });
    Axios.get(`${PUBLIC_URL}api/project`).then((res) => {
      const projects = res.data.data;
      this.setState({
        projects,
        isloading: false,
      });
    });
  }

  // task create toggle button 
  toggleAddTask = () => {
    this.setState({
      toggleAddTask: !this.state.toggleAddTask
    })

  }


  render() {
    return (
      <>
        <div className="">
          <Form>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          </Form>

          <span className="info text-dark" onClick={() => this.toggleAddTask()}>
            {/* toggle span */}
            {this.state.toggleAddTask && <Link className="my-2 btn btn-info text-danger d-flex" to={`${PUBLIC_URL}projects`}>Cancel</Link>}
            {!this.state.toggleAddTask && <Link className="my-2 btn btn-info text-dark d-flex" to={`${PUBLIC_URL}projectCreate`}>+ Create New Peoject</Link>}

          </span>

        </div>
        {/* title */}
        <h5 className="border-bottom pb-2 font-weight-bold mb-4"> Projects</h5>
        {/* loading spinner  */}
        { this.state.isloading && <h1 className="text-center"><Spinner animation="border" variant="info" /></h1>}
        {/* loading spinner  end */}

        {/* all projects Items */}
        {this.state.projects.map((item, index) => (
          <div className="ml-2 py-2 f-size-15" key={index} ><Link className="text-dark" to={`${PUBLIC_URL}projectView/${item.id}`}>{item.name}</Link>
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