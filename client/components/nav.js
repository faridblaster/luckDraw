Template.Nav.events({

  'click [xeditor="personnel"]': function(){

    var personnelId = Session.get('currentUser')._id;

    Router.go('personnel.editor', { _id: personnelId });

  },

  'click [xaction="logout"]': function(event) {
    Meteor.logout(function(err){
      if (!err) {

        Router.go('Login');

      } else
        {
        throw new Meteor.Error("Logout failed");
      }
    })
  }

});

Template.Nav.created = function () {

  Meteor.call('currentPersonnel', function(error, results){

    Session.set('currentUser', results);

  });

};