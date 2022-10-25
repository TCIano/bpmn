import {
    TextFieldEntry,
    isTextFieldEntryEdited,
    isSelectEntryEdited,
} from '@bpmn-io/properties-panel'
import { useService } from 'bpmn-js-properties-panel'

/**
 * 创建新的面板列表组
 * @param {DiagramElement} element
 * @returns Object  返回一个数组，每一项都是以一个当前组里面的属性
 */
export default function (element) {
    return [
        {
            id: 'spell',
            element,
            component: Spell,
            isEdited: isTextFieldEntryEdited,
        },
        {
            id: 'value',
            element,
            component: SpellValue, //方法名
            isEdited: isTextFieldEntryEdited,
        },
    ]
}

function Spell(props) {
    const { element, id } = props
    // console.log(element)
    const modeling = useService('modeling')
    const translate = useService('translate')
    const debounce = useService('debounceInput')
    const getValue = () => {
        // console.log(element)
        // const res = element.businessObject.newattr
        //     ? element.businessObject.newattr.spell
        //     : (element.businessObject.newattr = {})
        const res = element.businessObject.spell
        return res
    }

    const setValue = value => {
        return modeling.updateProperties(element, {
            spell: value,
        })
    }

    return TextFieldEntry({
        id: id,
        element: element,
        description: translate('添加属性名'),
        label: translate('属性名'),
        getValue: getValue,
        setValue: setValue,
        debounce: debounce,
    })
}

function SpellValue(props) {
    const { element, id } = props

    const modeling = useService('modeling')
    const translate = useService('translate')
    const debounce = useService('debounceInput')

    const getValue = () => {
        // get和set中获取和设置的值必须和创建面板方法中定义的id相同
        return element.businessObject.value || ''
    }

    const setValue = value => {
        return modeling.updateProperties(element, {
            value,
        })
    }

    return TextFieldEntry({
        id: id,
        element: element,
        description: translate('添加属性值'),
        label: translate('属性值'),
        getValue: getValue,
        setValue: setValue,
        debounce: debounce,
    })
}
