import _ from 'underscore';
import Backbone from 'backbone';

import {authSync} from '../../base/models/auth';

import {ExerciseModel} from '../models/exercise';


export const ExerciseList = Backbone.Collection.extend({
  model: ExerciseModel,
  sync: authSync,

  comparator: 'exercise_name',

  initialize: function(data, options) {
    this.searchModel = options.searchModel;
  },

  url: function() {
    if (_.isUndefined(this.searchModel)) {
      return '/exercises/';
    }
    return this.searchModel.url();
  }
});
