import request from '~/utils/request'

export function addSchedule(data: any) {
  return request({
    url: '/meta/schedule',
    method: 'post',
    data: data
  })
}

export function editSchedule(data: any) {
  return request({
    url: '/meta/schedule',
    method: 'put',
    data: data
  })
}

export function getSchedules(params: any) {
  return request({
    url: '/meta/schedule/list',
    method: 'get',
    params: params
  })
}

export function getScheduleById(id: any) {
  return request({
    url: `/meta/schedule/${id}`,
    method: 'get'
  })
}

export function delSchedule(id: any) {
  return request({
    url: `/meta/schedule/${id}`,
    method: 'delete'
  })
}