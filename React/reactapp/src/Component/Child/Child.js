import React, { Component } from 'react';
import './Child.css';
// import { ReactVideo } from "reactjs-media";

class Child extends Component {
  // const [name, setName];
  // const [selectedFile, setSelectedFile];
  constructor(props){
    super(props);
    // [name, setName] = useState("");
    // [selectedFile, setSelectedFile] = useState(null);
    this.state = {
      medctrl: true,
      btnctrl: {imgcnt:'Remove Image',vdcnt:'Add Video'},
      previewImage: undefined,
      previewVideo: undefined,
      setimgc: false,
      setvdo: false,
      bactrl: 0
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
      if(this.state.medctrl){
        this.setState({
          medctrl: false,
          btnctrl: {imgcnt:'Add Image',vdcnt:'Remove Video'},
          previewImage: undefined,
          previewVideo: undefined,
          setimgc: false,
          setvdo: false
        })
      }else{
        this.setState({
          medctrl: true,
          previewImage: undefined,
          previewVideo: undefined,
          setimgc: false,
          setvdo: false,
          btnctrl: {imgcnt:'Remove Image',vdcnt:'Add Video'}
        })
      }
    } else{
      if(!this.state.medctrl){
        this.setState({
          medctrl: true,
          previewImage: '',
          previewVideo: '',
          setimgc: false,
          setvdo: false,
          btnctrl: {imgcnt:'Remove Image',vdcnt:'Add Video'}
        })
      }else{
        this.setState({
          medctrl: false,
          previewImage: undefined,
          previewVideo: undefined,
          setimgc: false,
          setvdo: false,
          btnctrl: {imgcnt:'Add Image',vdcnt:'Remove Video'}
        })
      }
    }
  }
  selectFile = (event) => {
    let ctrdata = event.target.accept;
    if(ctrdata === 'image/*'){
      this.setState({
        medctrl: true,
        btnctrl: {imgcnt:'Remove Image',vdcnt:'Add Video'},
        previewImage: URL.createObjectURL(event.target.files[0]),
        previewVideo: undefined,
        setimgc: true,
        setvdo: false
      })
      
    } else{
      this.setState({
        medctrl: false,
        btnctrl: {imgcnt:'Add Image',vdcnt:'Remove Video'},
        previewImage: undefined,
        previewVideo: URL.createObjectURL(event.target.files[0]),
        setimgc: false,
        setvdo: true
      })
    }
  }
    selectAnswer = (event) => {
      if(event.target.value==='singlehoice'){

      } else if(event.target.value==='multichoice'){
        
      }else{

      }
    }
  

  render() {
    return(
      <div>
          <form onSubmit = {this.onTrigger}>
              Enter Question: <input type = "text" name = "fquestion" placeholder = "Enter Question"/>
              <br></br>
              Enter Question Type: 
              <button value="imagebtn" onClick={this.onbtnTrigger}>{this.state.btnctrl.imgcnt}</button>{' '}
              <button value="vdobtn" onClick={this.onbtnTrigger}>{this.state.btnctrl.vdcnt}</button>
              {this.state.medctrl?
              <div>
                Upload Image <input type="file" accept="image/*" onChange={this.selectFile} />
                {this.state.setimgc?
                  <img className="preview" id="imgId" src={this.state.previewImage} alt="" height="500px" width="500px"/> :
                  <> </>
                }
              </div>
              :
              <div>
                Upload Video <input type="file" accept="video/*" onChange={this.selectFile} />
                {this.state.setvdo?
                  <video width="50%" height="250" controls>
                    <source id="vdoId" src={this.state.previewVideo} type="video/" />
                  </video>
                :<></>
                }
              </div>}
              <br></br>
              Enter Answer type: <button value="singlehoice" onClick={this.selectAnswer}>Single Choice</button>{' '}
              <button value="multichoice" onClick={this.selectAnswer}>Multiple Choice</button>{' '}
              <button value="textbox" onClick={this.selectAnswer}>True False</button>
              <br></br>
              <input type = "submit" value = "Submit"/>
              <br></br><br></br>
          </form>
      </div>
      )
  }
}
export default Child;