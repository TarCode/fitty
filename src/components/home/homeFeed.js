import React from 'react';
import viewActions from '../../actions/viewActions';
import PostInfo from './postInfo';
export default class extends React.Component {
  constructor ( props ) {
    super ( props );
    this.incrementLike = this.incrementLike.bind(this);
  }

  incrementLike(index) {
    viewActions.incrementLike(index);
  }

  render () {
    var commentAvatarStyle = {
      marginTop: '10px'
    }

    var posts = this.props.posts.map(function(item, index) {
      var imgPost = <div></div>;

      if (item.image) {
        imgPost = <img style={ commentAvatarStyle } className='responsive-img' src={ item.image }/>
      }
      return (
        <div className='' key={ index }>
          <div className='row'>
            <div className='col s1 m3'>
              <br/>
            </div>
            <div className="col s3 m1 center">
              <img style={ commentAvatarStyle } className='responsive-img' src={ item.userImg }/>
              <strong>{ item.username }</strong>
            </div>
            <div className='col s1'>
              <br/>
            </div>
            <div className="col s5">
              { imgPost }
              <p className='flow-text'>{ item.post }</p>
              <small className='timestamp'>{ item.timestamp }</small>
            </div>
          </div>
          <PostInfo username={ item.username } showPostComment={this.props.showPostComment} index={ index } likes={ item.likes } comments={ item.comments }/>
        </div>
      )
    }.bind(this));

    return(
      <div>
        { posts }
      </div>
    );
  }
}
