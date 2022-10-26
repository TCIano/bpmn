<script setup lang='ts'>
import { Checkbox } from 'ant-design-vue';
import { ref, reactive, nextTick, toRefs, onBeforeMount, onMounted, watchEffect, computed, watch } from 'vue';
import { getFlatDepartmentList } from '../../api/departmentController'
import { getUserPageList } from '../../api/userController'
const text = 'option'
let activeKey: any = []
let visible = ref(false)
//人员配置按钮
let depList = ref([])
const showDepConfigDialog = async () => {
    handleShowOrHide()
    //获取信息列表
    const { data } = await getFlatDepartmentList()
    depList.value = data
    console.log(depList);
}
//弹框显示与隐藏
const handleShowOrHide = () => {
    // privilegeUserNoList: ["162125066367143936", "164310757490561024", "191137927802130432", "191137876006670336"]
    visible.value = !visible.value


}
let props = defineProps({
    currentEle: {
        type: Object
    },
    bpmnModeler: {
        type: Object
    },
})
console.log(props);

const currentElement = ref()
defineExpose({
    currentElement
})
//监听当前模板
watch(currentElement, (value) => {
    // currentElement.value = value
    console.log(currentElement);
}, {
    immediate: true
})


//表格数据
let data = ref([

])
//获取点击当前部门人员
let currentId = ref('')
const onSelectCurrentPeople = async (selectedKeys, e) => {
    // console.log(selectedKeys, e);

    console.log(selectedKeys);
    currentId.value = selectedKeys[0]
    const { data: { records } } = await getUserPageList({
        departmentNo: selectedKeys[0],
        onlyUserInfo: true,
        page: 1,
        size: 10000
    })
    console.log(records);
    data.value = records
}

//表格表头项
const depColumns = [
    {
        title: '用户名称',
        dataIndex: 'userName'
    }
]
let selectedRowKeysList = ref([

])
//标签关闭事件
const closeTags = async (removedTag) => {
    // console.log(removedTag);
    let tags = ref([])
    tagsList.value = tagsList.value.filter(tag => tag.id !== removedTag.id);
    tags.value = tagsList.value.map(obj => { return obj.id })
    console.log(tags.value);

    selectedRowKeysList.value = tags.value
    rowSelection.value.onChange


}

//存储标签数组
let tagsList = ref([])

const rowSelection = computed(() => {

    return {
        type: 'checkbox',
        selectedRowKeys: selectedRowKeysList.value,

        onChange: (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            //选中多选框时候选中标签
            // console.log(selectedRowKeys);
            selectedRowKeysList.value = (selectedRowKeys)
            tagsList.value = selectedRows

        },
    };
})

// 监听标签
// const itemName = computed(() => {
//     let itemNameList = selectedRowKeysList.value.filter((item) => {
//         tagsList.value.forEach((value) => {
//             return item.id === value
//         })
//     })
//     return itemNameList
// })


</script>

<template>
    <div class='selectPanel'>
        <a-collapse v-model="activeKey">
            <a-collapse-panel key="1" header="人员范围">
                <a-button type='primary' @click='showDepConfigDialog' v-if='true'>人员配置</a-button>
                <div>
                    <span>人员范围：</span>
                    <span>**</span>
                </div>
            </a-collapse-panel>
        </a-collapse>

        <!-- 弹窗 -->
        <a-modal v-model="visible" width='60%' title="人员范围" @ok="handleShowOrHide" cancelText='取消' okText='确定'>
            <div class='content'>
                <!-- 树形结构 -->
                <a-tree show-line @select="onSelectCurrentPeople">
                    <a-icon slot="switcherIcon" type="home" />
                    <!-- <a-icon slot="switcherIcon" type="down" /> -->
                    <a-tree-node :title="item.name" v-for='item in depList' :key='item.no' />
                </a-tree>
                <!-- 列表内容 -->
                <a-table :row-selection="rowSelection" :columns="depColumns" :data-source="data" rowKey='id'
                    :pagination='false'>
                </a-table>

                <!-- 标签内容 -->
                <div class='tags'>
                    <a-tag closable @close="closeTags(item)" v-for='item in tagsList' :key='item.id'>
                        {{ item.userName }}
                    </a-tag>
                </div>

            </div>
        </a-modal>
    </div>
</template>

<style scoped lang='less'>
.ant-collapse {
    width: 250px;
    box-shadow: 3px 0px 0px 3px #ccc;

    .ant-collapse-item {

        /deep/ .ant-collapse-header {
            background-color: #fff !important;
        }
    }
}


.content {
    display: flex;

    // justify-content: space-around;
    .ant-table-wrapper {
        margin-left: 20px;
        // width: 300px;
        flex: 1;
    }



    .tags {
        // width: 200px;
        margin-left: 20px;
        flex: 1;

        .ant-tag {
            margin: 5px;
        }
    }
}
</style>