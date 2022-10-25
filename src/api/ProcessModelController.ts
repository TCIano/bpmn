import request from '../utils/request'

/**
 * 流程模型设计稿保存
 * @param {Object} data
 * workflowModeBaseBean	    object	必须
 *      description	string	非必须流程模型描述
 *      json_xml	string	必须流程模型JSON定义
 *      modelId	string	必须流程模型id
 *      name	string	必须流程模型名称
 *      processDefinitionId	string	必须流程定义ID
 *      startMode	string	必须流程启动模式	枚举: AUTOMATIC,MANUAL
 *      svg_xml	string	必须流程模型图形定义
 * workflowModeExtendBean	object	必须
 *      endNoneEventExtendBeanList	object []	非必须流程所含空结束事件	item 类型: object
 *      nodeExtendBeanList	object []	非必须流程所含任务节点	item 类型: object
 *      organizationNo	string	非必须所属机构编码
 *       processDefinitionId	string	非必须流程定义ID
 *       processDefinitionKey	string	非必须流程定义key
 *       processDeploymentDate	string	非必须流程发布时间	format: date-time
 *       processName	string	非必须流程名称
 *       processVersion	integer	非必须流程版本号	format: int32
 *       serviceNodeExtendBeanList	object []	非必须流程所含服务节点	item 类型: object
 *       startDepartmentNoList	string []	非必须可启动部门编码	item 类型: string
 *       startNoneEventExtendBeanList	object []	非必须流程所含空开始事件	item 类型: object
 *       startPostNoList	string []	非必须可启动岗位编码	item 类型: string
 *       startUserNoList	string []	非必须可启动人员编码	item 类型: string
 *       workflowClassifyId	string	非必须流程所属分类
 * @returns
 */
export const saveModelDesignApi = (workflowModeBaseBean, workflowModeExtendBean) => {
    return request({
        method: 'POST',
        url: '/web/biz/processModel/saveModelDesign',
        data: {
            workflowModeBaseBean,
            workflowModeExtendBean,
        },
    })
}

/**
 * model数据格式转换（xml->json）(json->xml)
 * @param {String} content 转换内容
 * @param {String} convertType 转换格式
 * @returns Promise
 */
export const modelformat = (content: String, convertType: any) => {
    return request({
        method: 'POST',
        url: '/web/biz/processModel/convertModelFormat',
        data: {
            content,
            //传递的数据为 什么格式的数据
            convertType: convertType === 'json' ? 'JSON_TO_XML' : 'XML_TO_JSON',
        },
    })
}

/**
 * 创建新流程
 * @param data Object
 * @returns
 */
export const createProcessApi = data => {
    return request({
        method: 'POST',
        url: '/web/biz/processModel/saveModelDefinition',
        data,
    })
}
