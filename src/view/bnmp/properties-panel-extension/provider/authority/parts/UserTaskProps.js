import {
    TextFieldEntry,
    isTextFieldEntryEdited,
    SelectEntry,
    CollapsibleEntry,
    isSelectEntryEdited,
    HeaderButton,
} from '@bpmn-io/properties-panel'
// import SelectPanel from '../../../../../../components/SelectPanel/index.vue'

import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil'

import { useService } from 'bpmn-js-properties-panel'
/**
 * 创建新的面板列表组
 * @param {DiagramElement} element
 * @returns Object  返回一个数组，每一项都是以一个当前组里面的属性
 */
export default function (element) {
    return [
        {
            id: 'Select Panel',
            element,
            component: Spell,
            // isEdited: isSelectEntryEdited,
        },
        // {
        //     id: 'Collapsible',
        //     element,
        //     component: Collapsible,
        // },
    ]
}

const btn = HeaderButton({
    class: 'bio-properties-panel-input',
    onClick: () => {
        console.log(111)
    },
})
btn.props.onClick()
function Spell(props) {
    const { element, id } = props
    // console.log(element)
    const modeling = useService('modeling')
    const translate = useService('translate')
    const debounce = useService('debounceInput')
    const processBo = getBusinessObject(element)
    const getValue = () => {
        // console.log(element)
        // const res = element.businessObject.newattr
        //     ? element.businessObject.newattr.spell
        //     : (element.businessObject.newattr = {})
        // const res = element.businessObject.inputProp
        // return res
        return processBo.get('magic:SelectPanel') || ''
    }

    const setValue = value => {
        return modeling.updateProperties(element, {
            'magic:SelectPanel': value,
        })
    }
    const getOptions = () => {
        return [
            { value: '78', disabled: false, label: '按钮' },
            { value: '79', disabled: false, label: '按钮1' },
        ]
    }

    return SelectEntry({
        id: id,
        element: element,
        description: translate('请选择'),
        // label: translate('请选择'),
        getValue: getValue,
        setValue: setValue,
        debounce: debounce,
        getOptions: getOptions,
    })
}

//折叠框
// function Collapsible(props) {
//     const { element, id } = props
//     // console.log(element)
//     const modeling = useService('modeling')
//     const translate = useService('translate')
//     const debounce = useService('debounceInput')
//     const processBo = getBusinessObject(element)

//     return CollapsibleEntry({
//         id: id,
//         element: element,
//         label: translate('折叠框'),
//         open: true,
//         remove: () => {
//             console.log(111)
//         },
//     })
// }
