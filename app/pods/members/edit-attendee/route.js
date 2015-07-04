import Ember from 'ember';
import ErrorHandler from 'smores-portal/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {


    actions: {
        save: function (model) {
            var self = this;
            model.save().then(function () {
                self.transitionTo('members.list');
                self.notify.success('Camper was saved!');
            }, function (reason) {
                self.handleXHR(reason);
            });
        }
    }
});
