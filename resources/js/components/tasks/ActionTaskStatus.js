import Axios from 'axios';
import React, { Component } from 'react';
import { PUBLIC_URL } from '../../servises/Constant';
import { TaskUpdate } from '../../servises/TaskServie';
class ActionTaskStatus extends Component {

    state = {
        id: this.props.tasksItem.id,
        name: "",
        description: "",
        project_id: "",
        status: "",
        errors: "",
        isLoading: false
    };

    componentDidMount() {
        this.getData();
    }
    // fatch project  data 
    getData = async () => {
        Axios.get(`${PUBLIC_URL}api/task/${this.state.id}`).then((res) => {
            const tasks = res.data.data;
            this.setState({
                name: tasks.name,
                description: tasks.description,
                project_id: tasks.project_id,
                status: tasks.status,
            });
        });
    }



    //  action when enter submite  
    changeVal = async (e) => {

        // data submite into form 
        const postData = {
            name: this.state.name,
            description: this.state.description,
            status: e,
            project_id: this.state.project_id,
        };
        // response after form submite 
        const response = await TaskUpdate(this.state.id, postData);
        if (response.success) {
            console.log(response.success)
            this.getData();

        } else {
            console.log(errors)
            this.setState({
                errors: response.errors,
                isLoading: false,
            });
        }
    };


    render() {
        return (

            <>
                <div className='float-right'>
                    {/* status */}

                    {this.state.status === 0 && (
                        <button onClick={() => this.changeVal('1')} className="btn btn-sm btn-outline-info btn-lg f-size-15">Make As completed</button>
                    )}
                    {this.state.status === 1 && (
                        <button onClick={() => this.changeVal('0')} className="btn btn-sm btn-outline-success btn-lg f-size-15">√ Completed</button>
                    )}
                    {/* status end*/}
                </div>
            </>
        );
    }
}

export default ActionTaskStatus;