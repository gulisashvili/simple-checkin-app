var express = require('express');
var router = express.Router();
var CheckIn = require('../../models/checkin');


// add new check in by parameters { username, latitude, longitude }
router.get('/:username/:lat/:lng', function(req, res) {
  var data = req.params;

  CheckIn.addNewCheckIn(data, function(err, newCheckIn) {
    if(err) res.status(err.statusCode || 500).json({ 'error': err.message });
    else if (newCheckIn) {
      res.status(200).json(newCheckIn);
    }
  });

});



// get all check ins by username or location
router.get('/get/all', function(req, res) {
  CheckIn.getCheckInsByUserNameOrLocation(req.query, function(err, checkins) {
    if(err) res.status(err.statusCode || 500).json({ 'error': err.message });
    else if (checkins) {
      res.status(200).json(checkins);
    }
  });
});






module.exports = router;
