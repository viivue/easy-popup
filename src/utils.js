/**
 * String to slug
 * https://stackoverflow.com/a/1054862/10636614
 * https://www.tunglt.com/2018/11/bo-dau-tieng-viet-javascript-es6/
 * @param string
 * @returns {string}
 */
export function stringToSlug(string){
    return string
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D')
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
}
