const { pubsub }  = require('../../../../services/pubsub.service') ;
const { NOTIFICATION_MELI }  = require('../events');

const { NotificationMeliType } = require('../../types/subscription/notificationMeliType');

module.exports = {
  type: NotificationMeliType,
  subscribe: () => pubsub.asyncIterator(NOTIFICATION_MELI)
};