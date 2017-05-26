import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

var Validations = buildValidations({
  addr_1: {
    description: 'Street Address',
    validators : [
      validator('presence', { presence: true, message: 'should not be empty' }),
      validator('length', {
        min: 2,
        max: 35
      })
    ]
  },
  addr_2: {
    description: 'Suite',
    validators : [
      validator('length', {
        min: 2,
        max: 25
      })
    ]
  },
  zip   : {
    description: 'Zip Code',
    validators : [
      validator('presence', { presence: true, message: 'should not be empty' }),
      validator('number', {
        allowString: true,
        integer    : true,
        gt         : 10000,
        lte        : 99999
      })
    ]
  },
  city  : {
    description: 'City',
    validators : [
      validator('presence', true),
      validator('length', {
        min: 2,
        max: 25
      })
    ]
  },
}, {
  debounce: 500
});


export default DS.Model.extend(Validations, {
  billing: DS.attr('boolean'),
  mailing: DS.attr('boolean'),
  addr_1 : DS.attr('string'),
  addr_2  : DS.attr('string'),
  city   : DS.attr('string'),
  state  : DS.attr('string'),
  country: DS.attr('string'),
  zip    : DS.attr('string'),


  // relationships
  account: DS.belongsTo('account', {
    async: false
  })
});

