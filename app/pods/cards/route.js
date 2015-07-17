import Ember from 'ember';
import ErrorHandler from 'smores-portal/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
    model: function (params) {
        return this.store.find('account', {id: params.account_id, with: 'cards'});

    },

    setupController: function (controller, resolved) {
        var account = resolved.get('firstObject');
        this._super(controller, account);
    },


    actions: {

        delete: function (card) {
            var self = this;
            card.destroyRecord().then(function () {
                //controller.get('model').content.removeObject(model);
                self.notify.success('Successfully removed credit card');
            }, function (reason) {
                self.handleXHR(reason);
            });
        }
    }
});