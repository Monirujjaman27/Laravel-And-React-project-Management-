import Axios from 'axios';
import React, { Component } from 'react';
import { Badge, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../../servises/Constant';

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
              <Link className=" text-white btn btn-info mr-2" to={`${PUBLIC_URL}editProject/`}><i class="fas fa-edit"></i></Link>
              <Link className=" text-white btn btn-danger mr-2" to={`${PUBLIC_URL}editProject/`}><i class="fas fa-trash"></i></Link>
          </Card.Body>
        </Card>
        ))}
      </>
  );
}
}

export default Home;