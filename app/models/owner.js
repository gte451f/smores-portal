import DS from 'ember-data';

export default DS.Model.extend({
    relationship: DS.attr('string'),
    primaryContact: DS.attr('number'),


    // by way of user
    email: DS.attr('string'),
    lastName: DS.attr('string'),
    firstName: DS.attr('string'),
    gender: DS.attr('string'),
    userType: DS.attr('string'),
    active: DS.attr('number'),

    // relationshps
    account: DS.belongsTo('account', {
      async: false
    }),
    ownerNumbers: DS.hasMany('owner-number', {
      async: false
    })

});
