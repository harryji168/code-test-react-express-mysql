import React, { Component } from "react";
import StudentDataService from "../services/student.service";
import InputMask from 'react-input-mask'; 
export default class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeScore = this.onChangeScore.bind(this);
    this.saveStudent = this.saveStudent.bind(this);
    this.newStudent = this.newStudent.bind(this);

    this.state = {
      id: null,
      name: "",
      score: "", 

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeScore(e) { 
    if(e.target.value>100){  e.target.value=100;}
    this.setState({
      score: e.target.value
    });
  }

  saveStudent() {
    var data = {
      name: this.state.name,
      score: this.state.score
    };
   // console.log(data);
    StudentDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          score: response.data.score, 

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newStudent() {
    this.setState({
      id: null,
      name: "",
      score: "", 
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newStudent}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
               
              <label htmlFor="score">Score: (100 ~ 0) </label>
                <InputMask mask="999" 
                  maskChar=" " 
                  max="100"
                  min="0" 
                  className="form-control"
                  id="score"
                  value={this.state.score}
                  onChange={this.onChangeScore}
                >                   
                </InputMask> 
            </div>

            <button onClick={this.saveStudent} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
