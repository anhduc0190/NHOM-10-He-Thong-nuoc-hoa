const express = require('express');
const router = express.Router();
const ORDERS = require('../db.json').orders;
const CUSTOMERS = require('../db.json').customers;
const PRODUCTS = require('../db.json').products;

router.post('/', (req, res) => {
  const { customerId, items } = req.body;
  
  // Tính tổng tiền
  const total = items.reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id === item.productId);
    return sum + (product?.price * item.quantity || 0);
  }, 0);
  
  // Tính điểm thưởng (1đ = 1000đ)
  const points = Math.floor(total / 1000);
  
  const newOrder = {
    id: Date.now(),
    customerId,
    items,
    total,
    pointsEarned: points,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  ORDERS.push(newOrder);
  
  // Cộng điểm cho khách
  const customerIndex = CUSTOMERS.findIndex(c => c.id === customerId);
  if (customerIndex !== -1) {
    CUSTOMERS[customerIndex].points += points;
  }
  
  console.log(`🧾 Tạo đơn #${newOrder.id}, tổng: ${total}đ, điểm: ${points}`);
  
  res.status(201).json(newOrder);
});

router.get('/customer/:customerId', (req, res) => {
  const customerOrders = ORDERS.filter(o => o.customerId === parseInt(req.params.customerId));
  res.json(customerOrders);
});

module.exports = router;