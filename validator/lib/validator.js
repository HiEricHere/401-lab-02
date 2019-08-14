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
    return typeof input === 'object' && !this.isArray(input);
  }

  isBoolean(input) {
    return typeof input === 'boolean';
  }

  isFunction(input) {
    return typeof input === 'function';
  }

  checkObject( object ){

    if ( this.isObject( object ) ){

      let objectData = Object.entries( object );
      let schemaData = Object.entries( this.schema.fields );

      for ( let i = 0; i < objectData.length; i++ ){
        if( objectData[i][0] !== schemaData[i][0] ){ //if keys !=
          return false;
        } else {
          if ( !this.isArray( objectData[i][1] ) ){ //if not array
            if ( typeof objectData[i][1] !== schemaData[i][1].type ) return false;
          } else { //is array
            if ( this.isArray( objectData[i][1] ) && schemaData[i][1].type !== 'array' ){
              return false;
            } else { //test array value type
              for ( let j = 0; j < objectData[i][1].length; j++ ){
                if ( this.validateArrayValues( schemaData[i][1].type, objectData[i][1][j] === false ) ) return false;
              }
            }
          }
        }
      }

      return true;

    } else return false;
  }

  validateArrayValues( type, value ) {

    switch( type ) {

    case 'number' :
      return this.isNumber(value);

    case 'string' :
      return this.isString(value);

    case 'array' :
      return this.isArray(value);

    case 'object' :
      return this.isObject(value);

    case 'function' :
      return this.isFunction(value);

    }

  }

}

module.exports = Validator;

