import request from '~/utils/request'

export function getPages(data: any) {
  return request({
    url: '/meta/page/list',
    method: 'get',
    params: data
  })
}

export function addPage(data: any) {
  return request({
    url: '/meta/page',
    method: 'post',
    data
  })
}

export function editPage(data: any) {
  return request({
    url: '/meta/page',
    method: 'put',
    data
  })
}

export function delPage(id: any) {
  return request({
    url: `/meta/page/${id}`,
    method: 'delete',
  })
}

export function getPageDetail(id: any) {
  return request({
    url: `/meta/page/${id}`,
    method: 'get'
  })
}