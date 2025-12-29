const User = require("./User");
const Product = require("./Product");
const Cart = require("./Cart");
const CartItem = require("./CartItem");
const Order = require("./Order");
const OrderItem = require("./OrderItem");



// User ↔ Cart
User.hasOne(Cart);
Cart.belongsTo(User);

// Cart ↔ CartItem
Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

// Product ↔ CartItem
Product.hasMany(CartItem);
CartItem.belongsTo(Product);

User.hasMany(Order);
Order.belongsTo(User);

// Order → OrderItems
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

// Product → OrderItems
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

module.exports = {
  User,
  Product,
  Cart,
  CartItem,
  Order,
  OrderItem,
};
