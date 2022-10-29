<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, watch } from 'vue';
import Modeler from 'bpmn-js/lib/Modeler'
import 'bpmn-js/dist/assets/diagram-js.css' // 左边工具栏以及编辑节点的样式
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import { xmlStr } from './xmlData'
import customPalette from '../bnmp/palette/index'
import paletteEntries from './config/paletteEntries.js'
import SelectPanel from '../../components/SelectPanel/index.vue'
// 汉化文件夹
import customTranslate from "../../customTranalate/customTranslate.js"

/**
 * 0.x版本 0.33.0
 */
// // // 右侧属性栏
import BpmnPropertiesPanelModule from 'bpmn-js-properties-panel'
// import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
// // 一个描述的json
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'
//自定义json文件
// import camundaModdleDescriptor from '../../components/properties-panel-extension/descriptors/authority.json'
//引入自定义的面板
import BpmnPropertiesProviderModule from '../../components/properties-panel-extension/provider/authority'
import magicModdleDescriptor from '../../components/properties-panel-extension/descriptors/authority.json'


/**
 * 1.x版本 1.9.0，导入方式和 0.x版本不一样，包内容也不一样
 */
// import {
//     BpmnPropertiesPanelModule,
//     BpmnPropertiesProviderModule,
//     CamundaPlatformPropertiesProviderModule
// } from 'bpmn-js-properties-panel'
// import 'bpmn-js-properties-panel/dist/assets/properties-panel.css'
// import 'bpmn-js-properties-panel/dist/assets/element-templates.css'

//导入自定义json文件
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json'
// import magicModdleDescriptor from './properties-panel-extension/descriptors/authority.json';
// 导入自定义面板
// import propertiesProviderModule from './properties-panel-extension/provider/authority'


import { modelformat, saveModelDesignApi, createProcessApi } from '../../api/ProcessModelController'
//导入自定义面板的页面


let canvas = ref(null)
let jsonString = ref('')
let svgXxml = ref('')
let mode = ''
let bpmnModeler: any = reactive({})
let isshow = ref(false)

onMounted(async () => {
    //自定义面板
    const modules = Modeler.prototype._modules
    const index = modules.findIndex((it: any) => it.paletteProvider)
    modules.splice(index, 1)

    // 汉化配置
    let customTranslateModule = {
        translate: ["value", customTranslate],
    };
    bpmnModeler = new Modeler({
        propertiesPanel: {
            parent: '#properties'
        },
        container: canvas.value,
        paletteEntries,
        additionalModules: [
            customPalette,
            // 原生基础面板面板
            BpmnPropertiesPanelModule,

            BpmnPropertiesProviderModule,

            //  原生扩展面板
            // CamundaPlatformPropertiesProviderModule,
            //  自定义面板
            // propertiesProviderModule,
            //汉化模板
            customTranslateModule,
        ],
        moddleExtensions: {
            //如果要在属性面板中维护camunda：XXX属性，则需要此 
            camunda: camundaModdleDescriptor,
            //0.x
            // authority: camundaModdleDescriptor
            //1.x
            // magic: magicModdleDescriptor
        }
    })
    // const eventBus = bpmnModeler.get('eventBus');
    // eventBus.on('element.hover', function (e) {
    //     console.log(e.element);
    // });




    try {
        const res = await bpmnModeler.importXML(xmlStr)
        console.log(res);

        addEventBusListerner()
        // 调整在正中间
        bpmnModeler.get('canvas').zoom('fit-viewport', 'auto')
        // console.log('rendered')
    } catch (err) {
        // console.log('error rendering', err)
    }
    console.log(bpmnModeler);
    // bpmnModeler.alignElements(elements, alignment)

})
// console.log(canvas);


//保存流程设计稿
const saveModelDesign = async () => {
    workflowModeBaseBean.json_xml = jsonString
    workflowModeBaseBean.svg_xml = svgXxml
    workflowModeBaseBean.modelId = mode
    // workflowModeExtendBean.processDefinitionId = mode
    console.log('保存成功');
    await saveModelDesignApi(workflowModeBaseBean, workflowModeExtendBean)
}

//获取当前元素
let currentElement = ref({})
//当前元素内容
let currentAttr = reactive({})
//
let selectPanel = ref(null)
//获取当前任务的类型


