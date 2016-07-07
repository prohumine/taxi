module.exports = function( sequlize, DataTypes ){
	var Driver = sequlize.define( "Driver", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		tableName: 'driver',
		associate: function( models ){
			Driver.hasMany( models.Schedule );
		}
	} );
	return Driver;
};