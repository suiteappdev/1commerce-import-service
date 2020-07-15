let Sequelize = require("sequelize");

class Ccosto extends Sequelize.Model {

}

let Init = (app, locals) => {
	locals.models = locals.models || {};
	let sequelize = locals.services.sequelize;

	Ccosto.init({ id : { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, centro : Sequelize.STRING, descri : Sequelize.STRING,  nit : Sequelize.STRING, distrib : Sequelize.INTEGER, año : Sequelize.DECIMAL, mes : Sequelize.TINYINT, simulacro : Sequelize.TINYINT, orden : Sequelize.DECIMAL, direcc : Sequelize.STRING, tel : Sequelize.STRING, sede : Sequelize.STRING, cliente : Sequelize.STRING  }, { sequelize, modelName: 'c_costos' });

	locals.models.Ccosto =  sequelize.models.c_costos;
}

module.exports = Init;