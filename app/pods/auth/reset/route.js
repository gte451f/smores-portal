import Ember from 'ember';
import ErrorHandler from 'smores-portal/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
    //reset the model in case you return to add another record
    model: function () {
        return {username: null, code: null};
    },

    actions: {
        resend: function () {
            //
        },

        activate: function () {
            //
        }

    }

});