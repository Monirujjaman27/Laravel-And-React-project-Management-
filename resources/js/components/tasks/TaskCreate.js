import React, { Component } from 'react';
import {Button, Card, Form } from 'react-bootstrap';
import {withRouter } from 'react-router-dom';
import { PUBLIC_URL } from '../../servises/Constant';
import { TaskStore } from '../../servises/TaskServie';

class TaskCreate extends Component {
    state = {
        name: "",
        description: "",
        isLoading: false,
        errors: {},
        pps:this.props,
    };

    // get data form impute 
    changeInput = (e)=>{
        this.setState({
       [e.target.name]: e.target.value,
        });
    };

    //  action when enter submite  
    submiuteForm = async(e)=>{
        e.preventDefault();
        // const { history } = this.props;
    // loading effect when form submit 
        this.setState({isLoading:true}); 

        // data submite into form 
            const postData ={
                name: this.state.name,
                description: this.state.description,
                project_id: this.props.projectId,
            };
            // response after form submite 
          const response = await TaskStore(postData);
           if(response.success){
              this.setState({
                name:"",
                description:"",
                isLoading:false, 
              });
              this.props.afterCreated(response.data);
            // history.push(`${PUBLIC_URL}projectView/${this.props.projectId}`);
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
            <Card>
                <Card.Header>Create Task</Card.Header>
                <Card.Body>
                    <Form onSubmit={this.submiuteForm}>
                        {/* project name  */}

                        <div className="row">
                          <div className="col-sm-6">
                          <Form.Group>
                                <Form.Label>Name <sup className="text-danger"><strong>*</strong></sup> </Form.Label>
                                {this.state.errors && this.state.errors.name && (
                                    <p className="text-danger">{this.state.errors.name[0]}</p>
                                )}
                                <Form.Control name="name" type="text" placeholder="Name"
                                value={this.state.name} 
                                onChange={(e)=>this.changeInput(e)}
                                />
                           </Form.Group>
                          </div>
                          <div className="col-sm-6">

                             {/* Description  */}
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Description <sup className="text-danger"><strong>*</strong></sup> </Form.Label> 
                                {this.state.errors && this.state.errors.description && (
                                    <p className="text-danger">{this.state.errors.description[0]}</p>
                                )}
                                <Form.Control name="description" as="textarea" placeholder="Description" rows={2}
                                value={this.state.description} 
                                onChange={(e)=>this.changeInput(e)}
                                />
                            </Form.Group>
                          </div>
                        </div>
                   
                     {/* submit button with loading effect    */}

                    {this.state.isLoading &&(
                        <Button variant="primary" disabled type="submit">
                              Saving...
                        </Button>
                    )}

                    {!this.state.isLoading &&(
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

export default withRouter(TaskCreate);