module.exports = function( sequlize, DataTypes ){
	var Driver = sequlize.define( "Driver", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
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
		tableName: 'drivers',
		associate: function( models ){
			Driver.hasMany( models.Schedule );
		}
	} );
	return Driver;
};