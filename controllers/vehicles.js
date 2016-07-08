var db = require( '../models' );
var Vehicle = db.Vehicle;

exports.index = function( req, res, next ){

	Vehicle.findAll()
		.then( function( vehicles ){

			res.send( 200, { vehicles: vehicles } );
			return next();
		} )
		.catch( function( err ){

			console.log( err );
			res.send( 400, { err: err } );
			return next();
		} );
};

exports.create = function( req, res, next ){

	req.assert( 'vehicle', 'isObject' );
	req.assert( 'vehicle.make', 'isString' );
	req.assert( 'vehicle.model', 'isString' );
	req.assert( 'vehicle.licensePlate', 'isString' );

	Vehicle.create( {
		make: req.body.vehicle.make,
		model: req.body.vehicle.model,
		licensePlate: req.body.vehicle.licensePlate
	} ).then( function( dbVechicle ){

		res.send( 201, { vehicle: dbVechicle } );
		return next();
	} ).catch( function( err ){

		console.log( err );
		res.send( 400, { err: err } );
		return next();
	} );
};

exports.view = function( req, res, next ){

	req.assert( 'vehicle_id', 'isString' );

	Vehicle.findById( req.params.vehicle_id )
		.then( function( vehicle ){

			res.send( 200, { vehicle: vehicle } );
			return next();
		} )
		.catch( function( err ){

			console.log( err );
			res.send( 400, { err: err } );
			return next();
		} );
};

exports.update = function( req, res, next ){
	
	req.assert( 'vehicle', 'isObject' );
	req.assert( 'vehicle_id', 'isString' );

	Vehicle.findById( req.params.vehicle_id )
		.then( function( dbVechicle ){
			if( req.body.vehicle.make ){
				dbVechicle.make = req.body.vehicle.make;
			}
			if( req.body.vehicle.model ){
				dbVechicle.model = req.body.vehicle.model;
			}
			if( req.body.vehicle.licensePlate ){
				dbVechicle.licensePlate = req.body.vehicle.licensePlate;	
			}
			dbVechicle.save().then( function(){

				res.send( 200, { vehicle: dbVechicle } );
				return next();
			} );
		} )
		.catch( function( err ){

			console.log( err );
			res.send( 400, { err: err } );
			return next();
		} );
};