export class TimeHandler{
  static toTimeString = (time : number | null) => {
    if (time != null){
      var hours = Math.trunc(time);
      var minutes = time.toString().split('.')[1] == '5' ? '30' : '00'
      return `${hours}:${minutes}`
    }
    return null;
  }

  static toTimeNumber = (time : String) => {
    var splittedTime = time.split(':');
    var hours = parseInt(splittedTime[0]);
    var minutes = splittedTime[1] == '00' ? 0 : 5;
    return parseFloat(`${hours}.${minutes}`)
  }

}