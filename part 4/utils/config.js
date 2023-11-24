require('dotenv').config() // load env. file contents into a key pair
// for example: MY_VAR=hello_world in env. file
// => process.env.MY_VAR = hello_world

let PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI
  
module.exports = { // module.exports is CommonJS export, not native javascript keyword export
  MONGODB_URI,
  PORT
}