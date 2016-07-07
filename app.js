var restify = require( 'restify' );
var config = require( './config/config.json' );
var db = require( './models' );
var server = restify.createServer( {
	name: 'Taxi'
} );

server.use( restify.acceptParser( server.acceptable) );
server.use( restify.queryParser() );
server.use( restify.bodyParser() );

db.sequelize.sync( { force: true } ).then( function(){
	server.listen( config.api.port, function(){
		console.log( "Server listening on port " + config.api.port );
	} );
} );