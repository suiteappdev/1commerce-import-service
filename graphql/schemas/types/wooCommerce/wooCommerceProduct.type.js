const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList
} = require('graphql');

const WooCommerceCategoryType = require('./wooCommerceCategoryType');
const WooCommerceImageType = require('./WooCommerceImageType');
const WooCommerceProductVariationType = require('./WooCommerceProductVariationType');
const WoocommerceTaxType =  require('./WooCommerceTaxType');
const stripHtml = require("string-strip-html");

const { getVariations, getCategories, getTax } = require('../../../../controllers/WooCommerce.controller');

let WooCommerceProductType = new GraphQLObjectType({
    name: 'WooCommerceProductType',
    fields: () => ({
      name: { type: GraphQLString},
      externalId: { type: GraphQLString,  resolve:(obj, args, context, info)=>{
        return obj.id.toString();
      }},
      reference:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        if(obj.sku === 'CM021401'){
          console.log(obj)
        }
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
      price:{ type:GraphQLInt, resolve : (obj, args, context, info)=>{
        return obj.price ? parseInt(obj.price == "" ? 0 : obj.price) : 0
      }}, 
      tax:{ type:WoocommerceTaxType, resolve : (obj, args, context, info)=>{
        return obj.tax;
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
      mainCategory: { type:WooCommerceCategoryType, resolve:(obj, args, context, info)=>{
        return obj.categories.length > 0 ? obj.categories[0] : null
      }}, //Categoria Principal del Producto
      mainColor:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
            return obj.attributes.length > 0  ? obj.attributes.filter((o)=>(o.name.toLowerCase() === 'color'))[0].options[0] : ""
      }},
      gender:{ type:GraphQLString, resolve:(obj, args, context, info)=>{
        if(( obj.attributes &&  obj.attributes.length > 0 )){
          let attrs = obj.attributes;
          let gender = attrs.filter(o=>(o.name.toLowerCase() === 'gender' || o.name.toLowerCase() === 'genero' || o.name.toLowerCase() === 'género' || o.name.toLowerCase() === 'género'));

          if(gender.length > 0)
            return gender[0].options[0];
          else
            return null;
        }
      }}, //Género para el cual aplica el producto (Masculino, Femenino, Unisex, Niños, Niñas)
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
      categories: { type:new GraphQLList(WooCommerceCategoryType), resolve:(obj, args, context, info)=>{
        return obj.categories || [];
      }},
      images:{ type:new GraphQLList(WooCommerceImageType), resolve:(obj, args, context, info)=>{
        return obj.images
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

          let getSize = (p)=>{
            if(( p.attributes &&  p.attributes.length > 0 )){
              let attrs = p.attributes;
              let size = attrs.filter(o=>(o.name.toLowerCase() === 'talla' || o.name.toLowerCase() === 'tamaño' || o.name.toLowerCase() === 'size'));
    
              if(size.length > 0)
                return size[0].options[0];
              else
                return 'único';
            }
    
            return 'único';
          }

          if(!obj.variations || obj.variations.length === 0){
            let defaultVariation = {
                sku:obj.sku,
                ean13:obj.ean13 || '',
                upc:obj.upc || '', 
                price:obj.price ? parseInt(obj.price == "" ? 0 : obj.price) : 0,
                gender:getGender(obj), //Género para el cual aplica el producto (Masculino, Femenino, Unisex, Niños, Niñas)
                talla:getSize(obj), //Género para el cual aplica el producto (Masculino, Femenino, Unisex, Niños, Niñas)
                stock_quantity:obj.stock_quantity || 0
            }
            
            return [defaultVariation];
          }

        return getVariations(context.req, obj.id);
      }},
    }),
});

module.exports = WooCommerceProductType;