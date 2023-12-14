import expand from 'emmet';
console.log( expand.toString() );

export default expand;

// npx browserify emmet.mjs --s expand > emmet.min.js -t [ babelify --presets [ @babel/preset-env ] 