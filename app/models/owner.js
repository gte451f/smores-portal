import DS from 'ember-data';

export default DS.Model.extend({
    relationship: DS.attr('string'),

    // relationshps
    account: DS.belongsTo('account'),
    user: DS.belongsTo('user')
});
