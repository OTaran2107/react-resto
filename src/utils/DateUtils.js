const DateUtils = {

    unixtime() {
      return Math.floor(new Date().getTime() / 1000);
    },
  
    addZero(num) {
      return (num < 10) ? `0${num}` : num;
    },
  
    toDateObject(dateStr) {
      const date = new Date(dateStr);
      return {
        month: date.getMonth(),
        year: date.getFullYear(),
        day: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds()
      };
    },
  
    toDateFormat(dateStr, format) {
      if (!dateStr) return '-';
      const date = this.toDateObject(dateStr);
      switch (format) {
        case 'DD.MM.YYYY':
          return `${this.addZero(date.day)}.${this.addZero(date.month + 1)}.${date.year}`;
        case 'DD.MM.YY':
          return `${this.addZero(date.day)}.${this.addZero(date.month + 1)}.${String(date.year).slice(-2)}`;
        case 'HH:mm:ss':
          return `${date.h}:${this.addZero(date.m)}: ${this.addZero(date.s)}`;
        case 'HH:mm':
          return `${date.h}:${this.addZero(date.m)}`;
        case 'YYYY/MM/DD HH:mm:ss':
          return `${date.year}/${this.addZero(date.month + 1)}/${this.addZero(date.day)} ${date.h}:${this.addZero(date.m)}:${this.addZero(date.s)}`;
        default:
          return dateStr;
      }
    }
  };
  
  export default DateUtils;
  