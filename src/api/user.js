import request from '@/utils/request'

export function login(data) {
  request({
    type: 'post',
    url: '/oauth/index/token',
    data
  })
}