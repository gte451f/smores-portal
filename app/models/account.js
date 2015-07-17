import DS from 'ember-data';

export default DS.Model.extend({
    userName: DS.attr('string'),
    password: DS.attr('string'),
    createdOn: DS.attr('date'),
    updatedOn: DS.attr('date'),
    name: DS.attr('string'),
    active: DS.attr('boolean'),

    // relationships
    cards: DS.hasMany('card'),
    attendees: DS.hasMany('attendee'),
    accountAddrs: DS.hasMany('accountAddr'),
    owners: DS.hasMany('owner'),
    charges: DS.hasMany('charge'),
    payments: DS.hasMany('payment')
});
