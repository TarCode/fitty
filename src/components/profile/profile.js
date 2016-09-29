import React from 'react';
import store from '../../stores/store';

export default class Profile extends React.Component {
  constructor ( props ) {
    super( props );
    this.state = store.getStoreData();
    this.changeProfilePic = this.changeProfilePic.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);
  }

  changeProfilePic() {
    var uploadBox = document.getElementById('image-upload');
    if (uploadBox.style.display == 'none') {
      uploadBox.style.display = 'block';
    } else {
      uploadBox.style.display = 'none';
    }
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    if(file instanceof Blob) {
        reader.onloadend = () => {
          this.state.user.userImg = reader.result;
          this.setState(this.state);
        }

        reader.readAsDataURL(file)
    }
  }

  componentDidMount() {
    store.addChangeListener(this._onChange);
    document.getElementById('image-upload').style.display = 'none';

  }

  componentWillUnmount() {
    store.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(store.getStoreData());
  }
  render() {
    var profileAvatarStyle = {
      position: 'absolute',
      marginTop: '30%'
    }

    var profileBgStyle = {
      position: 'absolute',
      width: '100%'
    }

    var headerBgStyle = {
      marginBottom: '45%'
    }

    return(
      <div>
        <div className="row headerBg" style={ headerBgStyle }>
          <img style = { profileBgStyle } className="img-responsive" src={ this.state.user.userBg }/>
          <div className='col s4 m3' style = { profileAvatarStyle } onClick={ this.changeProfilePic }>
            <img className='responsive-img' src={ this.state.user.userImg }/>
            <div id='image-upload'>
              <input className='file' type="file" onChange={this._handleImageChange} />
            </div>
          </div>
        </div>
        <div className="row ">
          <div className='col s4 m3'>
              <br/>
          </div>
          <div className='col s8'>
            <h3>{ this.state.user.username }</h3>
            <p>{ this.state.user.type }<br/>{ this.state.user.level }</p>
          </div>
        </div>
        <div className='card center'>
          <br/>
          <div className='row'>
            <h5>About</h5>
          </div>
        </div>
      </div>
    )
  }
}
