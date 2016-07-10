var db = require( '../models' );
var Promise = require( 'promise' );
var Schedule = db.Schedule;
var Driver = db.Driver;
var Vehicle = db.Vehicle;

exports.index = function( req, res, next ){

	var bool = true;

	var query = {
		where: []
	};

	if( req.params.driver_id){
		query.where.push( { driver_id: req.params.driver_id } );
	}

	if( req.params.vehicle_id){
		query.where.push( { vehicle_id: req.params.vehicle_id } );
	}

	if( req.params.day ){
		query.where.push( { day: req.params.day } );
	}

	if( query.where.length === 0 ){
		bool = false;
	}

	Schedule.findAll( query )
		.then( function( schedules ){
			if( bool ){

				res.send( 200, { schedules: schedules } );
				return next();
			}
			else{

				var promises = [];
				schedules.forEach( function( day ){
					promises.push( Driver.findById( day.driver_id ).then( function( driver ){
						day.dataValues.driver = driver;
					} ) );
					promises.push( Vehicle.findById( day.vehicle_id ) );
				} );
				Promise.all( promises ).then( function( results ){
					
					res.send( 200, { schedules: schedules } );
					return next();
				} );
			}
		} )
		.catch( function( err ){

			console.log( err );
			res.send( 400, { err: err } );
			return next();
		} );
};

exports.create = function( req, res, next ){

	req.assert( 'schedule', 'isObject' );
	req.assert( 'schedule.day', 'isString' );
	req.assert( 'schedule.driver_id', 'isString' );
	req.assert( 'schedule.vehicle_id', 'isString' );

	Schedule.create( {
		day: req.body.schedule.day,
		driver_id: req.body.schedule.driver_id,
		vehicle_id: req.body.schedule.vehicle_id
	} ).then( function( dbSchedule){

		res.send( 201, { schedule: dbSchedule } );
		return next();
	} ).catch( function( err ){

		console.log( err );
		res.send( 400, { err: err } );
		return next();
	} );
};

exports.view = function( req, res, next ){

	req.assert( 'schedule_id', 'isString' );

	Schedule.findById( req.params.schedule_id )
		.then( function( dbSchedule ){

			res.send( 200, { schedule: dbSchedule } );
			return next();
		} )
		.catch( function( err ){

			console.log( err );
			res.send( 400, { err: err } );
			return next();
		} );
};

exports.update = function( req, res, next ){

	req.assert( 'schedule', 'isObject' );
	req.assert( 'schedule_id', 'isString' );

	Schedule.findById( req.params.schedule_id )
		.then( function( dbSchedule ){
			if( req.body.schedule.day ){
				dbSchedule.day = req.body.schedule.day;
			}
			if( req.body.schedule.driver_id ){
				dbSchedule.driver_id = req.body.schedule.driver_id;
			}
			if( req.body.schedule.vehicle_id ){
				dbSchedule.vehicle_id = req.body.schedule.vehicle_id;
			}
			dbSchedule.save().then( function(){

				res.send( 200, { schedule: dbSchedule } );
				return next();
			} );
		} )
		.catch( function( err ){

			console.log( err );
			res.send( 400, { err: err } );
			return next();
		} );
};

exports.destroy = function( req, res, next ){

	req.assert( 'schedule_id', 'isString' );

	Schedule.findById( req.params.schedule_id )
		.then( function( dbSchedule ){
		
			dbSchedule.destroy().then( function(){

				res.send( 200, { schedule: dbSchedule } );
				return next();
			} );
		} )
		.catch( function( err ){

			console.log( err );
			res.send( 400, { err: err } );
			return next();
		} );
};