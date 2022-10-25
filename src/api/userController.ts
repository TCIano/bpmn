import request from '../utils/request'

/**
 * 获取部门人员分页数据
 * departmentNo	string 部门编码
 * onlyUserInfo	boolean 是否仅查询用户信息
 *orderBy	tring排序字段
 *page*	integer($int32)1
 *postNO	string岗位编码
 *size*	integer($int32)20
 *sortAsc	boolean排序desc asc
 */
export const getUserPageList = (data: object) => {
    return request({
        method: 'POST',
        url: '/web/sys/user/getUserPageList',
        data,
    })
}
