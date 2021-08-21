import React, { Component  } from 'react';
import './Cms.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import JoditEditor from "jodit-react";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class Cms extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props){
    super(props);
    this.state = {
      content: '',
      readata: ''
    };
    this.config = {
      readonly: false
    }
  }
  dataSubmit = (event)=>{
    event.preventDefault();
    console.log(this.state.content)
    const { cookies } = this.props;
    cookies.set('content', this.state.content, { path: '/' });
  }
  readData = (event) => {
    const { cookies } = this.props;
    console.log(cookies.get('content'))
  }
  jodit;
	setRef = jodit => this.jodit = jodit;
  
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="text-center">React Textarea with Editor</h1>
            <form onSubmit={this.dataSubmit}>
              <br></br>
              <JoditEditor
                // ref={this.editor}
                editorRef={this.setRef}
                value={this.state.content}
                config={this.config}
		            // onBlur={newContent => this.setState({content: newContent})}
                onChange={newContent => this.setState({content: newContent})}
              />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <br></br>
              <input type="button" value="Read" className="btn btn-primary" onClick={this.readData}/>
              <br></br>
              {this.state.readata}
            </form>
          </div>
        </div>
    </div>
    );
  }
}

export default withCookies(Cms);