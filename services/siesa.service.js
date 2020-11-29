let fs = require('fs');
let logger;
let soap = require('strong-soap').soap;

let init = async (app, locals) => {
    logger = locals.logger.getLogger("SiesaService");

    return new Promise(async (resolve, reject) => {

        logger.info(`Loading Siesa service`);

        try {
            locals.services = locals.services || {};
            locals.services.Siesa = {
                getBatchOrders
            };

            logger.info(`Siesa service done.`);

            return resolve();

        } catch (e) {
            logger.error(`Error loading  wooCommerce Service`);
            reject(new Error(`[ERROR]:loading  wooCommerce Service`));
        }
    });
}

    
let getBatchOrders  = (ini , end)=>{
    return new Promise((resolve, reject)=>{
        let url = 'http://wscnadarpruebas.siesacloud.com:8043/wsunoee/WSUNOEE.asmx?wsdl';

        let requestArgs={
            'pvstrxmlParametros':
                `<![CDATA[
                    <Consulta>
                        <NombreConexion>UnoEE_Cnadar_Pruebas</NombreConexion>
                        <IdCia>1</IdCia>
                        <IdProveedor>WS</IdProveedor>
                        <IdConsulta>Pedidos</IdConsulta>
                        <Usuario>gtintegration</Usuario>
                        <Clave>gtint2019</Clave>
                        <Parametros>
                            <fechaini>${ini}</fechaini>
                            <fechafin>${end}</fechafin>
                        </Parametros>
                    </Consulta>
                ]]>`
        };

        let options = {};

        try {
            soap.createClient(url, options, (err, client) =>{
                let method = client['EjecutarConsultaXML'];
                if(err){return reject(err);}
      
                method(requestArgs, async (err, result)=>{
                  if(err){return reject(err);}
                  
                  if(result){
                      let mapper = (order)=>{
                          return {
                              cia : order.cia,
                              co : order.co,
                              estado : order.estado,
                              fecha : order.fecha,
                              numDoc : order.numDoc,
                              oc_referencia : order.oc_referencia,
                              tipoDoc : order.tipoDoc
                          }
                      }
                      
                      return resolve(result.EjecutarConsultaXMLResult.diffgram.NewDataSet.Resultado.map(mapper));
                  }
      
                });
              });
        } catch (e) {
            reject(`[Error] : Ocurrio un error al realizar la peticion SIESA : ${e.message}`);
        }

    });
}

module.exports = { init, getBatchOrders };