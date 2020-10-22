import Axios from 'axios';
import React, { Component } from 'react';
import { Badge, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../../servises/Constant';
import { DelTask } from '../../servises/TaskServie';

class Home extends Component {

  state = {
    tasks: [],
    isloading: false,
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({isloading:true});
    Axios.get(`${PUBLIC_URL}api/task`).then((res) => {
      const tasks = res.data.data;
      this.setState({
        tasks,
        isloading: false,
      });
    });
  }

  // Task delete action 
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

        <div className="mt-2">
        <Badge variant="info"><h2>Tasks <sup>{this.state.tasks.length}</sup></h2></Badge>
        <Badge variant="info float-right p-2">+Create New Task</Badge>
        </div>

        {this.state.tasks.map((item, index) => (
          <Card key={index} className="mb-4 mt-2">
            <Card.Header><h4 className="d-inline-flex">{item.name} </h4></Card.Header>
            <Card.Body>
              <Card.Text>{item.description}</Card.Text>
              <Link className="btn btn-primary btn-sm mx-1" to={`${PUBLIC_URL}task-edit/${item.id}`}> <i className="fas fa-edit"></i></Link>
              <span onClick={() => this.delTask(item.id)} className="btn btn-danger btn-sm"><i className="fas fa-trash"></i></span>
          </Card.Body>
        </Card>
        ))}
      </>
  );
}
}

export default Home;