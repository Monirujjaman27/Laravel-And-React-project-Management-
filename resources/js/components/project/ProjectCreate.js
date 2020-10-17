import React, { Component } from 'react';
import { Badge, Card, Form, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PUBLIC_URL } from '../../servises/Constant';

class ProjectCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <>
                {/* loading spinner  */}
                { this.state.isloading && <h1 className="text-center"><Spinner animation="border" variant="info" /></h1>}
                {/* loading spinner  end */}

                <Card className="mb-4 mt-2">
                    <Card.Header>
                        <h3 className="d-inline-flex">Create New Project </h3>
                        <Link className="my-2 btn btn-info text-dark float-right" to={`${PUBLIC_URL}projects`}> Go All Projects</Link>

                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" placeholder="Enter Project Name" name="name" />
                            </div>
                            <div className="form-group">
                                <label>Project Description</label>
                                <textarea className="form-control" rows="5" name="description" placeholder="Enter your project description"></textarea>
                            </div>
                            <input className="btn btn-success" type="submit" value="Save"></input>
                        </Form>
                    </Card.Body>
                </Card>
            </>

        );
    }
}

export default ProjectCreate;