import { TextFieldEntry, isTextFieldEntryEdited } from '@bpmn-io/properties-panel'
import { useService } from 'bpmn-js-properties-panel'
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil'
/**
 * 创建新的面板列表组
 * @param {DiagramElement} element
 * @returns Object  返回一个数组，每一项都是以一个当前组里面的属性
 */
export default function (element) {
    return [
        {
            id: 'input Prop',
            element,
            component: Spell,
            isEdited: isTextFieldEntryEdited,
        },
        {
            id: 'input Value',
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
    const processBo = getBusinessObject(element)
    // console.log(processBo)
    // console.log(processBo.get('magic:spell'))
    const getValue = () => {
        // console.log(element)
        // const res = element.businessObject.newattr
        //     ? element.businessObject.newattr.spell
        //     : (element.businessObject.newattr = {})
        // const res = element.businessObject.inputProp?.prop
        // return res || ''
        return processBo.get('inputProp') || ''
    }

    const setValue = value => {
        modeling.updateProperties(element, {
            inputProp: value,
        })
    }

    return TextFieldEntry({
        id: id,
        element: element,
        // description: translate('添加属性名'),
        label: translate('表单名'),
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
    const processBo = getBusinessObject(element)

    const getValue = () => {
        // get和set中获取和设置的值必须和创建面板方法中定义的id相同
        // return element.businessObject.inputProp?.propValue || ''
        return processBo.get('inputValue') || ''
    }

    const setValue = value => {
        modeling.updateProperties(element, {
            inputValue: value,
        })
    }

    return TextFieldEntry({
        id: id,
        element: element,
        // description: translate('添加属性值'),
        label: translate('表单值'),
        getValue: getValue,
        setValue: setValue,
        debounce: debounce,
    })
}
