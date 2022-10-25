import inherits from 'inherits'

import PropertiesActivator from 'bpmn-js-properties-panel/lib/PropertiesActivator'

import idProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/IdProps'
import nameProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps'
import processProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/ProcessProps'
import linkProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/LinkProps'
import eventProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/EventProps'
import documentationProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/DocumentationProps'

import TitleProps from './parts/TitleProps'

function createGeneralTabGroups(element, bpmnFactory, canvas, elementRegistry, translate) {
    var generalGroup = {
        id: 'general',
        label: '基础配置',
        entries: [],
    }
    idProps(generalGroup, element, translate)
    nameProps(generalGroup, element, bpmnFactory, canvas, translate)
    processProps(generalGroup, element, translate)

    var detailsGroup = {
        id: 'details',
        label: '详细信息',
        entries: [],
    }
    linkProps(detailsGroup, element, translate)
    eventProps(detailsGroup, element, bpmnFactory, elementRegistry, translate)

    var documentationGroup = {
        id: 'documentation',
        label: '文本',
        entries: [],
    }

    documentationProps(documentationGroup, element, bpmnFactory, translate)

    return [generalGroup, detailsGroup, documentationGroup]
}

function createAuthorityTabGroups(element) {
    var editAuthorityGroup = {
        id: 'edit-authority',
        label: '编辑权限',
        entries: [],
    }

    // 每个属性都有自己的props方法
    TitleProps(editAuthorityGroup, element)
    // OtherProps1(editAuthorityGroup, element)
    // OtherProps2(editAuthorityGroup, element);

    return [editAuthorityGroup]
}

function createDepartmentTabGroups(element, bpmnFactory, canvas, elementRegistry, translate) {
    var editDepartmentGrooup = {
        id: 'edit-department',
        label: '编辑部门',
        entries: [],
    }
    documentationProps(editDepartmentGrooup, element, bpmnFactory, translate)
    return [editDepartmentGrooup]
}
// 这里是要用到什么就引入什么
export default function AuthorityPropertiesProvider(
    eventBus,
    bpmnFactory,
    canvas,
    elementRegistry,
    translate
) {
    PropertiesActivator.call(this, eventBus)

    this.getTabs = function (element) {
        var generalTab = {
            id: 'general',
            label: '基础',
            groups: createGeneralTabGroups(
                element,
                bpmnFactory,
                canvas,
                elementRegistry,
                translate
            ),
        }

        var authorityTab = {
            id: 'authority',
            label: '权限',
            groups: createAuthorityTabGroups(element),
        }

        var departmentTab = {
            id: 'department',
            label: '部门',
            groups: createDepartmentTabGroups(
                element,
                bpmnFactory,
                canvas,
                elementRegistry,
                translate
            ),
        }
        return [generalTab, authorityTab, departmentTab]
    }
}

inherits(AuthorityPropertiesProvider, PropertiesActivator)
