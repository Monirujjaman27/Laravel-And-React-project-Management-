import Axios from 'axios';
import React, { Component } from 'react';
import { Badge, Button, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../../servises/Constant';
import ActionTaskStatus from '../tasks/ActionTaskStatus';
import TaskCreate from '../tasks/TaskCreate';
import TaskEdit from '../tasks/TaskEdit';
import { DelTask } from '../../servises/TaskServie';


class ProjectView extends Component {
  state = {
    projects: {},
    tasks: [],
    isloading: true,
    toggleAddTask: false,
    toggleEditTask: false,
    errors: "",
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
      toggleAddTask: !this.state.toggleAddTask,
      toggleEditTask: false,
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

  delTask = async (id)=>{
    
    const response = await DelTask(id);
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
        {/* loading spinner  */}
        { this.state.isloading && <h1 className="text-center"><Spinner animation="border" variant="info" /></h1>}
        {/* loading spinner  end */}

        <div className="load">
          <Badge variant="info"><h2>{this.state.projects.name}<sup>{this.state.tasks.length}</sup></h2></Badge>
          <div className='float-right'>
            {/* status button */}
            {this.state.projects.status === 0 && (
              <button className="btn btn-sm btn-secondary btn-lg disabled">Processing...</button>
            )}
            {this.state.projects.status === 1 && (
              <button className="btn btn-sm btn-success btn-lg disabled">√ Complete</button>
            )}
            {/* status button end*/}
            {/* edit project button  */}
            <Link className="btn btn-primary btn-sm mx-1" to={`${PUBLIC_URL}projectEdit/${this.state.projects.id}`}>Edit Project</Link>
            {/* edit project button  */}
            <Button className="info float-right text-dark btn-sm" onClick={() => this.toggleAddTask()}>
              {/* toggle button */}
              {this.state.toggleAddTask && <span><i className="fas fa-times mr-1"></i> Cancel</span>}
              {!this.state.toggleAddTask && <span><i className="fas fa-plus mr-1"></i> Create New Task</span>}
            </Button>
          </div>
        </div>
        {/* Project description  */}
        <p className="p-2">{this.state.projects.description}</p>

        {/* TaskCreate Component */}
        {this.state.toggleAddTask && (
          <TaskCreate projectId={this.props.match.params.id}
            afterCreated={this.afterCreated} />
        )}

        {/* all task item  */}
        {this.state.tasks.map((item, index) => (
          <Card key={index} className="mb-4 mt-2">
            <Card.Header><h4 className="d-inline-flex">{item.name} </h4>


            {/* task status asction  */}
              <ActionTaskStatus tasksItem={item}/>
            {/* task status asction  end*/}


            </Card.Header>
            <Card.Body >
              <Card.Text>{item.description}</Card.Text>
              <Link className="btn btn-primary btn-sm mx-1" to={`${PUBLIC_URL}task-edit/${item.id}`}> <i className="fas fa-edit"></i></Link>
             <span onClick={() => this.delTask(item.id)} className="btn btn-danger btn-sm"><i className="fas fa-trash"></i></span>
            </Card.Body>
            {/* Task Edit Component */}
            {
              this.state.toggleEditTask && (
                <TaskEdit projectId={this.props.match.params.id} />
              )
            }

          </Card>
        ))
        }
      </>
    );
  }
}

export default ProjectView;