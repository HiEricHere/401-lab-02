'use strict';

// Vinicio - this is similar to module.exports = {};, but you are giving it an easier to use name

class Validator {

  constructor(schema) {
    this.schema = schema;
  }

  isString(input) {
    return typeof input === 'string';
  }

  isNumber(input) {
    return typeof input === 'number';
  }

  isArray(input) {
    return Array.isArray(input);
  }

  isObject(input) {
    return typeof input === 'object';
  }

  isBoolean(input) {
    return typeof input === 'boolean';
  }

  isFunction(input) {
    return typeof input === 'function';
  }

  testKey( object ) {

    let keys = Object.keys( object );
    for ( let i = 0; i < keys.length; i++ ){
      if ( !this.schema.fields[ keys[i] ] ) return false;
    }

    return true;

  }

  testProperty( object ) {

    let properties = Object.entries(object);
    for ( let i = 0; i < properties.length; i++ ){
      if ( typeof properties[i][1] !== this.schema.fields[ properties[i][0] ].type ){
        return false;
      }
    }

    return true;

  }

  validateArrayValues( type, array ) {

    switch( type ) {

    case 'number' :
      for( let i = 0; i < array.length; i++ ){
        if ( !this.isNumber( array[i] ) ) {
          return false;
        }
      }
      return true;

    case 'string' :
      for( let i = 0; i < array.length; i++ ){
        if ( !this.isString( array[i] ) ) {
          return false;
        }
      }
      return true;

    case 'array' :
      for( let i = 0; i < array.length; i++ ){
        if ( !this.isArray( array[i] ) ) {
          return false;
        }
      }
      return true;

    case 'object' :
      for( let i = 0; i < array.length; i++ ){
        if ( !this.isObject( array[i] ) ) {
          return false;
        }
      }
      return true;

    case 'function' :
      for( let i = 0; i < array.length; i++ ){
        if ( !this.isFunction( array[i] ) ) {
          return false;
        }
      }
      return true;

    }
  }

  checkCool( object, approvedList ){
    return approvedList.includes(object.cool);
  }

}

module.exports = Validator;
