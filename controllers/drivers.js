var db = require( '../models' );
var Driver = db.Driver;

exports.index = function( req, res, next ){

	Driver.findAll()
		.then( function( drivers ){

			res.send( 200, { drivers: drivers } );
			return next();
		} )
		.catch( function( err ){
			
			console.log( err )
			res.send( 400, { err: err } );
			return next();
		} );
};

exports.create = function( req, res, next ){

	req.assert( 'driver', 'isObject' );
	req.assert( 'driver.firstName', 'isString' );
	req.assert( 'driver.lastName', 'isString' );

	Driver.create( {
		firstName: req.body.driver.firstName,
		lastName: req.body.driver.lastName
	} ).then( function( dbDriver ){

		res.send( 201, { driver: dbDriver } );
		return next();
	} ).catch( function( err ){

		console.log( err );
		res.send( 400, { err: err } );
		return next();
	} );
};

exports.view = function( req, res, next ){

	req.assert( 'driver_id', 'isString' );

	Driver.findById( req.params.driver_id )
		.then( function( driver ){

			res.send( 200, { driver: driver } );
			return next();
		} )
		.catch( function( err ){

			console.log( err );
			res.send( 400, { err: err } );
			return next();
		} );
};

exports.update = function( req, res, next ){

	req.assert( 'driver', 'isObject' );
	req.assert( 'driver_id', 'isString' );

	Driver.findById( req.params.driver_id )
		.then( function( dbDriver ){
			if( req.body.driver.firstName ){
				dbDriver.firstName = req.body.driver.firstName;
			}
			if( req.body.driver.lastName ){
				dbDriver.lastName = req.body.driver.lastName;
			}
			dbDriver.save().then( function(){

				res.send( 200, { driver: dbDriver } );
				return next();
			} );
		} )
		.catch( function( err ){

			console.log( err );
			res.send( 400, { err: err } );
			return next();
		} );
};