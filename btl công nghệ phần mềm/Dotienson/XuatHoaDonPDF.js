import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateInvoicePDF = (order) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text('HÓA ĐƠN BÁN HÀNG', 105, 20, { align: 'center' });
  
  // Thông tin cửa hàng
  doc.setFontSize(12);
  doc.text('Cửa hàng ABC', 20, 40);
  doc.text('123 Đường ABC, Hà Nội', 20, 50);
  
  // Thông tin đơn hàng
  doc.text(`Mã đơn: #${order.id}`, 20, 70);
  doc.text(`Khách hàng: ${order.customerName}`, 20, 80);
  doc.text(`Ngày: ${new Date().toLocaleDateString('vi-VN')}`, 20, 90);
  
  // Bảng sản phẩm
  const tableData = order.items.map(item => [
    item.name,
    item.quantity,
    new Intl.NumberFormat('vi-VN').format(item.price) + ' VNĐ',
    new Intl.NumberFormat('vi-VN').format(item.total) + ' VNĐ'
  ]);
  
  doc.autoTable({
    head: [['Sản phẩm', 'SL', 'Đơn giá', 'Thành tiền']],
    body: tableData,
    startY: 110,
    theme: 'grid'
  });
  
  // Tổng tiền
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(16);
  doc.text(`Tổng tiền: ${new Intl.NumberFormat('vi-VN').format(order.total)} VNĐ`, 105, finalY, { align: 'right' });
  
  // Tích điểm
  if (order.points) {
    doc.text(`Tích điểm: ${order.points} điểm`, 20, finalY + 15);
  }
  
  // Lưu file
  doc.save(`hoa-don-${order.id}.pdf`);
};