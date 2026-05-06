// Dùng React Testing Library + MSW để mock API
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import App from '../App';

const server = setupServer(
  rest.post('/api/orders', (req, res, ctx) => {
    return res(ctx.json({ id: 1, success: true }));
  }),
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.json([
      { id: 1, name: 'Cà phê sữa', price: 35000 }
    ]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Luồng tạo đơn hàng thành công', async () => {
  render(<App />);
  
  // Test các bước
  await userEvent.click(screen.getByText('Cà phê sữa'));
  await userEvent.click(screen.getByText('Thanh toán'));
  
  // Kiểm tra tạo đơn thành công
  await waitFor(() => {
    expect(screen.getByText('Đơn hàng tạo thành công')).toBeInTheDocument();
  });
});