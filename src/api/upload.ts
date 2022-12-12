import request from '~/utils/request'

export function uploadFile(file: any) {
  return request({
    url: '/meta/file/uploadImg',
    method: 'post',
    data: file
  })
}