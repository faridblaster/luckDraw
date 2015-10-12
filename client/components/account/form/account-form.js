CreateAccountCtrl = RouteController.extend({

  template: 'AccountForm'

}).helpers({


});

Template.AccountForm.events({

  'click [xaction="back"]': function(){

    Router.go('Login')

  },

  'keyup [id="username"]': function(e, tpl){

    var username = e.currentTarget.value;

    if(!username){
      $('#username').css('background-color', '#fff');
      return;
    }

    Meteor.call('check_username', username, function(err, result){

      if(err){

        $('#username').css('background-color', '#F3C0C0');

      } else {

        $('#username').css('background-color', '#D4FFD7');

      }

    });

  },

  'click [xaccount="create"]': function(){

    var username = $('#username').val();
    var password = $('#inputPassword').val();
    var repassword = $('#reInputPassword').val();
    var gender = $('#gender').val();

    if(!username){

      swal('', 'Please write username', 'warning');

      return;
    }

    if(!password){

      swal('', 'Please write your password', 'warning');

      return;
    }

    if(password !== repassword){

      swal('', 'your password is not same', 'warning');

      return;
    }

    if(!gender){

      swal('', 'Please choose your gender', 'warning');

      return;
    }

    var data = {

      username: username,
      password: password,
      gender: gender

    };

    Meteor.call('account.create', data, function(err, result){

      if(err){

        swal('', '', 'error');

      } else {

        swal('', 'Account created successfully', 'success');

        Router.go('Login');

      }

    });

  }

});