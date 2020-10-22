import React, { Component } from 'react';
import { Badge, Button, Card, Form } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { PUBLIC_URL } from '../../servises/Constant';
import { ProjectStore } from '../../servises/ProjectService';

class projectCreate extends Component {
    state = {
        name: "",
        description: "",
        isLoading: false,
        errors: {},
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
        const { history } = this.props;
    // loading effect when form submit 
        this.setState({isLoading:true}); 

        // data submite into form 
            const postData ={
                name: this.state.name,
                description: this.state.description,
                user_id: 1,
            };
            // response after form submite 
          const response = await ProjectStore(postData);
           if(response.success){
              this.setState({
                name:"",
                description:"",
                isLoading:false, 
              });
              history.push(`${PUBLIC_URL}projects`);
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
                <Card.Header>Create Poject 
                    <Badge className="float-right" variant="primary p-2"><Link className=" text-dark" to={`${PUBLIC_URL}projects`}>All projects </Link></Badge>
                    </Card.Header>
                <Card.Body>
                    <Form onSubmit={this.submiuteForm}>
                        {/* project name  */}
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
                    {/* Description  */}
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Project Description <sup className="text-danger"><strong>*</strong></sup>  </Form.Label> 
                        {this.state.errors && this.state.errors.description && (
                            <p className="text-danger">{this.state.errors.description[0]}</p>
                        )}
                        <Form.Control name="description" as="textarea" placeholder="Description" rows={5}
                         value={this.state.description} 
                         onChange={(e)=>this.changeInput(e)}
                        />
                    </Form.Group>
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

export default withRouter(projectCreate);