LoginCtrl = RouteController.extend({

  template: 'Login'

}).helpers({

  loginMessage: function(){

    var ctrl = Iron.controller();

    return ctrl.state.get('loginMessage')

  }

});

Template.Login.events({

  'click #facebook-login': function(event) {
    Meteor.loginWithFacebook({}, function(err){
      if (err) {
        throw new Meteor.Error("Facebook login failed");
      } else {

        Meteor.call('update_personnel', function(err, result){

          var data = {
            facebook_id: result.facebook_id,
            name: result.name
          };

          Session.set('currentUser', data);

        });

        Meteor.call('currentPersonnel', function(error, results){

          Session.set('currentUser', results);

        });

        Router.go('/');

      }
    });
  },

  'click [xaction="login"]': function(e, tpl){

    e.preventDefault();

    var username = tpl.find('#username').value,
        password = tpl.find('#password').value,
        ctrl = Iron.controller();

    Meteor.loginWithPassword(username,  password,  function(err){

      if(!err){

        Meteor.call('currentPersonnel', function(error, results){

          Session.set('currentUser', results);

        });

        Router.go('/');

      } else {

        ctrl.state.set('loginMessage', 'Invalid credential');

      }

      return false;

    })

  },


  'click [xcreate="account"]': function(){

    Router.go('create.account')

  }

});