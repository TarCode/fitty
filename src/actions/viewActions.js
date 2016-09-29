var AppDispatcher = require('../dispatcher/dispatcher');
var appConstants = require('../constants/appConstants');

module.exports = {

  loginUser: function() {
    AppDispatcher.handleViewAction({
      actionType: appConstants.LOGIN_USER
    });
  },

  incrementLike: function(data) {
    AppDispatcher.handleViewAction({
      actionType: appConstants.INCREMENT_LIKE,
      data: data
    })
  },

  postStatus: function(data) {
    AppDispatcher.handleViewAction({
      actionType: appConstants.POST_STATUS,
      data: data
    });
  },

  showPostComment: function(index) {
    AppDispatcher.handleViewAction({
      actionType: appConstants.SHOW_POST_COMMENT,
      data: index
    });
  },

  postComment: function(data) {
    AppDispatcher.handleViewAction({
      actionType: appConstants.POST_COMMENT,
      data: data
    });
  },

  joinEvent: function(data) {
    AppDispatcher.handleViewAction({
      actionType: appConstants.JOIN_EVENT,
      data: data
    });
  },

  uploadImage: function(data) {
    AppDispatcher.handleViewAction({
      actionType: appConstants.UPLOAD_IMAGE,
      data: data
    });
  },

  postGoalSession: function(data) {
    AppDispatcher.handleViewAction({
      actionType: appConstants.POST_GOAL_SESSION,
      data: data
    });
  }
}
