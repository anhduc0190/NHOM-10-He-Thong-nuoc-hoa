const express = require('express');
const router = express.Router();
const PRODUCTS = require('../db.json').products;

router.get('/', (req, res) => {
  res.json(PRODUCTS);
});

router.post('/', (req, res) => {
  const newProduct = {
    id: Date.now(),
    ...req.body,
    stock: req.body.stock || 0
  };
  PRODUCTS.push(newProduct);
  res.status(201).json(newProduct);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = PRODUCTS.findIndex(p => p.id === id);
  if (index !== -1) {
    PRODUCTS[index] = { ...PRODUCTS[index], ...req.body };
    res.json(PRODUCTS[index]);
  } else {
    res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
  }
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = PRODUCTS.findIndex(p => p.id === id);
  if (index !== -1) {
    PRODUCTS.splice(index, 1);
    res.json({ message: 'Xóa thành công' });
  } else {
    res.status(404).json({ error: 'Không tìm thấy' });
  }
});

module.exports = router;