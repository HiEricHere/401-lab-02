'use strict';

const validator = require('./lib/validator');

const schema = {
  fields : {
    name : { type : 'object' },
    eyes : { type : 'string' },
    hands : { type : 'number' },
    cool : { type : 'boolean' },
    likes : { type : 'array' },
  }
};

let testtrue = {
  name : 'asdf',
  eyes : 'yes',
  hands : 2,
  cool : false
};

let testfalse1 = {
  name : {
    first : 'asdf',
    last : 'qwer'
  },
  hair : 'yes',
  hands : 2,
  cool : true,
  likes : [ 'stuff', 'hi', 'uhoh' ]
}

let test = Object.entries(testfalse1);
let schemaArray = Object.entries(schema.fields);

console.log(schemaArray[0][1].type);

// test.forEach( ( value, idx ) => {
//   console.log( value[0], schemaArray[idx][0], value[0] === schemaArray[idx][0]);
// });

// console.log(typeof test[0][1]);

// console.log(typeof test[0][1] === schema.fields['name'].type);
// console.log(typeof test[0][1], schema.fields[test[0][0]].type);

// for( let i = 0; i < test.length; i++ ){
//   console.log(typeof test[i][1] === schema.fields[test[i][0]].type);
// }

