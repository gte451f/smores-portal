import DS from 'ember-data';

export default DS.Model.extend({
  createdOn: DS.attr('string'),
  settledOn: DS.attr('string'),
  amount: DS.attr('number'),
  mode: DS.attr('string'),

  // relationships
  account: DS.belongsTo('account', {
    async: false
  }),
  card: DS.belongsTo('card', {
    async: false
  }),
  check: DS.belongsTo('check', {
    async: false
  })
});
