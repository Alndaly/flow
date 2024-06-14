export const getHash = (len?: number) => {
    let length = len || 8;
    const arr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
    const al = arr.length;
    let chars = '';
    while (length--) {
        chars += arr[Math.floor(Math.random() * al)];
    }
    return chars;
}
