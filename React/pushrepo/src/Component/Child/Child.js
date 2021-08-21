import React, { Component } from 'react';
import './Child.css';
import { ReactVideo } from "reactjs-media";

class Child extends Component {
  // const [name, setName];
  // const [selectedFile, setSelectedFile];
  constructor(props){
    super(props);
    // [name, setName] = useState("");
    // [selectedFile, setSelectedFile] = useState(null);
    this.state = {
      medctrl: true,
      cctrl: false,
      statedata: '',
      btnctrl: {imgcnt:'Add Image',vdcnt:'Add Video'}
    }
  }
  onTrigger = (event) => {
    // let fdata = {
    //   fname: event.target.fname.value,
    //   fage: event.target.fage.value,
    //   faddr: event.target.faddr.value
    // }
    // this.props.parentCallback(fdata);
    event.preventDefault();
  }
  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  onbtnTrigger = (event) => {
    let ctrdata = event.target.value;
    if(ctrdata === 'imagebtn'){
      this.setState({
        medctrl: true,
        cctrl: false,
        btnctrl: {imgcnt:'Remove Image',vdcnt:'Add Video'}
      })
    } else{
      this.setState({
        medctrl: false,
        cctrl: true,
        btnctrl: {imgcnt:'Add Image',vdcnt:'Remove Video'}
      })
    }
  }
  selectFile = (event) => {
    
  }
  render() {
    return(
      <div>
          <form onSubmit = {this.onTrigger}>
              Enter Question: <input type = "text" name = "fquestion" placeholder = "Enter Question"/>
              <br></br>
              Enter Question Type: 
              <button value="imagebtn" onClick={this.onbtnTrigger} {...this.state.statedata}>{this.state.btnctrl.imgcnt}</button>{' '}
              <button value="vdobtn" onClick={this.onbtnTrigger} {...this.state.statedata}>{this.state.btnctrl.vdcnt}</button>
              {this.state.medctrl?
              <div>
                Upload Image <input type="file" accept="image/*" onChange={this.selectFile} />
              </div>
              :
              <div>
                Upload Video <input type="file" accept="video/*" onChange={this.selectFile} />
                <ReactVideo
                  src="https://www.example.com/url_to_video.mp4"
                  poster="https://www.example.com/poster.png"
                  primaryColor="red"
                />
              </div>}
              <br></br>
              Enter Answer type: <input type = "text" name = "" placeholder = "Enter Address"/>
              <br></br>
              <input type = "submit" value = "Submit"/>
              <br></br><br></br>
          </form>
      </div>
      )
  }
}

export default Child;