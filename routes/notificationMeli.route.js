const express = require('express');
let queue = require('queue');
const router = express.Router();
const { pubsub }  = require('../services/pubsub.service');
const { NOTIFICATION_MELI }  = require('../graphql/schemas/subscriptions/events');

let objectQueue = queue({
  timeout: 6000,
  concurrency: 1,
  autostart: true
});

objectQueue.on('start', async (result) => {
  pubsub.publish(NOTIFICATION_MELI, { NotificationMeli: result.data });
});

router.post('/notificationml', async (req, res)=>{
  let resource = req.body.resource;
  let userId = req.body.user_id;
  let topic = req.body.topic;
  let data = {
    resource,
    user_id: userId,
    topic
  };
  let job = function() {};
  job.data = data;
  objectQueue.push(job);
  res.json(data);
});

module.exports = router;
