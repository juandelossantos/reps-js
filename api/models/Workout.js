var moment = require("moment");

/**
* Workout.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  identity: 'Workout',

  attributes: {
    user: {
      model: 'User',
      required: true
    },
    workout_date: {
      type: 'date',
      required: true
    },
    sets: {
      collection: 'Set',
      via: 'workout'
    },
    location: {
      model: 'Location',
      required: true
    }
  },


  /** Return a query set pre-filtered for the selected user.
  */
  listForUser: function(user) {
    return Workout.find({user: user});
  },

  /** Return a Workout with the user pre-filtered.
  */
  getForUser: function(user) {
    return Workout.findOne({user: user}).populate('sets').populate('location');
  },


  /** Create a workout with attached set
  * Take the necessary attributes and a callback to add.
  */
  createWithSets: function(attr, callback) {
    var data = _.clone(attr);

    var formattedDate = moment.utc(data.workout_date, 'DD/MM/YYYY').toDate();
    _.merge(data, {workout_date: formattedDate});

    Workout.create(data).exec(function(err, created) {

      if (err) {
        return callback(err);
      }

      var sets = _.map(_.clone(data.sets || []), function(set) {
        set.workout = created.id;
        return set;
      });

      if (sets) {
        Set.create(sets).exec(function(setErr, createdSets) {
          if (setErr) {
            return callback(setErr);
          }
          created.sets = createdSets;
          return callback(null, created);
        });
      }
      else {
        return callback(null, created);
      }
    });
  }
};
