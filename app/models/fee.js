import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    basis: DS.attr('string'),
    paymentSchedule: DS.attr('string'),
    amount: DS.attr('number')
  
});
