const {
    GraphQLEnumType,
} = require('graphql') ;

const  WebHookStatus = new GraphQLEnumType({
    name: 'WebHookStatus',
    values: {
        ACTIVE: {
            value: "active",
        },
        DISABLED: {
            value: "disabled",
        },
        PAUSED: {
            value: "paused",
        },
    },
});
  
module.exports = WebHookStatus;