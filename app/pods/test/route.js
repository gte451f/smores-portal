import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Paginate from 'smores-portal/mixins/table-pager/route';

export default Ember.Route.extend(AuthenticatedRouteMixin, Paginate, {
    modelName: 'registration',
    controllerName: 'test',
    currentRoute: 'test',

    // ask for additional data to be side-loaded
    model: function (params) {
        params.with = 'users';
        return this.findPaged(this.modelName, params);
    }

});