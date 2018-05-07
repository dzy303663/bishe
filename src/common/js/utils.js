// 获取随机整数
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
// 输入延迟
export function debounce(func, delay) {
    let timer;
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
    }
    timer = setTimeout(function () {
        func.apply(this, args);
    }, delay);
}
//时间格式化
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}