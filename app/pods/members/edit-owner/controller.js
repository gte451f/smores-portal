import Ember from 'ember';

export default Ember.Controller.extend({
    newPhone: false,
    newAddress: false,

    actions: {
        toggleNewPhone: function(){
            this.set('newPhone', true);
        },

        toggleNewAddress: function(){
            this.set('newAddress', true);
        }
    }
});
