Template.Panel.events({

  'click #logout': function(event) {
    Meteor.logout(function(err){
      if (err) {
        throw new Meteor.Error("Logout failed");
      }
    })
  }

});

Template.Panel.helpers({

  topGenresChart: function () {

    var data, ctrl = Iron.controller();

    data = ctrl.state.get('gender_data');

    return {
      chart: { renderTo: 'histogram', defaultSeriesType: 'bar',
        backgroundColor:'rgba(255, 255, 255, 0.1)'
      },
      credits: {
        enabled: false
      },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            distance: -50,
            style: {
              fontWeight: 'bold',
              color: 'white',
              textShadow: '0px 1px 2px black'
            }
          },
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%']
        }
      },
      series: [{
        type: 'pie',
        name: 'genre',
        data: data
      }]
    };

  },

  imageDetail: function () {

    return Session.get('currentUser');

  }

});

Template.Panel.created =  function() {

  var ctrl = Iron.controller();

  Meteor.call('gender.aggregation', function(err, result){

    if(err){


    } else {

      ctrl.state.set('gender_data', result)

;    }

  });

};