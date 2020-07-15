const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt
} = require('graphql');

let WooCommerceProductType = new GraphQLObjectType({
    name: 'WooCommerceProductType',
    fields: () => ({
      name: { type: GraphQLString},
      reference:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        return obj.sku
      }}, //Referencia del Producto
      description:{ type:GraphQLString }, //Descripción del Producto o Descripción técnica
      /*descriptionShort:{ type:GraphQLString }, //Descripción Corta o Descripción comercial
      active:{ type:GraphQLBoolean }, //Estado del Producto
      price:{ type:GraphQLInt }, //Precio del Producto SIN IMPUESTOS
      tax:{ model:'tax'}, //Impuesto del Producto
      mainCategory: {model:'category'}, //Categoria Principal del Producto
      mainColor: {model:'color'}, //Color Principal del Producto
      manufacturer: {model:'manufacturer'}, // Fabricante o Marca del Producto
      gender:{model:'gender'}, //Género para el cual aplica el producto (Masculino, Femenino, Unisex, Niños, Niñas)
      width:{ type:GraphQLInt }, //Ancho del Empaque del producto
      height:{ type:GraphQLInt }, //Alto del Empaque del producto
      length:{ type:GraphQLInt }, //Largo del Empaque del Producto
      weight:{ type:GraphQLInt }, //Peso del Empaque del Producto
      stock:{ type:GraphQLBoolean, defaultValue:false }, //No Habilitado, a futuro se utilizará para habilitar funciones avanzadas de manejo de stock
      seller: {model:'seller'}, //Vendedor o Seller: Se refiere a quien es el "Dueño" de cada producto
      categories:{ //Categorias a las que pertenece el Producto
        collection:'category',
        via:'products'
      },
      images:{ //Imagenes Asociadas al Producto
        collection: 'productimage',
        via: 'product'
      },
      variations:{ //Variaciones del Producto Ej: Tallas. Todos los productos deben incluir como mínimo una variación
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