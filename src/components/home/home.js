import React from 'react';
import { Link } from 'react-router';
import HomeFeed from './homeFeed';
import viewActions from '../../actions/viewActions';
import store from '../../stores/store';

export default class Home extends React.Component {
  constructor ( props ) {
    super ( props );
    this.postStatus = this.postStatus.bind(this);
    this._onChange = this._onChange.bind(this);
    this.state = store.getStoreData();
    this._handleImageChange = this._handleImageChange.bind(this);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    if(file instanceof Blob) {
        reader.onloadend = () => {
          this.state['image'] = reader.result;
          this.setState(this.state);
        }

        reader.readAsDataURL(file)
    }
  }

  componentDidMount() {
    document.getElementById('image-upload').style.display = 'none';
    store.addChangeListener(this._onChange);

  }

  componentWillUnmount() {
    store.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(store.getStoreData());
  }

  postStatus() {
    var post = document.getElementById('status').value;
    var data = {};
    if(this.state.image){
      data = {
                  username: this.state.user.username,
                  image: this.state.image
             }
      delete this.state.image;
    } else {
      data = {
                  username: this.state.user.username,
                  post: post
             }
    }
    viewActions.postStatus(data);
    document.getElementById('status').value = "";
    document.getElementById('image-upload').style.display = 'none';

    console.log('postState', this.state);
  }

  showProfilePic() {
    document.getElementById('profilePicExpanded').style.display = 'block';
  }

  showPostPic() {
    var picPost = document.getElementById('image-upload');
    if (picPost.style.display === 'none') {
      picPost.style.display = 'block';
    } else {
      picPost.style.display = 'none';
    }
  }
  render () {
    var homeHeaderStyle = {
      minHeight: '30%'
    }

    var postBtnStyle = {
      float: 'right'
    }

    var homeAvatarStyle = {
      marginBottom: '5px',
      marginTop: '5px'
    }

    let $imagePreview = null;
    if (this.state['image']) {
      let imagePreviewUrl = this.state['image'];
      $imagePreview = (<img className='responsive-img' src={imagePreviewUrl} />);
    } else {
      $imagePreview = null;
    }


    return(
      <div>
        <div className='row '>
          <div className='col s4 m3'>
            <div className="card activator">
              <div className="card-image activator waves-effect waves-block waves-light">
                <img style = { homeAvatarStyle } className='img-responsive' src={ this.state.user.userImg }/>
              </div>
              <div className="card-content center">
                <span className="card-title activator grey-text text-darken-4">{ this.state.user.username }</span>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">{ this.state.user.username }<i className="material-icons right">close</i></span>
                <small>{ this.state.user.type }</small>
                <br/>
                <small>{ this.state.user.level }</small>
              </div>
            </div>
          </div>
          <div className="col s8">
            <textarea id='status' placeholder='Tell the world how much you lift or show them your meals or progress...' className="materialize-textarea"/>
            <button className='btn black btn-small btn-floating' onClick={ this.showPostPic }><i className="material-icons">attach_file</i></button>
            <div id='image-upload' className='col s4'>
              <input className='file' type="file" onChange={this._handleImageChange} />
              {$imagePreview}
            </div>
            <br/>
            <button className="waves-effect waves-light black darken-3 btn" style={ postBtnStyle } onClick={ this.postStatus }>Post</button>
          </div>
        </div>
        <HomeFeed showPostComment={ this.state.showPostComment } posts={ this.state.posts }/>
        <br/>
        <div className="fixed-action-btn vertical">
          <a className="btn-floating btn-large black darken-3">
            <i className="large material-icons">mode_edit</i>
          </a>
          <ul>
            <li><a className="btn-floating red"><i className="material-icons">insert_chart</i></a></li>
            <li><a className="btn-floating yellow darken-1"><i className="material-icons">format_quote</i></a></li>
            <li><a className="btn-floating green"><i className="material-icons">publish</i></a></li>
            <li><Link to='/upload' className="btn-floating blue"><i className="material-icons">attach_file</i></Link></li>
          </ul>
        </div>
      </div>
    )
  }
}
