import request from '../utils/request'

export const getFlatDepartmentList = () => {
    return request({
        method: 'POST',
        url: '/web/sys/department/getFlatDepartmentList',
    })
}
