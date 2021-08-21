import React, { Component } from 'react';
import './Parent.css';
import Child from '../Child';

class Parent extends Component {
  constructor(props){
    super(props);
    this.state = {
      fdata: {
        question: '',
        bquestion: null,
        qtype: '',
        atype: ''
      },
      farrdata: []
    };
  }
  handleCallback = (fchildData) =>{
    let tmparr = this.state.farrdata;
    tmparr.push(fchildData)
    this.setState({
      fdata: fchildData, farrdata: tmparr
    })
  }
  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  render() {
        return(
            <div>
                <Child parentCallback = {this.handleCallback}/>
                <br></br>
                {this.state.farrdata.length !== 0?
                <div>
                  {this.state.farrdata.map((mdata,index)=>{
                    return (
                      <div key={index.toString()}>
                        <b>Name:</b> <label>{mdata.fname}</label>
                        <br></br>
                        <b>Age:</b> <label>{mdata.fage}</label>
                        <br></br>
                        <b>Address:</b> <label>{mdata.faddr}</label>
                        <br></br>
                      </div>
                      );
                  })}
                </div>
                :
                <div>Nothing</div>
                }
            </div>
        )
  }
}

export default Parent;