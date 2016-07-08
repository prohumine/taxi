var fs = require( "fs" );
var path = require( "path" );
var cont = {};

fs
  .readdirSync( __dirname )
  .filter( function( file ) {
    return ( file.indexOf( "." ) !== 0 ) && ( file !== "index.js" );
  } )
  .forEach( function( file ) {
  	var some = require( __dirname + '/' + file )
    cont[ file.substring( 0, file.indexOf( "." ) ) ] = some;
  } );
module.exports = cont;