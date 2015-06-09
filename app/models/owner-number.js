import DS from 'ember-data';

export default DS.Model.extend({
    phoneType: DS.attr('string'),
    primary: DS.attr('number'),
    number: DS.attr('string'),

    //relationships
    user: DS.belongsTo('user')
});
