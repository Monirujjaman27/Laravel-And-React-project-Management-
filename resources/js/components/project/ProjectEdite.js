import Axios from 'axios';
import React, { Component } from 'react';
import { Badge, Button, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../../servises/Constant';
import TaskCreate from '../tasks/TaskCreate';

class ProjectEdite extends Component {

  state = {
    projects: {},
    tasks: [],
    isloading: true,
    toggleAddTask: false,
  };

  componentDidMount() {
    this.getData();
  }

// fatch project  data 
  getData = async () => {
    this.setState({ isloading: true });
    Axios.get(`${PUBLIC_URL}api/project/${this.props.match.params.id}`).then((res) => {
      const projects = res.data.data;
      this.setState({
        projects,
        tasks: res.data.data.tasks,
        isloading: false,
      });
    });
  }

  // button behavior after click
  toggleAddTask = () => {
    this.setState({
      toggleAddTask: !this.state.toggleAddTask
    });
  };
  // afterCreated task 
  afterCreated = (data) => {
    this.toggleAddTask();
    let task = this.state.tasks;
    task.unshift(data);
    this.setState({
      tasks: task,
    });
  };


  render() {
    return (
      <>
        {/* loading spinner  */}
        { this.state.isloading && <h1 className="text-center"><Spinner animation="border" variant="info" /></h1>}
        {/* loading spinner  end */}

        <div className="load">
          <Badge variant="info"><h2>{this.state.projects.name}<sup>{this.state.tasks.length}</sup></h2></Badge>
          <Button variant="info float-right text-dark p-2" onClick={() => this.toggleAddTask()}>
            {/* toggle button */}
            {this.state.toggleAddTask && <span><i className="fas fa-times mr-1"></i> Cancel</span>}
            {!this.state.toggleAddTask && <span><i className="fas fa-plus mr-1"></i> Create New Task</span>}

          </Button>
        </div>
        {/* Project description  */}
        <p>{this.state.projects.description}</p>

        {/* TaskCreate Component */}
        {this.state.toggleAddTask && (
          <TaskCreate projectId={this.props.match.params.id}
            afterCreated={this.afterCreated} />
        )}
        {/* all task item  */}
        {this.state.tasks.map((item, index) => (
          <Card key={index} className="mb-4 mt-2">
            <Card.Header><h4 className="d-inline-flex">{item.name} </h4></Card.Header>
            <Card.Body>
              <Card.Text>{item.description}</Card.Text>
              <Link className=" text-white btn btn-info mr-2" to={`${PUBLIC_URL}editProject/`}><i className="fas fa-edit"></i></Link>
              <Link className=" text-white btn btn-danger mr-2" to={`${PUBLIC_URL}editProject/`}><i className="fas fa-trash"></i></Link>
            </Card.Body>
          </Card>
        ))}
      </>
    );
  }
}

export default ProjectEdite;