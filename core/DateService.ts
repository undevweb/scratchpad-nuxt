export const DateService = {
    formatToString(time: Date) {
        return this.zeroPrefix(time.getUTCHours(), 2) + ":" +
            this.zeroPrefix(time.getUTCMinutes(), 2) + ":" +
            this.zeroPrefix(time.getUTCSeconds(), 2) + "." +
            this.zeroPrefix(time.getUTCMilliseconds(), 3);
    },
    zeroPrefix(num: number, digit: number) {
        let zero = '';
        for (let i = 0; i < digit; i++) {
            zero += '0';
        }
        return (zero + num).slice(-digit);
    }
};
