import DS from 'ember-data';

export default DS.Model.extend({
    active: DS.attr('number'), //listed as number because mysql stores it as such
    userName: DS.attr('string'),
    password: DS.attr('string'),


    //relationships
    user: DS.belongsTo('user')
});
