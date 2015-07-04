import Ember from 'ember';

export default Ember.Route.extend({
    model: function (params) {
        return this.store.find('owner', {with: 'all', id: params.owner_id});
    },
    setupController(controller, resolved) {
        var model = resolved.get('firstObject');
        this._super(controller, model);
    },
    actions: {
        save: function (model) {
            var self = this;
            model.save().then(function () {
                self.notify.success('Owner was saved!');
            }, function (reason) {
                self.handleXHR(reason);
            });
        }
    }
});
