import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const QRPayment = ({ order }) => {
  const [copied, setCopied] = useState(false);
  
  const accountInfo = {
    bank: 'Techcombank',
    account: '1234567890',
    amount: order.total,
    orderId: order.id
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(accountInfo));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="qr-payment">
      <h3>Quét QR để thanh toán</h3>
      
      <div className="qr-container">
        <QRCode 
          value={JSON.stringify(accountInfo)}
          size={200}
          bgColor="#ffffff"
          fgColor="#000000"
        />
      </div>
      
      <p>Số tiền: {order.total.toLocaleString()} VNĐ</p>
      <button onClick={handleCopy} className="copy-btn">
        {copied ? '✅ Đã copy' : '📋 Copy thông tin'}
      </button>
      
      <div className="payment-info">
        <p><strong>Techcombank:</strong> 1234567890</p>
        <p><strong>Nội dung:</strong> DH#{order.id}</p>
      </div>
    </div>
  );
};

export default QRPayment;