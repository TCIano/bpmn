export function getTreeList(data: any) {
    // const arr: any = [] //存储树形内容
    // const arr1: any = []

    // treeList.forEach((item: any) => {
    //     if (item.id == null && item.workflowClassifyName) {
    //         treeList.forEach((ele: any) => {
    //             if (item.workflowClassifyName === ele.parentWorkflowClassifyName) {
    //                 // console.log(ele)
    //                 arr.push(ele)
    //                 // console.log(item)
    //             }
    //         })
    //         item.children = arr
    //     }
    //     if (item.id !== null) {
    //         console.log(item)

    //         treeList.forEach((ele: any) => {
    //             // console.log(111)
    //             if (item.id === ele.parentWorkflowClassifyId) {
    //                 // console.log(item.id)
    //                 // newarr.push(ele)
    //                 arr1.push(ele)
    //                 console.log(arr1)

    //                 // item.children = arr1
    //             }
    //         })
    //     }
    //     // console.log(item)
    // })
    // return treeList
    // const secondList = data.filter((item) => {
    //   return item.id;
    // });
    // const newSecondList = tree(secondList);
    // console.log(newSecondList);
    // return secondList;
    //先取出最外层节点
    let treeListArr = []
    let firstNodeArr: any = []
    data.forEach((element: any) => {
        if (!element.id) {
            let firstNode = data.filter((item: any) => {
                return element.workflowClassifyName === item.parentWorkflowClassifyName
            })

            firstNode.forEach((val: any) => {
                console.log(val)
                firstNodeArr.push(val)
            })
            element.children = firstNodeArr
        }
        if (element.id && !element.parentWorkflowClassifyName) {
            console.log(element)
            firstNodeArr.push(element)
        }
    })
    console.log(data)

    //取内层节点
    treeListArr = data[data.length - 1]
    // treeList(treeListArr.children);
    dep(treeListArr.children)
    function dep(treeListArrChildren: any) {
        let itemList: any = []
        treeListArrChildren.forEach((value: any) => {
            const item = data.filter((item: any) => item.parentWorkflowClassifyId === value.id)
            // console.log(item)
            const list = dep(item)
            if (list.length) {
                value.children = item
            }
            itemList.push(item)
        })
        return itemList
    }
    return treeListArr
}
