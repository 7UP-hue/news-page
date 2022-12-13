import request from '~/utils/request'

export function postArticle(data: any) {
  return request({
    url: '/meta/article',
    method: 'post',
    data: data
  })
}

export function editArticle(data: any) {
  return request({
    url: '/meta/article',
    method: 'put',
    data: data
  })
}

export function getArticles(params: any) {
  return request({
    url: '/meta/article/list',
    method: 'get',
    params: params
  })
}

export function getArticleById(id: any) {
  return request({
    url: `/meta/article/${id}`,
    method: 'get'
  })
}

export function delArticle(id: any) {
  return request({
    url: `/meta/article/${id}`,
    method: 'delete'
  })
}