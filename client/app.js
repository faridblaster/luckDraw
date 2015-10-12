function getPath(obj, ks){

  if (typeof ks == "string")
    ks = ks.split(".");

  if (obj === undefined)
    return void 0;

  if (ks.length === 0)
    return obj;

  if (obj === null)
    return void 0;

  return getPath(obj[_.first(ks)], _.rest(ks));

}

AppCtrl = RouteController.extend({

  template: 'App',

  subscriptions: function(){

    var subs = [];

      Meteor.subscribe('personnel');
      Meteor.subscribe('images');

    return subs;
  },

  action: function () {

    if(this.ready() && Session.get('currentUser')){

      this.render();

    } else {

      Router.go('Login');

    }

  }

}).helpers({

  userInfo: function(){

    var personnel = Session.get('currentUser');
    var data;

    if(personnel && personnel.from == 'facebook'){

      data = personnel

    } else {

      data = personnel;

    }

    return data;

  },

  imgFbUrl: function () {

    var personnel = Personnel.findOne();
    var data;

    if(personnel && personnel.from == 'facebook'){

      data = personnel

    } else {

      data = personnel;

    }

    var ctrl = Iron.controller();
    var fbUserId = getPath(data, 'id');
    var url = "http://graph.facebook.com/" + fbUserId + "/picture?type=large&redirect=false";

    Meteor.http.call("GET", url, function (error, result) {

      ctrl.state.set('imgUrl', getPath(result, 'data.data.url'))

    });

    return ctrl.state.get('imgUrl');

  },

  images_file: function(){

    return Images.find({
      'metadata.category': 'user_profile'
    });

  }

});