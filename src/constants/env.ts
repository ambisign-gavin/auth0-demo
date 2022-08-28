const env = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  LOGOUT_URL: process.env.NEXT_PUBLIC_LOGOUT_URL || '/logout',
  NODE_ENV: process.env.NODE_ENV || 'development',
  COUNT_PER_PAGE: 10,
};

export default env;
