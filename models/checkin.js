var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// check in model schema
var CheckIn = new Schema({
  username: {type: String },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  }
});

// add new entry into checkins collection
CheckIn.statics.addNewCheckIn = function(data, cb) {

	var CheckIn = this;
  var newCheckIn = new CheckIn({
    username: data.username,
    location: {
      lat: data.lat,
      lng: data.lng
    }

  });

  newCheckIn.save(cb);

};

// get all entries by username or location(latitude & longitude)
CheckIn.statics.getCheckInsByUserNameOrLocation = function(query, cb) {
  if(query.username) {
    return this.find(query, cb);
  } else if (query.lat && query.lng) {
      return this.find({
        'location.lat': query.lat,
        'location.lng': query.lng,
      }, cb);
  }
};


module.exports = mongoose.model('CheckIn', CheckIn);
