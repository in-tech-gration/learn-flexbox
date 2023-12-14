// emmet.js:
const emmet = require('emmet');
// console.log(expand('p>a')); // <p><a href=""></a></p>

module.exports = emmet.default;

// HOW TO: Make an npm package available as a global variable
// npx browserify emmet.js --s emmet > emmet.min.js


// npx browserify main.js -o bundle.js
