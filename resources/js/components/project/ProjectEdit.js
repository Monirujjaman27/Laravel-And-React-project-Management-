import Axios from 'axios';
import React, { Component } from 'react';
import { Badge, Button, Card, Col, Form } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { PUBLIC_URL } from '../../servises/Constant';
import { ProjectUpdate } from '../../servises/ProjectService';

class ProjectEdit extends Component {
  state = {
    id:"",
    name: "",
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
    Axios.get(`${PUBLIC_URL}api/project/${this.props.match.params.id}`).then((res) => {
      const projects = res.data.data;
      this.setState({
        id:projects.id,
        name: projects.name,
        description: projects.description,
        status: projects.status,
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
      user_id: 1,
    };
    // response after form submite 
    const response = await ProjectUpdate(this.state.id, postData);
    if (response.success) {
     console.log(response.success)
      history.push(`${PUBLIC_URL}projectView/${this.props.match.params.id}`);
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
                    <Badge className="float-right" variant="primary p-2"><Link className=" text-dark" to={`${PUBLIC_URL}projectView/${this.state.id}`}>Back To project </Link></Badge>
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
                <Form.Label>Project Description <sup className="text-danger"><strong>*</strong></sup>  </Form.Label>
                {this.state.errors && this.state.errors.description && (
                  <p className="text-danger">{this.state.errors.description[0]}</p>
                )}
                
              {/* Project status  */}
                <Form.Control name="description" as="textarea" placeholder="Description" rows={5}
                  value={this.state.description}
                  onChange={(e) => this.changeInput(e)}
                />
              </Form.Group>

              {/* Project status  */}


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

export default withRouter(ProjectEdit);