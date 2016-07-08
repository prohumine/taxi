module.exports = function( sequelize, DataTypes ){
	var Vehicle = sequelize.define( "Vehicle", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true
		}
	},
	{
		tableName: 'vehicles'
	} );
	return Vehicle;
};