import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const url = 'http://localhost:3001/tasks'

class List extends Component {

    async deleteTask (task) {
        if (window.confirm(`Are you sure you want to delete: ${task.title}`)) {
            await fetch(`${url}/${task.id}`, { method: 'DELETE' })
            this.props.loadTasks()
        }
    }

    async checkTask (task){
        await fetch(`${url}/${task.id}`, { 
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                task: { done: true}
            })
        })
        this.props.loadTasks()
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    <Table responsive>
                        <tbody>
                            {this.props.tasks.map((task, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="col-md-10">{task.title}</td>
                                        <td>
                                            {
                                                task.done === false ?
                                                    <b className="check" href="#" onClick={() => this.checkTask(task)}>
                                                        <FontAwesomeIcon icon="check-circle" />
                                                    </b>
                                                    : null
                                            }
                                        </td>
                                        <td>
                                            <b className="delete" onClick={() => this.deleteTask(task)}>
                                                <FontAwesomeIcon icon="trash-alt" />
                                            </b>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        )
    }
}

export default List