const addEventBusListerner = () => {
    let id = ''
    const eventBus = bpmnModeler.get('eventBus');
    //单独给进程设置样式
    console.log(eventBus);


    // 注册节点事件，eventTypes中可以写多个事件
    const eventTypes = ['element.click', 'element.changed', 'element.dblclick'];
    eventTypes.forEach((eventType) => {
        eventBus.on(eventType, (e: any) => {
            const { element } = e;


            if (eventType == 'element.changed') {
                let element = e.element;
                console.log(element);
                if (element.type == "bpmn:UserTask") {
                    console.log(selectPanel.value.$el);
                    workflowModeExtendBean.nodeExtendBeanList[0].nodeDefinitionKey = element.id
                    // selectPanel.value.$el.style.display = 'block'
                    isshow.value = true
                } else {
                    // selectPanel.value.$el.style.display = 'none'
                    isshow.value = false
                }
                if (element.type == "bpmn:StartEvent") {
                    workflowModeExtendBean.startNoneEventExtendBeanList[0].definitionId = element.id
                }
                if (element.type == "bpmn:EndEvent") {
                    workflowModeExtendBean.endNoneEventExtendBeanList[0].definitionId = element.id
                }
            }

            if (eventType === 'element.click') {
                console.log(element);

                if (element.type !== "bpmn:UserTask") {
                    isshow.value = false
                } else {
                    isshow.value = true
                }

                // 节点点击后想要做的处理
                // 此时想要点击节点后，拿到节点实例，通过外部输入更新节点名称
                currentElement = element;

                console.log(selectPanel);
                //传递数据
                selectPanel.value.currentElement = currentElement
                console.log(currentElement.id);
                id = currentElement.id
                const ele = getShapeById(id)
                if (element.type === "bpmn:UserTask") {
                    isshow.value = true
                }
                console.log(currentElement.businessObject);
                currentAttr = currentElement.businessObject
            }
            if (eventType == 'element.dblclick') {
                isshow.value = false
            }

        });
    });


}



const getShapeById = (id: string) => {
    const elementRegistry = bpmnModeler.get('elementRegistry');
    return elementRegistry.get(id)
}
let modelId = ''
const createProcess = async () => {
    const { data: {
        modeId
    } } = await createProcessApi({
        name: 'demo_7_17',
        organizationNo: "164306494895030272",
        processKey: "demo_7_17",
        startMode: "AUTOMATIC",
        workflowClassifyId: "22"
    })
    console.log(modeId);
    modelId = modeId
    mode = modeId
}

//xml-->json
const exportEvent = async () => {
    let resolve = ''
    await bpmnModeler.saveXML(
        { format: true }, function (err, xml) {
            console.log(xml);
            resolve = xml
        }
    )
    let svgString = ''
    await bpmnModeler.saveSVG(
        { format: true }, function (err, svg) {
            console.log(svg);
            svgString = svg
        }
    )
    // console.log(resolve);

    svgXxml = svgString

    const { data } = await modelformat(resolve, 'xml')
    console.log(data);
    // const res = await modelformat(data, 'json')
    // console.log(res);
    console.log(typeof modelId.toString());
    const newMo = modelId.toString()
    let newData = data.replace(/"canvas"/g, newMo)
    console.log(newData);

    jsonString = newData
}

//新建流程


//保存模板
//定义数据
//流程模型基本信息
let workflowModeBaseBean = {
    description: '测试描述是的',//	string
    json_xml: '',//流程模型JSON定义
    modelId: '',//流程模型id
    name: 'demo_7_15',//流程模型名称
    // processDefinitionId: '',//流程定义ID
    // startMode: '',//流程启动模式 .AUTOMATIC, MANUAL
    svg_xml: '',//流程模型图形定义
}

