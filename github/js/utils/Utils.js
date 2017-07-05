export default class Utils{
    // 检查是否被收藏过
    static checkFavorite(item, items) {
        items.forEach((res, index) => {
            if(item.id.toString() === res) {
                return true;
            }
            return false;
        });
    }
}
