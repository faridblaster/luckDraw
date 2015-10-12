FormData = function($form){

  return _($form.serializeArray()).reduce(function (acc, field) {

    if(!/^__[a-z]./.test(field.name)){
      acc[field.name] = field.value;
    }

    return acc;

  }, {});

}

PersonnelEditorCtrl = RouteController.extend({

  template: 'PersonnelEditor',

  subscriptions: function(){

    var subs = [];

    subs.push(
        Meteor.subscribe('personnel'),
        Meteor.subscribe('images')
    );

    return subs;

  },

  data: function(){

    var personnel = Personnel.findOne();
    var data;

    if(personnel && personnel.from == 'facebook'){

      data = personnel;

    } else {

      data = personnel;

    }

    return data;

  }

}).helpers({

  OptionSelected: function(val1, val2){

    return val1 == val2 ? 'selected' : '';

  },

  images_file: function(){

    return Images.find({
      'metadata.category': 'user_profile'
    });

  },

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

  imageDetail: function () {

    return Session.get('currentUser');

  }

});

Template.PersonnelEditor.events({

  'change input[xupload]': function(e, tpl){

    e.preventDefault();

    var $target = $(e.currentTarget);
    var ctrl = Iron.controller();
    var upload_cat = $target.attr('xupload');
    var self = this;

    FS.Utility.eachFile(event, function(file){

      if(file.size > 5242880){
        swal('', 'Harap maaf, fail yang anda masukkan melebihi daripada 5 Megabait', 'warning');
        return false;
      }

      var doc = new FS.File(file);

      doc.metadata = {};

      _.extend(doc.metadata,  {
        category: upload_cat,
        personnelId: ctrl.getParams()._id
      });

      if(self && self.metadata){
        Images.remove({ _id: self.metadata.imageId });
      }

      Images.insert(doc, function(err, fileObj){

        if(err){

          if(err.message == 'Error: FS.Collection insert: file does not pass collection filters');
          return;

          swal('Error', err.message, 'error');

        }
        else {

          Meteor.call('update_image.profile', fileObj._id);

          swal('', 'image changed', 'success');

        }

      });

    });

  },

  'submit form': function(e, tpl){

    e.preventDefault();

    var $form = $(e.currentTarget);

    var data = FormData($form);
    var _id =  this._id;

    Meteor.call('personnel.save', data, _id, function(err, result){

      if(err){

        swal('', err.message, 'error')

      } else {

        swal('', 'save successfully', 'success');

        Router.go('App');

      }

    })

  }

});