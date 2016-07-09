var restify = require( 'restify' );
var restifyValidation = require( 'restify-validation' );
var config = require( './config/config.json' );
var db = require( './models' );
var server = restify.createServer( {
	name: 'Taxi'
} );

server.use( restify.acceptParser( server.acceptable ) );
server.use( restify.queryParser() );
server.use( restify.bodyParser() );
server.use( restify.CORS() );
server.use( restify.fullResponse() );
server.use( restifyValidation() );

db.sequelize.sync( { force: false } ).then( function(){
	server.listen( config.api.port, function(){
		console.log( "Server listening on port " + config.api.port );
	} );
} );

require( './config/routes' )( server );