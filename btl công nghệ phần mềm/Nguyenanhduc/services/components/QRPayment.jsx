import QRCode from 'qrcode.react';

const QRPayment = ({ order }) => {
  const paymentInfo = {
    bank: 'Techcombank',
    account: '1902XXXXXX',
    amount: order.total,
    content: `DH#${order.id}`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `Bank: ${paymentInfo.bank}\nSố TK: ${paymentInfo.account}\nSố tiền: ${paymentInfo.amount.toLocaleString()}đ\nNội dung: ${paymentInfo.content}`
    );
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
      <h3 className="font-bold text-lg text-emerald-800 mb-4 flex items-center">
        📱 Quét QR thanh toán
      </h3>
      
      <div className="flex flex-col items-center space-y-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-lg border-4 border-green-100">
          <QRCode
            value={JSON.stringify(paymentInfo)}
            size={160}
            bgColor="#ffffff"
            fgColor="#059669"
          />
        </div>
        <div className="text-center">
          <p className="font-bold text-2xl text-emerald-700">
            {order.total.toLocaleString()}đ
          </p>
          <p className="text-sm text-gray-600">Số tiền cần chuyển</p>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-xl border">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>🏦 Ngân hàng:</span>
            <span className="font-semibold">Techcombank</span>
          </div>
          <div className="flex justify-between">
            <span>💳 Số tài khoản:</span>
            <span className="font-mono">1902XXXXXX</span>
          </div>
          <div className="flex justify-between">
            <span>📝 Nội dung:</span>
            <span className="font-semibold">DH#{order.id}</span>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="mt-3 w-full bg-emerald-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-all flex items-center justify-center space-x-2 text-sm"
        >
          📋 Copy thông tin
        </button>
      </div>
    </div>
  );
};

export default QRPayment;