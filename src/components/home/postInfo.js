import React from 'react';
import viewActions from '../../actions/viewActions';
import store from '../../stores/store';

export default class Likes extends React.Component {
  constructor(props) {
    super( props );
    this.incrementLike = this.incrementLike.bind(this);
    this.showPostComment = this.showPostComment.bind(this);
    this.postComment =  this.postComment.bind(this);
  }

  incrementLike() {
    viewActions.incrementLike(this.props.index);
  }

  postComment() {
    var data = {
                  index: this.props.index,
                  username: this.props.username,
                  comment: document.getElementById('commentText' + this.props.index).value
                }
    viewActions.postComment(data)
    viewActions.showPostComment(this.props.index);

  }

  showPostComment(){
    viewActions.showPostComment(this.props.index);
  }

  render() {
    var commentAvatarStyle = {
      marginTop: '10px'
    }
    var showPostComment = <div></div>;
    if (this.props.showPostComment === 'comment' + this.props.index) {
      showPostComment = <div id={ 'comment' + this.props.index } className='row'>
        <div className='col s2 m4'>
            <br />
        </div>
        <div className='col s7 m6'>
          <input id={ 'commentText' + this.props.index } type='text' className='form-control' placeholder='Comment'/>
        </div>
        <div className='col s2'>
          <button className='btn btn-default black' onClick={ this.postComment }>Post</button>
        </div>
        <div className='col s2'></div>
      </div>;
    }
    var comments = this.props.comments.map(function(item, index) {
      return (
        <div key={ index }>
          <div className='row commentRow'>
            <div className='col s2 m4'>
                <br />
            </div>
            <div className='col s2 m1 center'>
              <img style={ commentAvatarStyle } className='responsive-img' src={ item.userImg }/>
              <strong>{ item.username }</strong>
            </div>
            <div className='col s8 m5'>
              <p>{ item.comment }</p>
              <small>{ item.timestamp }</small>
            </div>
          </div>
        </div>
      )
    });

    return(
      <div>
          <div className='row'>
            <div className='col s5 m7'>
                <br />
            </div>
            <div className='col s7 m5'>
              <button id='likeBtn' className="col s5 btn btn-small black darken-3" onClick={ this.incrementLike }>Like - <span> { this.props.likes } </span></button>
              <button id='likeBtn' className="col s5 btn btn-small black darken-3" onClick={ this.showPostComment }>Comment</button>
            </div>
          </div>
          { showPostComment }
          <div className='row'>
              <div className='col s3'>
              </div>
              { comments }
          </div>
      </div>
    )
  }
}
