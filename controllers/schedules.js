var db = require( '../models' );
var Schedule = db.Schedule;

exports.index = function( req, res, next ){

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

	Schedule.findAll( query )
		.then( function( schedules ){

			res.send( 200, { schedules: schedules } );
			return next();
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

	Schedule.create( {
		day: req.body.schedule.day
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