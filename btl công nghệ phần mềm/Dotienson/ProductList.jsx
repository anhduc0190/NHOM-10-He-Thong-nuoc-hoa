import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/apiService';

const ProductList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError('Không tải được sản phẩm');
        console.error('Fetch products error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="loading">Đang tải sản phẩm...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p className="price">{product.price.toLocaleString()} VNĐ</p>
          <button 
            onClick={() => onAddToCart(product)}
            className="add-to-cart-btn"
          >
            Thêm vào giỏ
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;