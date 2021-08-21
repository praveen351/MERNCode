import React, { Component } from 'react';
import './Parent.css';
import Child from '../Child';
import { stripHtml } from "string-strip-html";
// import { Button } from 'react-bootstrap';
class Parent extends Component {
  constructor(props){
    super(props);
    this.state = {
      fdata: {
        qvalue: '',
        picdata: null,
        viddata: null,
        answertype: '',
        answerlist: []
      },
      farrdata: [],
      colname: ["Index","Question", "Question Type", "Answer", "Answer Type"]
    };
  }
  handleCallback = (fchildData) =>{
    console.log(fchildData)
    let tmparr = this.state.farrdata;
    tmparr.push(fchildData)
    this.setState({
      fdata: fchildData, farrdata: tmparr
    })
    console.log(this.state)
  }

  getData = (data, index)=>{
    this.child.childMethod(data);
  }
  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  render() {
        let styles = {
          "width": "600px"
        };
        return(
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6">
                      <Child onRef={ref => (this.child = ref)} parentCallback = {this.handleCallback}/>
                    </div>
                    <div className="col-lg-6">
                    <table className="table table-striped" style={styles}>
                          <thead>
                              <tr>
                                  {this.state.colname.map((name, index) => {
                                      return (
                                          <td key={index}><b>{name}</b></td>
                                      );
                                  })}
                              </tr>
                          </thead>
                          <tbody>
                              {this.state.farrdata.map((qdata, index) => {
                                  return (
                                      <tr key={index} onClick={(event) => this.getData(qdata,index)}>
                                          <td>{index + 1}</td>
                                          <td>{stripHtml(qdata.qvalue, {stripTogetherWithTheirContents: ["script","style","xml","pre"]}).result}</td>
                                          <td>{qdata.answertype}</td>
                                          <td>{qdata.answerlist.length}</td>
                                          <td>{qdata.picdata !== null?'image':'video'}</td>
                                          {/* <td><Button variant="contained" color="secondary" onClick={() => this.handleOnDelete(employee)}><DeleteRoundedIcon /></Button></td>
                                          <td><Button variant="contained" color="primary" onClick={() => this.handleOnEdit(employee)}><EditIcon /></Button></td> */}
                                      </tr>
                                  );
                              })}
                          </tbody>
                      </table>
                    </div>
                  </div>
              </div>
        )
  }
}

export default Parent;