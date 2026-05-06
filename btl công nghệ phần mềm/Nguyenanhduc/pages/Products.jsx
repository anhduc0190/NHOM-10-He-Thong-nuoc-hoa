import { useState, useEffect } from 'react';
import { productAPI, orderAPI } from '../services/api';
import toast from 'react-hot-toast';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import QRPayment from '../components/QRPayment';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await productAPI.getAll();
      setProducts(data);
    } catch (error) {
      toast.error('Lỗi tải sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success(`${product.name} đã thêm vào giỏ`);
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const getTotal = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const createOrder = async () => {
    if (cart.length === 0) return toast.error('Giỏ hàng trống');

    try {
      await orderAPI.create({
        customerId: 1, // Hardcode test
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      });
      toast.success('Tạo đơn thành công!');
      setCart([]);
      setShowCheckout(false);
    } catch (error) {
      toast.error('Lỗi tạo đơn');
    }
  };

  if (loading) return <div className="text-center py-20">⏳ Đang tải...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Chọn sản phẩm</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl shadow-sm border">
            <ShoppingCart className="h-5 w-5 text-gray-500" />
            <span>{cart.length} sản phẩm</span>
            <span className="font-semibold text-blue-600">
              {getTotal().toLocaleString()}đ
            </span>
          </div>
          <button
            onClick={() => setShowCheckout(true)}
            disabled={cart.length === 0}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Thanh toán</span>
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden border hover:border-blue-200">
            <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-4xl">☕</span> {/* Thay bằng img thật */}
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{product.name}</h3>
              <p className="text-2xl font-bold text-blue-600 mb-4">
                {product.price.toLocaleString()}đ
              </p>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
              >
                <Plus className="inline h-5 w-5 mr-2" />
                Thêm vào giỏ
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Thanh toán</h2>
            
            <div className="space-y-4 mb-8">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.quantity}x</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{(item.price * item.quantity).toLocaleString()}đ</p>
                    <div className="flex space-x-1 mt-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 bg-white border rounded-lg flex items-center justify-center hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 bg-white border rounded-lg flex items-center justify-center hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Tổng tiền:</span>
                  <span>{getTotal().toLocaleString()}đ</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <QRPayment order={{ id: Date.now(), total: getTotal(), items: cart }} />
              <div className="space-y-3">
                <button
                  onClick={createOrder}
                  className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-green-700 transition-all flex items-center justify-center space-x-2"
                >
                  <span>✅ Thanh toán QR</span>
                </button>
                <button className="w-full bg-gray-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-600">
                  💰 Tiền mặt
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowCheckout(false)}
              className="mt-6 w-full text-gray-500 hover:text-gray-700 text-sm"
            >
              ❌ Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;