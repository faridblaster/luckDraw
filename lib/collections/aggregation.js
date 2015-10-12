
if(Meteor.isServer){

  Meteor.methods({

    'gender.aggregation': function () {

      var pipeline = [
        {
          $group: {
            _id: "$gender",
            genderCount: { $sum: 1}
          }
        },{
          $project: {
            _id: 1,
            genderCount: 1
          }
        }
      ];

      var result = Personnel.aggregate(pipeline);
      var data = [];

      _.forEach(result, function(key){

        data.push([key._id, key.genderCount])

      })

      return data;

    }

  })

}