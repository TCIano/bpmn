<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import CTable from '../../components/cTable/index.vue'
import { getCategoryList } from '../../api/index'
import { getTreeList } from '../../utils/treeFilter'

//替换节点字段
const replaceFields = { children: 'children', title: 'workflowClassifyName', key: 'key' }

//要定义响应式
let treeData: any = ref(
    [
        // {
        //     workflowClassifyName: 'parent 1',
        //     children: [
        //         {
        //             workflowClassifyName: 'parent 1-0',
        //             children: [
        //                 { workflowClassifyName: 'leaf', },
        //                 { workflowClassifyName: 'leaf', },
        //             ],
        //         },
        //         {
        //             workflowClassifyName: 'parent 1-1',
        //             children: [
        //                 { workflowClassifyName: 'sss', }
        //             ],
        //         },
        //     ],
        // },
        // {
        //     workflowClassifyName: 'parent 1',

        //     children: [
        //         {
        //             workflowClassifyName: 'parent 1-0',
        //             disabled: true,
        //             children: [
        //                 { workflowClassifyName: 'leaf', },
        //                 { workflowClassifyName: 'leaf', },
        //             ],
        //         },
        //         {
        //             workflowClassifyName: 'parent 1-1',
        //             children: [
        //                 { workflowClassifyName: 'sss', }
        //             ],
        //         },
        //     ],
        // },
    ]
);
let treeList
onMounted(async () => {

    const { data } = await getCategoryList({})
    console.log(data);
    //树形处理
    treeList = getTreeList(data)
    console.log(treeList);
    treeData.value.push(treeList)
    // console.log(treeData);
})
console.log(treeData);


</script>

<template>
    <div class='container'>
        <a-row :gutter="16">
            <a-col :span='6'>
                <a-card title='组织机构'>
                    <div>
                        <a-directory-tree :tree-data="treeData" :show-line='true' :show-icon='true'
                            :replaceFields='replaceFields'>
                            <span slot="title0010" style="color: #1890ff">sss</span>
                        </a-directory-tree>
                    </div>
                </a-card>
            </a-col>
            <a-col :span='18'>
                <a-card title='流程类别列表'>
                    <a-button slot='extra' class='add' icon='plus-circle'>新建</a-button>
                    <a-button slot='extra' class='save'>保存</a-button>
                    <CTable />
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<style scoped lang='less'>
.container {
    padding: 20px;

    .ant-btn.add {
        margin-right: 10px;
        background-color: #40abb1;
        color: #fff;
    }

    .ant-btn.save {
        color: #fff;
        background-color: #5a7ff5;
    }
}
</style>