import Axios from 'axios';
import React, { Component } from 'react';
import { Badge, Button, Card, Col, Form } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { PUBLIC_URL } from '../../servises/Constant';
import { TaskUpdate } from '../../servises/TaskServie';

class TaskEdit extends Component {
  state = {
    id:"",
    name: "",
    project_id: "",
    description: "",
    status: "",
    isLoading: false,
    errors: {},
  };

  componentDidMount() {
    this.getData();
  }
  // fatch project  data 
  getData = async () => {
    this.setState({ isloading: true });
    Axios.get(`${PUBLIC_URL}api/task/${this.props.match.params.id}`).then((res) => {
      const task = res.data.data;
      this.setState({
        id:task.id,
        name: task.name,
        description: task.description,
        status: task.status,
        project_id: task.project_id,
        isloading: false,
      });
    });
  }

  // get data form impute 
  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };


  //  action when enter submite  
  submiuteForm = async (e) => {
    e.preventDefault();
    const { history } = this.props;
    // loading effect when form submit 
    this.setState({ isLoading: true });

    // data submite into form 
    const postData = {
      name: this.state.name,
      description: this.state.description,
      status: this.state.status,
      project_id: this.state.project_id,
    };
    // response after form submite 
    const response = await TaskUpdate(this.state.id, postData);
    if (response.success) {
     console.log(response.success)
      history.push(`${PUBLIC_URL}projectView/${this.state.project_id}`);
    } else {
      this.setState({
        errors: response.errors,
        isLoading: false,
      });
    }
  };


  render() {
    return (
      <>
        <Card className="">
          <Card.Header>Edit Poject
                    <Badge className="float-right" variant="primary p-2"><Link className=" text-dark" to={`${PUBLIC_URL}projectView/${this.state.project_id}`}>Cancel</Link></Badge>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={this.submiuteForm}>
              {/* project name  */}
              <Form.Group>

                <Form.Label>Poject Name <sup className="text-danger"><strong>*</strong></sup> </Form.Label>
                {this.state.errors && this.state.errors.name && (
                  <p className="text-danger">{this.state.errors.name[0]}</p>
                )}
                <Form.Control name="name" type="text" placeholder="Name"
                  value={this.state.name}
                  onChange={(e) => this.changeInput(e)}
                />
              </Form.Group>

              {/* Description  */}
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Task Description <sup className="text-danger"><strong>*</strong></sup>  </Form.Label>
                {this.state.errors && this.state.errors.description && (
                  <p className="text-danger">{this.state.errors.description[0]}</p>
                )}
                <Form.Control name="description" as="textarea" placeholder="Description" rows={5}
                  value={this.state.description}
                  onChange={(e) => this.changeInput(e)}
                />
              </Form.Group>

              {/*  status  */}
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control name="status"  as="select" value={this.state.status} onChange={(e) => this.changeInput(e)}>
                <option value={0}>Processing...</option>
                <option value={1}>Complete</option>
                </Form.Control>
              </Form.Group>
              {/* submit button with loading effect    */}
              {this.state.isLoading && (
                <Button variant="primary" disabled type="submit">
                  Saving...
                </Button>
              )}

              {!this.state.isLoading && (
                <Button variant="primary" type="submit">
                  Save
                </Button>
              )}

            </Form>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default withRouter(TaskEdit);