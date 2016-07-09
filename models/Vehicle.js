module.exports = function( sequelize, DataTypes ){
	var Vehicle = sequelize.define( "Vehicle", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
			primaryKey: true
		},
		licensePlate: {
			type: DataTypes.STRING,
			allowNull: false
		},
		make: {
			type: DataTypes.STRING
		},
		model: {
			type: DataTypes.STRING
		}
	},
	{
		tableName: 'vehicles',
	} );
	return Vehicle;
};