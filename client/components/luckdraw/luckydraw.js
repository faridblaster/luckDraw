LuckyDrawCtrl = RouteController.extend({

  template: 'LuckyDraw',

  subscriptions: function(){

    var subs = [];

    subs.push(
      Meteor.subscribe('all_images_user'),
        Meteor.subscribe('personnel', {
          personnelId: this.state.get('personnel_id_selected')
        })
    );

    return subs;

  },

  data: function(){

    if(Session.get('currentUser')){

      ///cfs/files/image/8JdxkCEQGZQftBbgd/

      var imageData = Images.find().fetch();
      var ctrl = Iron.controller();
      var personnelId = [], y=0;
      var images = [], x=0;

      _.forEach(imageData, function(doc, index){

        images[index] = "/cfs/files/image/"+ doc._id;
        personnelId[index] = doc.metadata.personnelId;

      });

      function changeImage()
      {

        if(!ctrl.state.get('luck_draw')){
          return false;
        }

        if(ctrl.state.get('luck_draw') !== 'stop'){


        } else {

          var personnel = Personnel.findOne();
          var name;

          if(personnel && personnel.from == 'facebook') {

            name = personnel.name;

          }

          if(personnel && personnel.from == 'app'){

            name = personnel.username;

          }

          if(name){

            swal('', 'tahniah! ' + name, 'success')

          }
        }

        var img = document.getElementById("img");
        if(ctrl.state.get('luck_draw') !== 'stop') {

          ctrl.state.set('personnel_id_selected', personnelId[y]);

          img.src = images[x];
          x++;
          y++;

          if (x >= images.length) {
            x = 0;
          }

          if (y >= personnelId.length) {
            y = 0;
          }

          $('.counter').text(x);

          changeImage();

        }
      }
      Meteor.setTimeout( function() {

        if(ctrl.state.get('luck_draw') !== 'stop'){

        changeImage();
      }
      }, 3850);

      return Images.find();

    }

  }

}).helpers({

  luck_draw: function(){

    return this.state.get('luck_draw')

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

  }

})

Template.LuckyDraw.events({

  'click [xaction="start"]': function(){

    var ctrl = Iron.controller();

    ctrl.state.set('luck_draw', 'start')

  },

  'click [xaction="stop"]': function(){

    var ctrl = Iron.controller();

    ctrl.state.set('luck_draw', 'stop')

  }

});