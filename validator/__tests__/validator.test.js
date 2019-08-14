'use strict';

const schema = {
  fields : {
    name : { type : 'object' },
    eyes : { type : 'string' },
    hands : { type : 'number' },
    cool : { type : 'boolean' },
    likes : { type : 'array' },
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
    expect(validator.isObject(obj)).toBeTruthy();

    [str,num,func,bool,arr].forEach( value => {
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

describe('validator tests if an object is valid by comparing against a schema', () => {

  let likesArray = [ ['stuff','more stuff'], [1,2], [['a'],['b']], [()=>{}], [{}] ];

  let testtrue = {
    name : {
      first : 'asdf',
      last : 'qwer'
    },
    eyes : 'yes',
    hands : 2,
    cool : false,
    likes : [ 'stuff', 'other stuff' ]
  };

  let testfalse1 = {
    name : {
      first : 'asdf',
      last : 'qwer'
    },
    eyes : 'yes',
    hands : [ 1, 2 ],
    cool : true,
    likes : [ 'stuff' ]
  }


  let testfalse2 = {
    name : {
      first : 'asdf',
      last : 'qwer'
    },
    eyes : 2,
    hands : 3,
    cool : 'maybe',
    likes : [ 'stuff' ]
  }

  let testfalse3 = {
    name : {
      first : 'asdf',
      last : 'qwer'
    },
    hair : 2,
    hands : 3,
    cool : 'maybe',
    likes : [ 'stuff' ]
  }

  test('test if object is an object', () => {

    expect(validator.isObject( testtrue )).toEqual(true);
    expect(validator.isObject( {} )).toEqual(true);
    expect(validator.isObject( [] )).toEqual(false);

  });

  test('if it is an object then test if keys match schema', () => {

    expect(validator.checkObject( testtrue )).toEqual(true);
    expect(validator.checkObject( testfalse3 )).toEqual(false);

  });

  test('if keys match then test if property types match schema', () => {

    expect(validator.checkObject( testfalse1 )).toEqual(false);
    expect(validator.checkObject( testfalse2 )).toEqual(false);
    
    likesArray.forEach( array => {
      testtrue.likes = array;
      expect(validator.checkObject( testtrue )).toEqual(true);
    });


  });


});

