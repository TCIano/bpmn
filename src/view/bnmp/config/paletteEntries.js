export default {
    //工具栏配置项
    'event-separator': {
        //事件分割线
        group: 'events',
        separator: true,
    },
    'create.start-event': createAction(
        'bpmn:StartEvent',
        'event',
        'bpmn-icon-start-event-none',
        '开始任务'
    ),
    'create.end-event': createAction(
        'bpmn:EndEvent',
        'event',
        'bpmn-icon-end-event-none',
        '结束任务'
    ),
    'task-separator': {
        //任务分割线
        group: 'tasks',
        separator: true,
    },
    'create.task': createAction(
        'bpmn:Task',
        'activity',
        'bpmn-icon-task', // 🙋‍♂️ 使用图片后，记得修改成自己的类名
        '创建空白任务'
        // require('../img/task.png') // 📌
    ),
    'create.user-task': createAction(
        //用户任务
        'bpmn:UserTask',
        'activity',
        'bpmn-icon-user-task',
        '创建用户任务'
    ),
    'create.service-task': createAction(
        //服务任务
        'bpmn:ServiceTask',
        'activity',
        'bpmn-icon-service-task',
        '创建服务任务'
    ),

    'gateway-separator': {
        //网关分割线
        group: 'gateways',
        separator: true,
    },
    'create.exclusive-gateway': createAction(
        'bpmn:ExclusiveGateway',
        'gateway',
        'bpmn-icon-gateway-xor',
        '创建互斥网关'
    ),
    'create.parallel-gateway': createAction(
        'bpmn:ParallelGateway',
        'gateway',
        'bpmn-icon-gateway-parallel',
        '创建并行网关'
    ),
    'group-separator': {
        //网关分割线
        group: 'artifact',
        separator: true,
    },
    'create.group': createAction('bpmn:Group', 'artifact', 'bpmn-icon-group', '创建组'),
    // 'create-anything': createAction('bpmn:Anything', 'anything', '', '更多'),
}

function createAction(type, group, className, title, imageUrl) {
    // 还记得 CustomPalette.js 吗？便是这里回调 createListener 函数
    // if (action === 'click') {
    // handler(originalEvent, autoActivate, elementFactory, create)
    // }
    function createListener(event, autoActivate, elementFactory, create) {
        var shape = elementFactory.createShape({ type })

        create.start(event, shape)
    }

    return {
        group: group,
        className: className,
        title: title,
        imageUrl, // 📌
        action: {
            dragstart: createListener,
            click: createListener,
        },
    }
}
