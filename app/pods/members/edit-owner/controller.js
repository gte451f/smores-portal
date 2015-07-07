import Ember from 'ember';

export default Ember.Controller.extend({
    newPhone: false,

    actions: {
        toggleNewPhone: function(){
            this.set('newPhone', true);
        }
    }
});
