console.log('form constants');
console.log(process.NODE_ENV);

const API_BASE_URL = process.NODE_ENV === 'production'
  ? 'https://vue-express-example.herokuapp.com/'
  : 'http://localhost:3000';

export const ENVIRONMENT_URL = `${API_BASE_URL}/environment`;