import DS from 'ember-data';

export default DS.Model.extend({
    createdOn: DS.attr('date'),
    updatedOn: DS.attr('date'),
    notes: DS.attr('string'),
    active: DS.attr('boolean'),

    // relationships
    cards: DS.hasMany('card', {
      async: false
    }),
    attendees: DS.hasMany('attendee', {
      async: false
    }),
    accountAddrs: DS.hasMany('account-addr', {
      async: false
    }),
    owners: DS.hasMany('owner', {
      async: false
    }),
    charges: DS.hasMany('charge', {
      async: false
    }),
    payments: DS.hasMany('payment', {
      async: false
    })
});
