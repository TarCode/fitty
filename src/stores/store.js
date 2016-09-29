var AppDispatcher = require('../dispatcher/dispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var moment = require('moment');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var _store = {
  showPostComment: false,
  user: {
           username: 'joe_dirt',
           type: 'Crossfit',
           level: 'Advanced',
           userImg: "http://thesmallbusinessgeeks.com/wp-content/uploads/2011/08/RoundBlankAvatar.jpg",
           userBg: "http://www.designboom.com/cms/images/erica/----bg/bg02.jpg",
           events: [1]
        },
  posts: [
           {
             image: 'http://www.myoexercise.com/uploads/5/7/1/0/57100025/2623732_orig.png',
             post:'I am you',
             likes: 21,
             username: 'joe_dirt',
             userImg: "http://thesmallbusinessgeeks.com/wp-content/uploads/2011/08/RoundBlankAvatar.jpg",
             timestamp :"Today at 4:52 PM",
             comments: [{
                          username: 'AntsPants',
                          userImg: "http://thesmallbusinessgeeks.com/wp-content/uploads/2011/08/RoundBlankAvatar.jpg",
                          timestamp :"Today at 4:52 PM",
                          comment: 'Oh really??'
                        }]
           },
           {
             post:'You are me',
             likes: 12,
             username: 'joe_dirt',
             userImg: "http://thesmallbusinessgeeks.com/wp-content/uploads/2011/08/RoundBlankAvatar.jpg",
             timestamp :"Yesterday at 9:52 PM",
             comments: []
           }
         ],
   events:  [
              {
                eventId: 1,
                eventName: 'Super Long Marathon',
                eventImg: 'http://media.oregonlive.com/runoregon/photo/9386163-large.jpg',
                venue: 'somewhere on the mountain',
                going: 121,
                cost: 'R250.00'
              }
            ],
   goals:    [
               {x: 1, y: 10}, {x: 2, y: 5},
               {x: 3, y: 15}
             ]



}

var store = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },
  getStoreData: function() {
    return _store;
  },
  getUser: function() {
    return _store.user.username;
  }
});

AppDispatcher.register(function(payload) {

  var action = payload.action;

  switch(action.actionType) {

    case appConstants.LOGIN_USER:
      _store.user.username = document.getElementById('username').value;
      store.emit(CHANGE_EVENT);
      break;

    case appConstants.INCREMENT_LIKE:
      var index = action.data;
      _store.posts[index].likes += 1;
      store.emit(CHANGE_EVENT);
      break;
    case appConstants.POST_STATUS:
      var username = action.data.username;
      var post = action.data.post;
      _store.posts = _store.posts.reverse();
      if(action.data.image) {
        _store.posts.push({
            image: action.data.image,
            post: post,
            likes: 0,
            comments: [],
            username: username,
            userImg: _store.user.userImg,
            timestamp: moment().calendar()
        });
      } else {
        _store.posts.push({
            post: post,
            likes: 0,
            comments: [],
            username: username,
            userImg: _store.user.userImg,
            timestamp: moment().calendar()
        });
      }

      _store.posts = _store.posts.reverse();
      store.emit(CHANGE_EVENT);
      break;

    case appConstants.SHOW_POST_COMMENT:
    var index = action.data;
      if(_store.showPostComment !== 'comment' + index) {
        _store.showPostComment = 'comment'+ index;
      } else {
        _store.showPostComment = '';
      }
      store.emit(CHANGE_EVENT);
      break;

    case appConstants.POST_COMMENT:
      var index = action.data.index;
      var username = action.data.username;
      var comment = action.data.comment;
      _store.posts[index].comments.push({
                                          username: username,
                                          userImg: _store.user.userImg,
                                          comment: comment,
                                          timestamp: moment().calendar()
                                        });
      store.emit(CHANGE_EVENT);
      break;

    case appConstants.JOIN_EVENT:
        var eventId = action.data.eventId;
        var index = action.data.index
        for ( var x = 0; x < _store.user.events.length; x++ ) {
          if(_store.user.events[x] === eventId) {
            _store.user.events.splice(x, x + 1);
            _store.events[index]
          } else {
            _store.user.events.push(eventId);
          }
        }
        store.emit(CHANGE_EVENT);
        break;

    case appConstants.POST_GOAL_SESSION:
        var goal = action.data.goal;
        var goalValue = action.data.goalValue;
        for (var x = 0; x < _store.goals.length; x++) {
          if (_store.goals[x].chartName === goal) {
            _store.goals[x].series[0].push(goalValue);
            _store.goals[x].labels.push('Week' + _store.goals[x].x)
            _store.goals[x].x++;
          }
        }
        store.emit(CHANGE_EVENT);
        break;
    default:
      return true;
  }
});

module.exports = store;
