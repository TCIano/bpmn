<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
const columns: Array<object> = [
    { title: 'Full Name', width: 100, dataIndex: 'name', fixed: 'left' },
    { title: 'Column 1', dataIndex: 'address', },
    {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        dataIndex: 'options',
        width: 100,
        scopedSlots: { customRender: '删除' },
    },
]
const data: any = [];

//流程分类列表


</script>

<template>
    <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 300 }">
        <a slot="action" slot-scope="text">action</a>
    </a-table>
</template>

<style scoped lang='less'>

</style>