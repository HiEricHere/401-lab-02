'use strict';

const schema = {
  fields : {
    name : { type : 'string' },
    eyes : { type : 'string' },
    hands : { type : 'number' },
    cool : { type : 'boolean' }
  }
};

const Validator = require('../lib/validator');
const validator = new Validator(schema);

describe('validator module performs basic validation of', () => {

  // TODO: Make this series of tests less repetitive ... DRY it out

  let str = 'yes';
  let num = 1;
  let arr = ['a'];
  let obj = {x:'y'};
  let func = () => {};
  let bool = false;

  it('strings', () => {
    expect(validator.isString(str)).toBeTruthy();

    [num,arr,obj,func,bool].forEach( value => {
      expect(validator.isString(value)).toBeFalsy();
    });
  });

  it('numbers', () => {
    expect(validator.isNumber(num)).toBeTruthy();
    expect(validator.isNumber(-1)).toBeTruthy();
    expect(validator.isNumber(1.2)).toBeTruthy();

    [str,arr,obj,func,bool].forEach( value => {
      expect(validator.isNumber(value)).toBeFalsy();
    });
  });

  it('arrays', () => {
    expect(validator.isArray(arr)).toBeTruthy();

    [str,num,obj,func,bool].forEach( value => {
      expect(validator.isArray(value)).toBeFalsy();
    });
  });

  it('objects', () => {
    expect(validator.isObject(arr)).toBeTruthy();
    expect(validator.isObject(obj)).toBeTruthy();

    [str,num,func,bool].forEach( value => {
      expect(validator.isObject(value)).toBeFalsy();
    });
  });

  it('booleans', () => {
    expect(validator.isBoolean(bool)).toBeTruthy();

    [str,num,arr,obj,func].forEach( value => {
      expect(validator.isBoolean(value)).toBeFalsy();
    });
  });

  it('functions', () => {
    expect(validator.isFunction(func)).toBeTruthy();

    [str,num,arr,obj,bool].forEach( value => {
      expect(validator.isFunction(value)).toBeFalsy();
    });
  });

});

describe('validator module performs complex validations', () => {
  
  let testtrue = {
    name : 'asdf',
    eyes : 'yes',
    hands : 2,
    cool : false
  };

  let testfalse = {
    name : 'asdf',
    eyes : 2,
    hands : 3,
    cool : 'maybe'
  }

  it('validates the presence of required object properties at any level', () => {
    // i.e. does person.hair.color exist and have a good value, not just person.hair

    expect(validator.testKey( testtrue, schema )).toEqual(true);
    expect(validator.testKey( testfalse, schema )).toEqual(true);

  });

  it('validates the proper types of object properties', () => {

    expect(validator.testProperty( testtrue, schema )).toEqual(true);
    expect(validator.testProperty( testfalse, schema )).toEqual(false);

  });

  it('validates the types of values contained in an array', () => {
    // i.e. an array of all strings or numbers
    let numArray = [ -1, 10, 0.1, -15.5 ];
    let testArray1 = [ ['a'], () => {}, {}, false ];
    let strArray = [ '-1', '10', '0.1', '-15.5' ];

    expect(validator.validateArrayValues( 'number', numArray )).toEqual(true);
    expect(validator.validateArrayValues( 'number', testArray1 )).toEqual(false);
    expect(validator.validateArrayValues( 'string', strArray )).toEqual(true);

  });

  it('validates a value array against an approved list', () => {
    // i.e. a string might only be allowed to be "yes" or "no"
    let approvedCool = [ true, false ];

    expect(validator.checkCool( testtrue, approvedCool)).toEqual(true);
    expect(validator.checkCool( testfalse, approvedCool)).toEqual(false);

  });

  // TODO: Cover so, so many more cases

});

