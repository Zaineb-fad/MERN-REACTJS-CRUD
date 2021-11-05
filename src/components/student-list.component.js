import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import StudentTableRow from './StudentTableRow';


export default class StudentList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      students: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/students/')
      .then(res => {
        
        this.setState({
          students: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable(deleteStud) {
    return this.state.students.map((res, i) => {
      return <StudentTableRow deleteStudent={deleteStud} obj={res} key={i} />;
    });
  }
  deleteStudent=(data)=>{
    this.setState(function(state){
      return state.students.filter((student)=>student._id!=data)
    })
  }

  render() {
    return (<div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll No</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable(this.deleteStudent)}
        </tbody>
      </Table>
    </div>);
  }
}