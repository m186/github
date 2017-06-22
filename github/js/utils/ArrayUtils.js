export default class ArrayUtils{
    /*
    * 数组更新工具
    * 如果原数组存在，则删除原数组中该项，如果不存在则添加
    * arrayUpdate
    */
    static arrayUpdate(array, item) {
        for(let i=0; i<array.length; i++) {
            let temp = array[i];
            if(temp === item) {
                array.splice(i, 1);
                return;
            }
        }
        array.push(item);
    }

    /*
    * 数组克隆工具
    * 将一个数组克隆给另一个数组
    * clone
    */
    static clone(form) {
        if (!form) return [];
        let newArray = [];
        form.forEach((item, index) => {
            newArray[index] = form[index];
        });
        return newArray;
    }

    /*
    * 数组对比工具
    * 判断一个数组是否完全等于另一个数组
    */
    static isEquil(arr1, arr2) {
        let arr = [];
        if (!(arr1 && arr2)) return false;
        if (arr1.length !== arr2.length) return false;
        arr1.forEach((item, index) => {
            if(JSON.stringify(arr1[index]) !== JSON.stringify(arr2[index]))
            {
                arr.push(1);
            }
            else
            {
                arr.push(2);
            }
        });
        if(arr.includes(1))
        {
            return;
        }
        else
        {
            return true;
        }
    }

    /*
    * 清除选中元素工具
    * 将已经选中的元素从数组中删除
    */
    static remove(arr1, arr2) {
        arr1.forEach((item, index) => {
            arr2.forEach((_item, _index) => {
                if(item.name !== _item) return;
                arr1.splice(index, 1);
            });
        });
        return arr1;
    }
}