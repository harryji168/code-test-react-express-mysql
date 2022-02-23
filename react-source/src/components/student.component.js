import React, { Component } from "react";
import StudentDataService from "../services/student.service";
import InputMask from 'react-input-mask'; 

export default class Student extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeScore = this.onChangeScore.bind(this);
    this.getStudent = this.getStudent.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);

    this.state = {
      currentStudent: {
        id: null,
        name: "",
        score: "" 
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getStudent(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentStudent: {
          ...prevState.currentStudent,
          name: name
        }
      };
    });
  }

  onChangeScore(e) {
    const score = e.target.value;
    if(score>100){  e.target.value=100;}
    
    this.setState(prevState => ({
      currentStudent: {
        ...prevState.currentStudent,
        score: score
      }
    }));
  }

  getStudent(id) {
    StudentDataService.get(id)
      .then(response => {
        this.setState({
          currentStudent: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentStudent.id,
      name: this.state.currentStudent.name,
      score: this.state.currentStudent.score
    };

    StudentDataService.update(this.state.currentStudent.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentStudent: {
            ...prevState.currentStudent,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateStudent() {
    StudentDataService.update(
      this.state.currentStudent.id,
      this.state.currentStudent
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Student was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteStudent() {    
    StudentDataService.delete(this.state.currentStudent.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/Students')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentStudent } = this.state;

    return (
      <div>
        {currentStudent ? (
          <div className="edit-form">
            <h4>Student</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name: {currentStudent.name} </label>
                
              </div>
              <div className="form-group">
                <label htmlFor="score">Score: (100 ~ 0) </label>
                <InputMask mask="999" 
                  maskChar=" " 
                  max="100"
                  min="0" 
                  className="form-control"
                  id="score"
                  value={currentStudent.score}
                  onChange={this.onChangeScore}
                >                   
                </InputMask> 
              </div>

              
            </form> 

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteStudent}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateStudent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Student...</p>
          </div>
        )}
      </div>
    );
  }
}
