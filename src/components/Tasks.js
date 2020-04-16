import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import List from './tasks/List'
import CreateTasks from './tasks/create_tasks/CreateTasks'

class Tasks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: []
        }
    }

    componentDidMount() {
        this.loadTasks()
    }

    loadTasks = async () => {
        let response = await fetch('http://localhost:3001/tasks')
        const tasks = await response.json()
        this.setState({ tasks })
    }

    deleteAllTask = () => {
        if (window.confirm('Are you sure you want to delete all tasks done?')) {
            this.handleTaskDone().map(async task => {
                await fetch(`http://localhost:3001/tasks/${task.id}`, { method: 'DELETE' })
                this.loadTasks()
            })
        }
    }

    handleTaskDone = () => {
        return this.state.tasks.filter(task => task.done === true)
    }

    handleTaskToDo = () => {
        return this.state.tasks.filter(task => task.done !== true)
    }

    render() {

        return (
            <Row>
                <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
                    {
                        this.handleTaskToDo().length > 0 ?
                        
                            <>
                                <p className="title">To-Do</p>
                                <List tasks={this.handleTaskToDo()} loadTasks={this.loadTasks} />
                            </>
                          : null  
                    }
                    <CreateTasks loadTasks={this.loadTasks} float={this.handleTaskToDo().length === 0 ? 'float-left' : 'float-right'}/>
                </Col>
                {
                    this.handleTaskDone().length > 0
                        ?
                        <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
                            <p className="title">Done</p>
                            <List tasks={this.state.tasks.filter(task => task.done === true)} loadTasks={this.loadTasks} />
                            <Button variant="danger" className="float-right remove_task_btn" onClick={this.deleteAllTask}>Remove all</Button>
                        </Col>
                        : null
                }
            </Row>
        )
    }
}

export default Tasks