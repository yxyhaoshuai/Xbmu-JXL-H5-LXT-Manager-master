
export function getFormatTimeFromDate(dateStr) {
    function parseSingleNum(num) {
        return num < 10 ? "0" + num : num;
    }
    let date = new Date(dateStr);
    let year = date.getFullYear();
    let month = parseSingleNum(date.getMonth() + 1);
    let day = parseSingleNum(date.getDate());

    let hour = parseSingleNum(date.getHours());
    let min = parseSingleNum(date.getMinutes());
    let sec = parseSingleNum(date.getSeconds());

    //
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}

export function getCurrentFormatTime() {
    function parseSingleNum(num) {
        return num < 10 ? "0" + num : num;
    }
    let date = new Date();
    let year = date.getFullYear();
    let month = parseSingleNum(date.getMonth() + 1);
    let day = parseSingleNum(date.getDate());

    let hour = parseSingleNum(date.getHours());
    let min = parseSingleNum(date.getMinutes());
    let sec = parseSingleNum(date.getSeconds());

    //
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}
