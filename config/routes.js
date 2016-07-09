module.exports = function( server ){
	var cont = require( '../controllers' );

	server.get( '/drivers', cont.drivers.index );
	server.post( '/drivers', cont.drivers.create );
	server.get( '/drivers/:driver_id', cont.drivers.view );
	server.put( '/drivers/:driver_id', cont.drivers.update );
	server.del( '/drivers/:driver_id', cont.drivers.destroy );

	server.get( '/vehicles', cont.vehicles.index );
	server.post( '/vehicles', cont.vehicles.create );
	server.get( '/vehicles/:vehicle_id', cont.vehicles.view );
	server.put( '/vehicles/:vehicle_id', cont.vehicles.update );
	server.del( '/vehicles/:vehicle_id', cont.vehicles.destroy );

	server.get( '/schedules', cont.schedules.index );
	server.post( '/schedules', cont.schedules.create );
	server.get( '/schedules/:schedule_id', cont.schedules.view );
	server.put( '/schedules/:schedule_id', cont.schedules.update );
};