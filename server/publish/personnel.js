Meteor.publish('personnel', function(options){

  if(options){
    check(options, {
      personnelId: Match.Optional(String)
    })
  }

  var user = Meteor.users.findOne({ _id: this.userId });

  if(!user){

    return;

  }

  var personnelId = user.profile.personnelId;

  var criteria = {
    '_id': options && options.personnelId ? options.personnelId:   personnelId
  };
  var projection = {};

  return Personnel.find(criteria, projection);

});