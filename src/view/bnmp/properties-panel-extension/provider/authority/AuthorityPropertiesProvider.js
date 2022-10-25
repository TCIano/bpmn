// Import your custom property entries.
// The entry is a text input field with logic attached to create,
// update and delete the "spell" property.
import spellProps from './parts/TitleProps'
// 导入菜单属性栏
import menuProps from './parts/MenuProps'
import selectPanel from './parts/UserTaskProps'
import Collapsible from './parts/UserTaskProps'
import { is } from 'bpmn-js/lib/util/ModelUtil'

const LOW_PRIORITY = 500

/**
 * A provider with a `#getGroups(element)` method
 * that exposes groups for a diagram element.
 *
 * @param {PropertiesPanel} propertiesPanel
 * @param {Function} translate
 */
export default function MagicPropertiesProvider(propertiesPanel, translate) {
    // API ////////

    /**
     * Return the groups provided for the given element.
     *
     * @param {DiagramElement} element
     *
     * @return {(Object[]) => (Object[])} groups middleware
     */
    this.getGroups = function (element) {
        /**
         * We return a middleware that modifies
         * the existing groups.
         *
         * @param {Object[]} groups
         *
         * @return {Object[]} modified groups
         */
        return function (groups) {
            // Add the "magic" group
            // 规定给添加自定义属性的 元素
            if (is(element, 'bpmn:Task')) {
                groups.push(createMagicGroup(element, translate))
            }
            //给开始事件添加自定义属性
            if (is(element, 'bpmn:StartEvent')) {
                groups.push(createMenuGroup(element, translate))
            }
            if (is(element, 'bpmn:UserTask')) {
                groups.push(createSelectPanelGroup(element, translate))
                // groups.push(createCollapsibleGroup(element, translate))
            }

            return groups
        }
    }

    // registration ////////

    // Register our custom magic properties provider.
    // Use a lower priority to ensure it is loaded after
    // the basic BPMN properties.
    propertiesPanel.registerProvider(LOW_PRIORITY, this)
}

MagicPropertiesProvider.$inject = ['propertiesPanel', 'translate']

// 创建其他属性方法
function createMagicGroup(element, translate) {
    // 属性列表
    const magicGroup = {
        id: 'magic',
        label: translate('其他属性'),
        entries: spellProps(element),
    }

    return magicGroup
}

// 创建表单属性列表
function createMenuGroup(element, translate) {
    // 属性列表

    const menuGroup = {
        id: 'magic',
        label: translate('表单'),
        entries: menuProps(element),
    }

    return menuGroup
}

// 创建表单属性列表
function createSelectPanelGroup(element, translate) {
    // 属性列表

    const selectPanelGroup = {
        id: 'magic',
        label: translate('选择框'),
        entries: selectPanel(element),
    }

    return selectPanelGroup
}

//创建折叠版
function createCollapsibleGroup(element, translate) {
    // 属性列表

    const CollapsibleGroup = {
        id: 'magic',
        label: translate('折叠狂'),
        entries: Collapsible(element),
    }

    return CollapsibleGroup
}
