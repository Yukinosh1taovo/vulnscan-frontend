import request from '@/utils/request';

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'POST',
    data,
  });
}

export function register(data) {
  return request({
    url: '/auth/register',
    method: 'POST',
    data,
  });
}

export function getCaptcha() {
  return request({
    url: '/auth/captcha',
    method: 'GET',
  });
}
