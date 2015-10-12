Personnel = new Meteor.Collection('personnel');

Meteor.methods({

  'update_personnel': function(){

    var userId = Meteor.userId();
    var user = Meteor.users.findOne({ _id: userId });
    var result;

    if(Meteor.isServer){

      var facebook_id = user.services.facebook.id;
      var data = {};

      _.extend(data,  user.services.facebook);
      _.extend(data, {
        from: 'facebook'
      });

      result = Personnel.upsert({
        'facebook.id': facebook_id
      }, {
        $set: data
      });

      if(result && result.insertedId){

        Meteor.users.update({ _id: userId }, { $set: { 'profile':{ personnelId: result.insertedId }}});

      }

      return {
        facebook_id: facebook_id,
        name: user.services.facebook.name
      };

    }

  },

  'check_username': function(username){

    check(username, String);

    var UserExistsCriteria = {
      username : username
    };

    var result;

    result = Personnel.findOne(UserExistsCriteria);

    if(result){

      throw new Meteor.Error('username has been existed');

    }

  },

  'account.create': function(data){

    check(data, {

      username: String,
      password: String,
      gender: String

    });

    var result;
    var personnelData = {};

    _.extend(personnelData, data);
    _.extend(personnelData, {
      from: 'app',
      dt:{
        created: moment().toDate()
      }
    });

    result = Personnel.insert(_.omit(personnelData, 'password'));

    Accounts.createUser({
      username: personnelData.username,
      password: personnelData.password,
      profile: {
        personnelId: result
      }
    });

  },

  'update_image.profile': function(imageId){

    check(imageId, String);

    var user = Meteor.users.findOne({ _id: this.userId });
    var personnelId = user.profile.personnelId;

    Personnel.update({ _id: personnelId }, { $set: { 'metadata.imageId': imageId }})

  },

  currentPersonnel: function (_id) {

    check(_id, Match.Optional(String));

    var user = Meteor.user();
    var personnel = {};

    if (user && user.profile.personnelId && user.profile.personnelId.length) {

      personnel = Personnel.findOne({
        _id: user.profile.personnelId
      });

    }

    return personnel;

  },

  'personnel.save': function(data, _id){

    check(data, {

      name: String,
      first_name: String,
      last_name: String,
      company_name: String,
      email: String,
      gender: String

    });

    var personnel = Personnel.findOne({ _id: _id });
    var dataUpdate = {};

    if(personnel && personnel.from == 'facebook'){

      dataUpdate = {
        'facebook.name': data.name,
        'facebook.first_name': data.first_name,
        'facebook.last_name': data.last_name,
        'facebook.company_name': data.company_name,
        'facebook.email': data.email,
        'facebook.gender': data.gender
      }

    } else {

      dataUpdate = {
        name: data.name,
        first_name: data.first_name,
        last_name: data.last_name,
        company_name: data.company_name,
        email: data.email,
        gender: data.gender
      }

    }

    return Personnel.update({ _id: _id }, { $set: dataUpdate }, { multi: true })

  }

});