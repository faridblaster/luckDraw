Meteor.publish('images', function(){

  var user = Meteor.users.findOne({ _id: this.userId });

  if(user && user.profile && user.profile.personnelId){

    var personnelId = user.profile.personnelId;

    var criteria = {
      'metadata.personnelId': personnelId
    };
    var projection = {};

    return Images.find(criteria, projection);

  }

});

Meteor.publish('all_images_user', function(){

  var criteria = {};
  var projection = {};

  return Images.find(criteria, projection);

});