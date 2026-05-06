export const login = async (username, password) => {
  try {
    const { data } = await authAPI.login({ username, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Lỗi đăng nhập');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user') || '{}');
};