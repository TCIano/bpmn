import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'

const request: AxiosInstance = axios.create({
    baseURL: 'http://192.168.0.240/workflowApp',
    timeout: 5000,
})

//请求拦截器
request.interceptors.request.use(
    config => {
        // console.log(config)
        if (config && config?.headers) {
            config.headers.token =
                'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb2dpbl90b2tlbiIsImhlYWRlckFwcElkIjoxMDAwNCwiZXhwVGltZSI6MTY2NTI4OTAxNjYxNSwiYXBwSWQiOjEwMDA0LCJpc3MiOiJjeWJzdGFyIiwibG9naW5EYXRlIjoxNjY1Mjg1NDE2NjE1LCJ1c2VyVHlwZSI6Ik1lc1VzZXIiLCJ1c2VyTmFtZSI6Iuezu-e7n-euoeeQhiIsInVzZXJJZCI6MTUyNzc1NzEwODY2NDA3NDI0LCJpYXQiOjE2NjUyODU0MTY2MTUsInVzZXJDb2RlIjoiYWRtaW4ifQ.i3Xt82i7-JK8cNUvvWYBlVHc7UJ8CWpIWSFXL-srsEI'
            config.headers.appid = '10006'
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

//响应拦截器
request.interceptors.response.use(
    response => {
        const res = response.data
        return res
    },
    error => {
        return Promise.reject(error)
    }
)

export default request
