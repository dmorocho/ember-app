// import Route from '@ember/routing/route';

// export default class IndexRoute extends Route {}

import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this._super(...arguments);
    this.replaceWith('rentals');
  },
});
