const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} = require('graphql');

const { addWebhook, updateWebhook } = require('../../../controllers/WooCommerce.controller');
const { addWebhookShopify, deleteWebhookShopify } = require('../../../controllers/Shopify.controller');
const { getToken, validate}  = require('../../../util/auth.util');

const WoocommerceWebHookType = require('../types/wooCommerce/WebHook/WebHook.type');
const ShopifyWebHookType = require('../types/shopify/Webhook/WebHook.type');
const ShopifyDeleteWebHookType = require('../types/shopify/Webhook/deleteWebHook.type');
const WebHookInputType = require('./inputs/webhook.input');
const WebHookShopifyInputType = require('./inputs/webhookShopify.input');

const mutations = new GraphQLObjectType({
  name: 'RootMutations',
  description: 'RootMutations',
  fields: {
    createWoocommerceWebHook: {
        description: "create a woocommerce webhook entry",
        type: WoocommerceWebHookType,
        args: {
            input: {type: WebHookInputType}
        },
        resolve: async (root, args, context) => {
          let token = getToken(context.req);
          
          if(!token){
            throw new Error("Auth error token no provided");
          }

          let credentials = validate(token);

          if(!credentials){
            throw new Error("Invalid credential data");
          }

          delete credentials.iat;
          context.req = credentials;
          
          let webhook = await addWebhook(credentials, args.input);
            
          return webhook;
        }
    },
    updateWoocommerceWebHook: {
        description: "update a woocommerce webhook entry",
        type: WoocommerceWebHookType,
        args: {
            webhookId: {type: GraphQLID},
            input: {type: WebHookInputType}
        },
        resolve: async (root, args, context) => {
          let token = getToken(context.req);
          
          if(!token){
            throw new Error("Auth error token no provided");
          }

          let credentials = validate(token);

          if(!credentials){
            throw new Error("Invalid credential data");
          }

          delete credentials.iat;
          context.req = credentials;
          
          let webhook = await updateWebhook(credentials, args.webhookId, args.input);
            
          return webhook;
        }
    },
    deleteWoocommerceWebHook: {
        description: "Delete a woocommerce webhook entry",
        type: WoocommerceWebHookType,
        args: {
            webhookId: {type: GraphQLID}
        },
        resolve: async (root, args, context) => {
            return {};
        }
    },
    createShopifyWebHook: {
      description: "create a shopify webhook entry",
      type: ShopifyWebHookType,
      args: {
        input: {type: WebHookShopifyInputType}
      },
      resolve: async (root, args, context) => {
        let token = getToken(context.req);
        if(!token){
          throw new Error("Auth error token no provided");
        }
        let credentials = validate(token);
        if(!credentials){
          throw new Error("Invalid credential data");
        }
        delete credentials.iat;
        context.req = credentials;
        let webhook = await addWebhookShopify(credentials, args.input);
        return webhook;
      }
    },
    deleteShopifyWebHook: {
      description: "delete a shopify webhook",
      type: ShopifyDeleteWebHookType,
      args: { webhookId: {type: GraphQLString}},
      resolve: async (root, args, context) => {
        let token = getToken(context.req);
        if(!token){
          throw new Error("Auth error token no provided");
        }
        let credentials = validate(token);
        if(!credentials){
          throw new Error("Invalid credential data");
        }
        delete credentials.iat;
        context.req = credentials;
        let webhook = await deleteWebhookShopify(credentials, args.webhookId);
        return webhook;
      }
    },
  }
});

module.exports = { mutations };

        