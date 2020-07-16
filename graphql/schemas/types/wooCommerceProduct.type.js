const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList
} = require('graphql');

const WooCommerceCategoryType = require('./wooCommerceCategoryType');
const WooCommerceImageType = require('./WooCommerceImageType');

let WooCommerceProductType = new GraphQLObjectType({
    name: 'WooCommerceProductType',
    fields: () => ({
      name: { type: GraphQLString},
      reference:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        return obj.sku
      }}, //Referencia del Producto
      description:{ type:GraphQLString }, //Descripción del Producto o Descripción técnica
      descriptionShort:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        return obj.short_description
      }}, //Descripción Corta o Descripción comercial
      active:{ type:GraphQLBoolean, resolve:(obj, args, context, info)=>{
        return obj.status == "publish" ? true : false
      }}, //Estado del Producto
      price:{ type:GraphQLInt }, //Precio del Producto SIN IMPUESTOS
      //tax:{ type:GraphQLString }, //Impuesto del Producto
      mainCategory: { type:WooCommerceCategoryType, resolve:(obj, args, context, info)=>{
        return obj.categories.length > 0 ? obj.categories[0] : null
      }}, //Categoria Principal del Producto
      mainColor:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        console.log(obj)
        return obj.attributes.filter((obj)=>(obj.name.toLowerCase() === 'color' ))[0].options[0]

      }}, //Color Principal del Producto
      //manufacturer: {model:'manufacturer'}, // Fabricante o Marca del Producto
      gender:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        return obj.attributes.filter((obj)=>(obj.name.toLowerCase() === 'gender' ) || (obj.name.toLowerCase() === 'genero'))[0].options[0]
      }}, //Género para el cual aplica el producto (Masculino, Femenino, Unisex, Niños, Niñas)
      width:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
        return obj.dimensions ? parseInt(obj.dimensions.width) : null;
      }}, //Ancho del Empaque del producto
      height:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
        return obj.dimensions ? parseInt(obj.dimensions.height) : null;
      }}, //Alto del Empaque del producto
      length:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
        return obj.dimensions ? (obj.dimensions.length.length > 0 ? parseInt(obj.dimensions.length) : null) : null
      }}, //Largo del Empaque del Producto
      weight:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
        return obj.weight ? parseInt(obj.weight) : null;
      } }, //Peso del Empaque del Producto
      stock:{ type:GraphQLBoolean, defaultValue:false, resolve:(obj, args, context, info)=>{
        return obj.manage_stock
      }}, //No Habilitado, a futuro se utilizará para habilitar funciones avanzadas de manejo de stock
      //seller: {model:'seller'}, //Vendedor o Seller: Se refiere a quien es el "Dueño" de cada producto
      categories: { type:new GraphQLList(WooCommerceCategoryType), resolve:(obj, args, context, info)=>{
        return obj.categories
      }},
      images:{ type:new GraphQLList(WooCommerceImageType), resolve:(obj, args, context, info)=>{
        return obj.images
      }},
      /*variations:{ //Variaciones del Producto Ej: Tallas. Todos los productos deben incluir como mínimo una variación
        collection:'productvariation',
        via:'product'
      },
      suppliers:{//Proveedores del producto
        collection:'supplier',
        via:'products'
      },
      discount:{ //Descuentos Asociados al Producto
        collection:'catalogdiscount',
        via:'products'
      }*/
    }),
});

module.exports = WooCommerceProductType;