const { Cart, CartItem, Order, OrderItem, Product } = require("../models");

exports.checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne({ where: { UserId: req.user.userId } });
    if (!cart) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const cartItems = await CartItem.findAll({
      where: { CartId: cart.id },
      include: Product,
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;
    cartItems.forEach(item => {
      total += item.quantity * item.Product.price;
    });

    // Create order
    const order = await Order.create({
      UserId: req.user.userId,
      totalAmount: total,
    });

    // Create order items
    for (const item of cartItems) {
      await OrderItem.create({
        OrderId: order.id,
        ProductId: item.ProductId,
        quantity: item.quantity,
        price: item.Product.price,
      });
    }

    // Clear cart
    await CartItem.destroy({ where: { CartId: cart.id } });

    res.status(201).json({
      message: "Order placed successfully",
      orderId: order.id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
