/* jshint node: true */

module.exports = function (environment) {
  var ENV = {
    modulePrefix: 'smores-portal',
    // namespaced directory where resolver will look for your resource files
    podModulePrefix: 'smores-portal/pods',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // used for CSP
    ENV.APP.restDestination = 'http://localhost:4200';
    //need for ember data?
    ENV.APP.restNameSpace = '/v1';
    // Testem prefers this...
    ENV.baseURL = '/';
    // TODO remove this in favor or DB camp name
    ENV['camp'] = {
      name: 'Demo Camp'
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    //need for ember data?
    ENV.APP.restNameSpace = 'smores-api/v1';
    // used for CSP
    ENV.APP.restDestination = 'http://localhost:4200';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV['camp'] = {
      name: 'Test Camp'
    };
  }

  if (environment === 'production') {
    ENV.baseURL = '/##CLIENT##/portal/';
    ENV.locationType = 'none';
    //need for ember data?
    ENV.APP.restNameSpace = 'api/v1';
    // used for CSP
    ENV.APP.restDestination = 'https://app.smores.camp/##CLIENT##';

    ENV['camp'] = {
      name: 'High Harbour'
    };
  }

  ENV['auth'] = {
    login: ENV.APP.restDestination + '/' + ENV.APP.restNameSpace + '/auth/login',
    logout: ENV.APP.restDestination + '/' + ENV.APP.restNameSpace + '/auth/logout'
  };

  ENV['ember-cli-toggle'] = {
    includedThemes: ['flat', 'light', 'default', 'flip'],
    excludedThemes: ['flat'],
    defaultTheme: 'light',  // defaults to 'default'
    defaultSize: 'medium',   // defaults to 'medium'
    defaultOff: 'False',    // defaults to 'Off'
    defaultOn: 'True'       // defaults to 'On'
  };

  ENV['ember-simple-auth'] = {
    authenticationRoute: 'auth.login',
    routeAfterAuthentication: 'dash',
    routeIfAlreadyAuthenticated: 'dash'
  };

  //https://github.com/rwjblue/ember-cli-content-security-policy
  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'script-src': "'self' 'unsafe-eval' 'unsafe-inline'",
    'font-src': "'self' fonts.gstatic.com",
    'connect-src': "'self' " + ENV.APP.restDestination,
    'img-src': "'self' data:",
    'style-src': "'self' 'unsafe-inline' fonts.googleapis.com",
    'media-src': "'self'"
  };

  return ENV;
};
