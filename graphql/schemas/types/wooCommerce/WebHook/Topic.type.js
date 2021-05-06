const {
    GraphQLEnumType,
} = require('graphql') ;

const TopicType = new GraphQLEnumType({
    name: 'TopicType',
    values: {
        PRODUCT_CREATED: {
            value: "product.created",
        },
        PRODUCT_UPDATED: {
            value: "product.updated",
        },
        PRODUCT_DELETED: {
            value: "product.deleted",
        },

        ORDER_CREATED: {
            value: "order.created",
        },
        ORDER_UPDATED: {
            value: "order.updated",
        },
        ORDER_DELETED: {
            value: "order.deleted",
        },
    },
});
  
module.exports = TopicType; 