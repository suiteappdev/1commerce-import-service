const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList
} = require('graphql');
const WooCommerceProductVariationType = require('../ProductVariations/wooCommerceProductVariation.type');
const WooCommerceImageProductType = require('../ProductImages/WooCommerceProductImage.type');
const WoocommerceTaxType =  require('./WooCommerceTaxType');
const WoocommerceDiscountType =  require('./wooCommerceDiscountType');
const stripHtml = require("string-strip-html");
const { getVariations, getCategories, getTax } = require('../../../../../controllers/WooCommerce.controller');
const moment = require('moment');

let WooCommerceProductType = new GraphQLObjectType({
  name: 'WooCommerceProductType',
    fields: () => ({
      name: { type: GraphQLString},
      externalId: { type: GraphQLString,  resolve:(obj, args, context, info)=>{
        return obj.id.toString();
      }},
      simple: { type: GraphQLBoolean,  resolve:(obj, args, context, info)=>{
        return obj.type == 'simple' ? true : false;
      }},
      reference:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        return obj.sku
      }}, //Referencia del Producto
      description:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        return stripHtml(obj.description)
      }}, //Descripción del Producto o Descripción técnica
      descriptionShort:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        return stripHtml(obj.short_description)
      }}, //Descripción Corta o Descripción comercial
      active:{ type:GraphQLBoolean, resolve:(obj, args, context, info)=>{
        return obj.status == "publish" ? true : false
      }}, //Estado del Producto
      discount: {type: new GraphQLList(WoocommerceDiscountType),resolve:(obj, args, context, info)=>{
        let disc = [];
      
        if (obj.date_on_sale_from && obj.date_on_sale_to) {
          disc = [{
            name: obj.name,
            from: moment(obj.date_on_sale_from).format('YYYY/MM/DD'),
            to: moment(obj.date_on_sale_to).format('YYYY/MM/DD'),
            type: 'C',
            value:  parseInt(obj.regular_price) - parseInt(obj.sale_price)
          }]
        }

        return disc
      }},
      tax:{ type:WoocommerceTaxType, resolve : (obj, args, context, info)=>{
        return obj.tax || {};
      }},
      manufacturer:{ type:GraphQLString, resolve : (obj, args, context, info)=>{
        if(obj.brands){
          return obj.brands[0].name;
        }

        if(( obj.attributes &&  obj.attributes.length > 0 )){
          let attrs = obj.attributes;
          let manufacturer = attrs.filter(o=>o.name.toLowerCase() === 'marca');

          if(manufacturer.length > 0)
            return manufacturer[0].options[0];
          else
            return null;
        }
        
      }}, 
      width:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
        return obj.dimensions ? parseInt(obj.dimensions.width == "" ? 0 : obj.dimensions.width) : 0;
      }}, //Ancho del Empaque del producto
      height:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
        return obj.dimensions ? parseInt(obj.dimensions.height == "" ? 0 : obj.dimensions.width) : 0;
      }}, //Alto del Empaque del producto
      length:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
        return obj.dimensions ? (obj.dimensions.length.length > 0 ? parseInt(obj.dimensions.length) : 0) : 0
      }}, //Largo del Empaque del Producto
      weight:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
        return obj.weight ? parseInt(obj.weight == "" ?  0 : obj.weight ) : 0;
      } }, //Peso del Empaque del Producto
      images:{ type:new GraphQLList(WooCommerceImageProductType), resolve:(obj, args, context, info)=>{
          if(obj.images && obj.images.length > 0){
            return obj.images
          }else if (obj.image){
              return [obj.image]
          }else{
            return []
          }
      }},
    color:{ type:new GraphQLList(GraphQLString), resolve:(obj, args, context, info)=>{
        if(( obj.attributes &&  obj.attributes.length > 0 )){
        let attrs = obj.attributes;
        let color = attrs.filter(o=>(o.name.toLowerCase() === 'color' || o.name.toLowerCase() === 'color_primario'))[0];
        return color ? color.options ? color.options : [color.option] : null;
      }
    }},
  size:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      if(( obj.attributes &&  obj.attributes.length > 0 )){
      let attrs = obj.attributes;
      let size = attrs.filter(o=>(o.name.toLowerCase() === 'size'))[0];
      return size ? size.options ? size.options : [size.option] : 'único';
    }
  }},
    product_weight:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
      if(( obj.attributes &&  obj.attributes.length > 0 )){
        let attrs = obj.attributes;
        let weight = attrs.filter(o=>(o.name.toLowerCase() === 'peso_producto'));

        if(weight.length > 0)
          return weight[0] ? weight[0].options[0] : null;
        else
          return null;
      }else{
        return null;
      }
    } },
    quantity:{ type:GraphQLInt, resolve:(obj, args, context, info)=>{
      return obj.stock_quantity || 0
    }},
    variations:{ type:new GraphQLList(WooCommerceProductVariationType), resolve:(obj, args, context, info)=>{
      
      let getGender = (p)=>{
            if(( p.attributes &&  p.attributes.length > 0 )){
              let attrs = obj.attributes;
              let gender = attrs.filter(o=>(o.name.toLowerCase() === 'gender' || o.name.toLowerCase() === 'genero' || o.name === 'Género'));
    
              if(gender.length > 0)
                return gender[0].options[0];
              else
                return null;
            }
            return null;
          }

          let getweight = (p)=>{
            if(( obj.attributes &&  obj.attributes.length > 0 )){
              let attrs = obj.attributes;
              let weight = attrs.filter(o=>(o.name.toLowerCase() === 'weight' || o.name.toLowerCase() === 'peso_producto'));
      
              if(weight.length > 0)
                return weight[0] ? weight[0].option : null;
              else
                return null;
            }else{
              return  null;
            }
          }


          if(!obj.variations || obj.variations.length === 0){
            let price = obj.regular_price ? parseInt(obj.regular_price == "" ? 0 : obj.regular_price) :  parseInt(obj.price);

            let disc = [];
      
            if (obj.date_on_sale_from && obj.date_on_sale_to) {
                disc = [{
                  name: obj.name,
                  from: moment(obj.date_on_sale_from).format('YYYY/MM/DD'),
                  to: moment(obj.date_on_sale_to).format('YYYY/MM/DD'),
                  type: 'C',
                  value: parseInt(obj.regular_price) - parseInt(obj.sale_price)
                }]
            } else if (obj.sale_price && parseInt(obj.sale_price) !== 0 && obj.sale_price !== obj.regular_price) {
              disc = [{
                name: obj.name || null,
                from: moment().format('YYYY/MM/DD HH:mm:ss'),
                to: moment().add(7, 'days').format('YYYY/MM/DD HH:mm:ss'),
                type: 'C',
                value: parseInt(obj.regular_price) - parseInt(obj.sale_price),
              }]
            }

            let defaultVariation = {
                sku:obj.sku,
                ean13:obj.ean13 || '',
                upc:obj.upc || '', 
                price:price,
                gender:getGender(obj), //Género para el cual aplica el producto (Masculino, Femenino, Unisex, Niños, Niñas)
                talla:'único', //Género para el cual aplica el producto (Masculino, Femenino, Unisex, Niños, Niñas)
                stock_quantity:obj.stock_quantity || 0,
                weight : getweight(obj),
                discount : disc
            }
        
            return [defaultVariation];
          }



        return getVariations(context.req, obj);
      }},
    }),
});
module.exports = WooCommerceProductType;