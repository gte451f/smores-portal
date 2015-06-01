import Ember from 'ember';
import ENV from 'smores-portal/config/environment';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(LoginControllerMixin,{
    authenticator: 'authenticator:custom',


    campName: ENV.camp.name
});