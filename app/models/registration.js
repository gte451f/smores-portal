import DS from 'ember-data';

export default DS.Model.extend({
    notes: DS.attr('string'),
    createdOn: DS.attr('string'),
    updatedOn: DS.attr('string'),
    //userId: DS.attr('number'),

    // relationshps
    attendee: DS.belongsTo('attendee'),
    charges: DS.hasMany('charge', {async: true}),


    // why did I do this?
    requests: DS.hasMany('request')
});