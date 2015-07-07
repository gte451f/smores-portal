import DS from 'ember-data';

export default DS.Model.extend({
    relationship: DS.attr('string'),


    // by way of user
    email: DS.attr('string'),
    lastName: DS.attr('string'),
    firstName: DS.attr('string'),
    gender: DS.attr('string'),
    userType: DS.attr('string'),

    // relationshps
    account: DS.belongsTo('account'),
    ownerNumbers: DS.hasMany('owner-number')

});
