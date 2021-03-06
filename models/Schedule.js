module.exports = function( sequelize, DataTypes ){
	var Schedule = sequelize.define( "Schedule", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
			primaryKey: true
		},
		day: {
			type: DataTypes.STRING,
			allowNull: false
		},
		driver_id: {
			type: DataTypes.UUID,
			allowNull: true
		},
		vehicle_id: {
			type: DataTypes.UUID,
			allowNull: true
		}
	},
	{
		tableName: "schedules",
		associate: function( models ){
			Schedule.belongsTo( models.Driver );
			Schedule.belongsTo( models.Vehicles );
		}
	} );
	return Schedule;
};