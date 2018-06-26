const autobahn = require('../index');
const fs = require('fs');
const ca = fs.readFileSync('root.crt');
const cert = fs.readFileSync('service.crt');
const key = fs.readFileSync('service.key');

const autobahnConnection = new autobahn.Connection({
   url: 'wss://localhost:8000/',
   realm: 'slimerp',
   authmethods: ["tls"],
   authid: "service",
   onchallenge: () => {
      return ""
   },
   tlsConfiguration: {
      ca,
      cert,
      key,
   }
});

autobahnConnection.onopen = () => {
   console.log('Successfully opened Connection.')
};
autobahnConnection.onclose = (r) => {
   console.error('Failed to opened Connection.', r)
};
autobahnConnection.open();