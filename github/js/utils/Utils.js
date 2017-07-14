export default class Utils{
    // 检查是否被收藏过
    static checkFavorite(item, items) {
        let arr = [];
        if (!items) return;
        items.forEach((res, index) => {
            let result = item.id ? item.id.toString() : item.url;
            if(result === res) {
                arr.push(1);
            }
            arr.push(0);
        });
        if(arr.indexOf(1) !== -1) {
            return true;
        }
        else {
            return false;
        }
    }
}
