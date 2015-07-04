import Ember from 'ember';

export default Ember.Component.extend({
    //isAdding: false,
    phone: {
        phoneType: null,
        primary: null,
        number: null
    },

    actions: {
        save: function(){
            this.set('isAdding', false);
        },

        cancel: function(){
            this.set('isAdding', false);
        }
    }
});
