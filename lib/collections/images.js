Images = new FS.Collection('image', {
  stores: [
    new FS.Store.GridFS('image', {
      transformWrite: function(fileObj, readStream, writeStream){
        readStream.pipe(writeStream);
      }
    }),
    new FS.Store.GridFS('image_thumb', {
      transformWrite: function(fileObj, readStream, writeStream) {

      },
      beforeWrite: function (fileObj) {
        return {
          extension: 'png',
          type: 'image/png'
        };
      }
    })
  ],
  filter: {
    maxSize: 5242880,
    allow: {
      contentTypes: ['image/*']
    },
    onInvalid: function (message) {

      if (Meteor.isClient) {

        swal('Error', message, 'error');

      }

    }
  }
});

Meteor.methods({

  'image.remove': function(_id){

    check(_id, String);

    Images.remove({ _id: _id });

  }

});

Images.allow({

  insert: function(){
    return true
  },

  update: function(){
    return true
  },

  remove: function(){
    return true;
  },

  download: function(){
    return true;
  }

});
