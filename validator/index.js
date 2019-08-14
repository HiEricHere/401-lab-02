'use strict';

const validator = require('./lib/validator');

const schema = {
  fields : {
    name : { type : 'string' },
    eyes : { type : 'string' },
    hands : { type : 'number' },
    cool : { type : 'boolean' }
  }
}

let testtrue = {
  name : 'asdf',
  eyes : 'yes',
  hands : 2,
  cool : false
};

let test = Object.entries(testtrue);
// console.log(typeof test[0][1]);

// console.log(typeof test[0][1] === schema.fields['name'].type);
// console.log(typeof test[0][1], schema.fields[test[0][0]].type);

for( let i = 0; i < test.length; i++ ){
  console.log(typeof test[i][1] === schema.fields[test[i][0]].type);
}

