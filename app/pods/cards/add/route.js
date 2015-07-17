import Ember from 'ember';
import ErrorHandler from 'smores-portal/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {

    //reset the model in case you return to add another record
    model: function (params) {
        return {};
    },

    actions: {
        save: function (model) {
            var self = this;

            // ask for first object this the model function itself returns an array of 1 record
            var account = this.modelFor('cards').get('firstObject');
            model.account = account;
            var newCard = this.store.createRecord('card', model);
            newCard.save().then(function (post) {
                self.notify.success('Success saving card!');
                self.transitionTo('cards');
            }, function (reason) {
                self.handleXHR(reason);
            });
        }
    }
});
