import React, { Component } from "react";
import StudentDataService from "../services/student.service";
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';





export default class StudentsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveStudents = this.retrieveStudents.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveStudent = this.setActiveStudent.bind(this);
    this.removeAllStudents = this.removeAllStudents.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      students: [],
      currentStudent: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveStudents();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveStudents() {
    StudentDataService.getAll()
      .then(response => {
        this.setState({
          students: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveStudents();
    this.setState({
      currentStudent: null,
      currentIndex: -1
    });
  }

  setActiveStudent(student, index) {
    this.setState({
      currentStudent: student,
      currentIndex: index
    });
  }

  removeAllStudents() {
    StudentDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentStudent: null,
      currentIndex: -1
    });

    StudentDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          students: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, students, currentStudent, currentIndex } = this.state;

console.log("=="+students.length);
//console.log("=="+students);
//const total_score=0;
// for(const student in students){
//   total_score += ${students[score]};
// }
var total_score = 0;
students.map((student, index) => (
  total_score += parseInt(student.score)
)) 
const average=parseInt(total_score/students.length*10)/10;
    return (
      <div className="list row">
        
        <div className="col-md-6">
          <h4>Students List</h4>
          <Table className="list-group">
          <TableHead>
            <TableRow>
              <TableCell align="center">name</TableCell>
              <TableCell align="center">score</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody> 
           {
            
            students &&
              students.map((student, index) => (
                <TableRow
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveStudent(student, index)}
                  key={index}
                >
                   <TableCell align="center"> {student.name}</TableCell>                
                   <TableCell align="center"> {student.score}</TableCell>
                </TableRow>
              ))
               
              }
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell align="center">average</TableCell>
              <TableCell align="center">{average}</TableCell> 
            </TableRow>
          </TableHead>
          </Table>          

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllStudents}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentStudent ? (
            <div>
              <h4>Student</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentStudent.name}
              </div>
              <div>
                <label>
                  <strong>Score:</strong>
                </label>{" "}
                {currentStudent.score}
              </div>
             

              <Link
                to={"/students/" + currentStudent.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Student...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
