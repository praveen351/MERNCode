import React, { Component } from 'react';
import './Child.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import JoditEditor from "jodit-react";
import { Button } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Image from 'material-ui-image'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import TextField from '@material-ui/core/TextField';

const useStyles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    minWidth: 500,
    minHeight: 500,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  }
});
class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      medctrl: true,
      display: false,
      btnctrl: {
        imgcnt: true,
        vdcnt: false,
      },
      previewImage: undefined,
      previewVideo: undefined,
      setimgc: false,
      setvdo: false,
      fdata: {
        qvalue: '',
        picdata: null,
        viddata: null,
        answertype: '',
        answerlist: []
      },
      bactrl: 0
    }
    this.config = { readonly: false }
    this.addQuestionChange = this.addQuestionChange.bind(this);
    this.addAnswerChange = this.addAnswerChange.bind(this);
    this.selectFile = this.selectFile.bind(this);
    this.answertype = React.createRef();
  }

  jodit;
  setRef = jodit => this.jodit = jodit;

  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  childMethod(fdatapobject) {
    console.log(fdatapobject)
    let tbactrl = 0;
    if (fdatapobject.answertype === 'singlehoice')
      tbactrl = 1
    else if (fdatapobject.answertype === 'multichoice')
      tbactrl = 2
    else if (fdatapobject.answertype === 'textbox')
      tbactrl = 3
    var someProperty = { ...this.state.fdata }
    var someProperty1 = { ...this.state.btnctrl }
    someProperty.qvalue = fdatapobject.qvalue;
    someProperty.answertype = fdatapobject.answertype;
    someProperty.answerlist = fdatapobject.answerlist;

    if (fdatapobject.picdata !== null) {
      someProperty.picdata = fdatapobject.picdata
      someProperty1.imgcnt = true
      someProperty1.vdcnt = false
      this.setState({
        edit: true,
        medctrl: true,
        previewImage: URL.createObjectURL(someProperty.picdata),
        bactrl: tbactrl,
        setimgc: true
      })
    } else if (fdatapobject.viddata !== null) {
      someProperty.viddata = fdatapobject.viddata
      someProperty1.imgcnt = false
      someProperty1.vdcnt = true
      this.setState({
        edit: true,
        medctrl: false,
        previewVideo: URL.createObjectURL(someProperty.viddata),
        bactrl: tbactrl,
        setvdo: true
      })
    }
    this.setState({
      fdata: someProperty
    })
    this.setState({
      btnctrl: someProperty1
    })
  }

  onTrigger = (event) => {

  }

  addQuestionChange = (quevalue) => {
    var someProperty = { ...this.state.fdata }
    someProperty.qvalue = quevalue;
    this.setState({ fdata: someProperty })
  }

  onbtnTrigger = (event) => {
    let ctrdata = event.target.innerText.toUpperCase();
    var someProperty = { ...this.state.btnctrl }
    if (ctrdata === 'Add Image'.toUpperCase()) {
      someProperty.imgcnt = true;
      someProperty.vdcnt = false;
      this.setState({
        btnctrl: someProperty
      })
      this.setState({
        medctrl: true
      })
    } else {
      someProperty.imgcnt = false;
      someProperty.vdcnt = true;
      this.setState({
        btnctrl: someProperty
      })
      this.setState({
        medctrl: false
      })
    }
  }

  selectFile = (file, accept) => {
    let ctrdata = accept;
    var someProperty = { ...this.state.fdata }
    if (ctrdata === 'image/*') {
      someProperty.picdata = file;
      this.setState({
        previewImage: URL.createObjectURL(file),
        setimgc: true
      })
    } else {
      someProperty.viddata = file;
      this.setState({
        previewVideo: URL.createObjectURL(file),
        setvdo: true
      })
    }
    this.setState({
      fdata: someProperty
    })
  }

  selectAnswer = (event) => {
    console.log(event.target.value)
    var someProperty = { ...this.state.fdata }
    someProperty.answerlist = []
    if (event.target.value === 'singlehoice') {
      someProperty.answertype = 'singlehoice'
      this.setState({
        bactrl: 1,
        fdata: someProperty
      })
    }
    else if (event.target.value === 'multichoice') {
      someProperty.answertype = 'multichoice'
      this.setState({
        bactrl: 2,
        fdata: someProperty
      })
    } else if (event.target.value === 'textbox') {
      someProperty.answertype = 'textbox'
      this.setState({
        bactrl: 3,
        fdata: someProperty
      })
    } else {
      someProperty.answertype = 'truefalse'
      this.setState({
        bactrl: 4,
        fdata: someProperty
      })
    }
  }

  addAnswerChange = (answerdata, key) => {
    var someProperty = { ...this.state.fdata }
    someProperty.answerlist[key] = answerdata
    this.setState({
      fdata: someProperty
    })
  }

  addAnswer = (event) => {
    var someProperty = { ...this.state.fdata }
    someProperty.answerlist.push('');
    this.setState({
      fdata: someProperty
    })
    this.setState({
      display: true
    })
  }
  render() {
    const { classes } = this.props;
    var bvalue = this.state.edit ? 'Update' : 'Submit';
    return (
      <div>
        <Card style={{ maxHeight: 1000, minWidth: 500, overflow: 'auto' }}>
          <div className="container">
            <form onSubmit={this.onTrigger} encType="multipart/form-data">
              Enter Question:
              <JoditEditor
                // ref={this.editor}
                editorRef={this.setRef}
                value={this.state.fdata.qvalue}
                config={this.config}
                // onBlur={newContent => this.setState({content: newContent})}
                onChange={newContent => this.addQuestionChange(newContent)}
              />
              <br></br>
              Enter Question Type &nbsp;&nbsp;&nbsp;
              <Button
                className="btn-choose"
                variant="contained"
                color="primary"
                onClick={this.onbtnTrigger}
                startIcon={<ImageIcon />}
                disabled={this.state.btnctrl.imgcnt}>Add Image</Button> &nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                className="btn-choose"
                variant="contained"
                color="primary"
                onClick={this.onbtnTrigger}
                startIcon={<VideoLibraryIcon />}
                disabled={this.state.btnctrl.vdcnt}>Add Video</Button>
              <br />
              <br />
              {this.state.medctrl ?
                <div>
                  Upload Image &nbsp;&nbsp;&nbsp;
                  <input
                    accept="image/*"
                    id="contained-button-image"
                    multiple
                    type="file"
                    onChange={e => this.selectFile(e.target.files[0], e.target.accept)}
                    hidden
                  />
                  <label htmlFor="contained-button-image">
                    <Button
                      variant="contained"
                      color="default"
                      className="btn-choose"
                      startIcon={<CloudUploadIcon />}
                      component="span">Upload
                    </Button>
                  </label>
                  {this.state.setimgc ?
                    <Image
                      className="preview"
                      src={this.state.previewImage}
                      alt="Not Available"
                      height="400px"
                      width="600px" />
                    :
                    <> </>
                  }
                </div>
                :
                <div>
                  Upload Video &nbsp;&nbsp;&nbsp;
                  <input
                    accept="video/*"
                    id="contained-button-video"
                    multiple
                    type="file"
                    onChange={e => this.selectFile(e.target.files[0], e.target.accept)}
                    hidden
                  />
                  <label htmlFor="contained-button-video">
                    <Button
                      variant="contained"
                      color="default"
                      className="btn-choose"
                      startIcon={<CloudUploadIcon />}
                      component="span">Upload
                    </Button>
                  </label>
                  {this.state.setvdo ?
                    <video width="50%" src={this.state.previewVideo} height="250" controls>
                    </video>
                    : <></>
                  }
                </div>}
              <br></br>
              Enter Answer type &nbsp;&nbsp;&nbsp;
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="select-answertype">Answer Type</InputLabel>
                <Select
                  labelId="select-answertype"
                  id="select-answertype-outlined"
                  value={this.state.fdata.answertype}
                  onChange={this.selectAnswer}
                  text={this.state.fdata.answertype}
                  label="Answer Type">
                  <MenuItem value="singlehoice">Single Choice</MenuItem>
                  <MenuItem value="multichoice">Multiple Choice</MenuItem>
                  <MenuItem value="textbox">TextBox</MenuItem>
                  <MenuItem value="truefalse">True False</MenuItem>
                </Select>
              </FormControl>
              <br></br>
              {(this.state.bactrl === 1 || this.state.bactrl === 2) ?
                <div>
                  <Button
                    className="btn-choose"
                    variant="contained"
                    color="primary"
                    onClick={this.addAnswer}
                    startIcon={<QuestionAnswerIcon />}>Add Answers
                  </Button>
                  <br />
                  {this.state.display ?
                    <Card style={{ maxHeight: 250, maxWidth: 250, overflow: 'auto' }}>
                      <br />
                      <div className="container">
                        {this.state.fdata.answerlist.map((mdata, index) => {
                          return (
                            <div key={index.toString()}>
                              <TextField
                                value={mdata}
                                placeholder="Enter Answer"
                                onChange={e => this.addAnswerChange(e.target.value, parseInt(index.toString()))}
                                label="Options"
                                variant="outlined" />
                              <br />
                              <br />
                            </div>
                          )
                        })}
                      </div>
                    </Card> :
                    <></>}

                </div> : <></>
              }
              <br />
              <br />
              <Button type="submit" value={bvalue} variant="contained" color="secondary">
                Submit
              </Button>
              <br></br><br></br>
            </form>
          </div>
        </Card>
      </div>
    )
  }
}
// export default Child;
export default withStyles(useStyles)(Child)