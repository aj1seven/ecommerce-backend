const { Cart, CartItem, Product } = require("../models");

// Get or create cart
const getUserCart = async (userId) => {
  let cart = await Cart.findOne({ where: { UserId: userId } });
  if (!cart) {
    cart = await Cart.create({ UserId: userId });
  }
  return cart;
};

// GET CART
exports.getCart = async (req, res) => {
  const cart = await getUserCart(req.user.userId);

  const items = await CartItem.findAll({
    where: { CartId: cart.id },
    include: Product,
  });

  res.json(items);
};

// ADD TO CART
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await getUserCart(req.user.userId);

  let item = await CartItem.findOne({
    where: { CartId: cart.id, ProductId: productId },
  });

  if (item) {
    item.quantity += quantity || 1;
    await item.save();
  } else {
    item = await CartItem.create({
      CartId: cart.id,
      ProductId: productId,
      quantity: quantity || 1,
    });
  }

  res.status(201).json(item);
};

// REMOVE ITEM
exports.removeFromCart = async (req, res) => {
  const { id } = req.params;

  await CartItem.destroy({ where: { id } });
  res.json({ message: "Item removed from cart" });
};
