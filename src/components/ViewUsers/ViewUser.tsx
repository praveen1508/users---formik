import React from 'react';
import { Table } from 'react-bootstrap';
import './ViewUsers.scss';

const ViewUser = () => {
  return (
    <div className='view-user'>
    <h1>List of Users</h1>
    <div className='table-container'>
    <Table striped bordered hover>
        <thead>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Ram</td>
                <td>20</td>
                <td>Male</td>
            </tr>
        </tbody>
    </Table>
    </div>
    </div>
  )
}

export default ViewUser