//流程扩展信息
let workflowModeExtendBean = {
    //流程所含空结束事件
    endNoneEventExtendBeanList: [
        {
            definitionId: 'sid-asd5g6s5-f4a4-4735-9ea3-08b943fd3884',//SID
            documentation: '',//说明
            name: '',//名称
            // processDefinitionId: '',
            // processDefinitionKey: '',
            processOverNoticeType: '',//结束通知方式
            // workflowExtendId: null,//
        }

    ],
    //流程所含任务节点
    nodeExtendBeanList: [
        //扩展信息
        {
            counterSignType: 'None',//会签模式
            documentation: '',//说明
            filterRuleDepartmentNoList: [],//过滤规则—需要过滤的部门
            filterRuleOrganizationNoList: [],//过滤规则–需要过滤的机构
            filterRulePostNoList: [],//过滤规则–需要过滤的岗位,
            jumpNodeList: [
                // {
                //     documentation: '',//描述
                //     jumpNodeDefinitionKey: '',//可跳转节点key
                //     jumpNodeName: '',//可跳转节点名称
                // }
            ],//可跳转节点集合
            nodeDefinitionKey: "sid-dgd76566-f1a4-4515-9ea3-08b542fd1584",//节点定义key
            nodeFilterRule: 'NONE_FILTER',//节点过滤规则
            nodeName: '节点新',//节点名称
            privilegeDepartmentNoList: [],//节点操作权限–部门范围
            privilegePostNoList: [],//节点操作权限–岗位范围
            privilegeUserNoList: ['164310757490561024'],//节点操作权限–人员范围
            // processDefinitionId: '',//所属流程定义id
            // processDefinitionKey: '',//所属流程定义key
            sortNo: '',// 排序
            targetNodeDefinitionKey: '',//当过滤规则是与指定节点操作人员时，存储指定节点的key
            taskAssignType: 'ASSIGN',//ASSIGN, CANDIDATE
            userTaskCreateNoticeType: '',//任务开启通知待办人方式
            // userTaskOverNoticeType: '',//任务完成通知方式
            // workflowExtendId: null,//  所属流程扩展信息id
        }
    ],
    //所属机构编码
    // organizationNo: '',
    // processDefinitionId: '',//  流程定义ID
    processDefinitionKey: 'demo_7_17',//流程定义key
    // processDeploymentDate: '',//流程发布时间
    processName: 'demo_7_17',//流程名称
    // processVersion: '',//流程版本号
    serviceNodeExtendBeanList: [
        //流程所含服务节点
        // {
        //     documentation: '',//说明
        //     jumpNodeDefinitionKey: '',//处理完成后要跳转的节点key
        //     name: '',//名称
        //     processDefinitionId: '',//所属流程定义id
        //     processDefinitionKey: '',//所属流程定义key
        //     serviceNodeDefinitionKey: '',//节点定义key
        //     serviceRule: '',//服务节点处理规则
        //     workflowExtendId: null,//所属流程扩展信息id
        // }
    ],
    startDepartmentNoList: [
        //可启动部门编码
    ],
    startNoneEventExtendBeanList: [
        //流程所含空开始事件
        {
            definitionId: 'sid-56dsf642-f8a4-4575-9ea1-04b944fd1874',// SID
            documentation: '',//说明
            name: '',//名称
            // processDefinitionId: '',
            // processDefinitionKey: '',
            // workflowExtendId: null
        }
    ],
    startPostNoList: [
        //    可启动岗位编码


    ],
    startUserNoList: [
        //可启动人员编码
    ],
    workflowClassifyId: '22',//流程所属分类id
}
// console.log(currentElement.value.type === 'bpmn:UserTask');

//监听当前的组件
let isHasUserTask = ref(false)
watch(currentElement, (value) => {
    console.log(value);
    if (value && value.value?.type === "bpmn:UserTask") {
        isHasUserTask.value = true
    }
}, {
    immediate: true,
})
</script>

<template>
    <div class='contianr'>

        <div class='options'>
            <a-button @click='createProcess'>新建</a-button>
            <a-button @click='exportEvent'>XML-->json</a-button>
            <a-button @click='saveModelDesign'>保存</a-button>
        </div>
        <div ref="canvas" class="canves"></div>
        <div>
            <div id="properties"></div>
            <SelectPanel ref='selectPanel' v-show='isshow'>
            </SelectPanel>
        </div>
        <!-- <iframe src="//www.runoob.com"></iframe> -->
    </div>
</template>

<style scoped lang='less'>
.contianr {
    display: flex;

    .canves {
        width: 100%;
        height: 100vh;
    }

    .options {
        display: flex;
        flex-direction: column;

    }

    #properties {
        width: 250px;
        margin-right: 10px;
        box-shadow: 3px 3px 3px 3px #ccc;
    }

}
</style>