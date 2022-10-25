import request from '../utils/request'

/**
 *  获取流程分类树
 * @param data Object {
 *      appid:string
 * }
 *
 * @returns Promise
 */
export const getCategoryList = (data: object) => {
    return request({
        method: 'POST',
        url: '/web/sys/classify/getProcessClassifyTree',
        // eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb2dpbl90b2tlbiIsImhlYWRlckFwcElkIjoxMDAwNCwiZXhwVGltZSI6MTY2NTI4OTAxNjYxNSwiYXBwSWQiOjEwMDA0LCJpc3MiOiJjeWJzdGFyIiwibG9naW5EYXRlIjoxNjY1Mjg1NDE2NjE1LCJ1c2VyVHlwZSI6Ik1lc1VzZXIiLCJ1c2VyTmFtZSI6Iuezu-e7n-euoeeQhiIsInVzZXJJZCI6MTUyNzc1NzEwODY2NDA3NDI0LCJpYXQiOjE2NjUyODU0MTY2MTUsInVzZXJDb2RlIjoiYWRtaW4ifQ.i3Xt82i7-JK8cNUvvWYBlVHc7UJ8CWpIWSFXL-srsEI
        data,
    })
}
