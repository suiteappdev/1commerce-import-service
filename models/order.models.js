const mongoose  =  require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  co:  String,
  estado: String,
  fecha:   String,
  numDoc:   String,
  oc_referencia: String,
  tipoDoc : String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);