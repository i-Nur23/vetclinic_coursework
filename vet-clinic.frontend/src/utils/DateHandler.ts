export class DateHandler {
  static dayArray = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  static months = ['Января', 'Февраля', 'Марта', 'Апреля','Мая','Июня','Июля',
    'Августа','Сентября','Октября','Ноября','Декабря']
  static GetFortnight = () => {
    let arrOfDays = new Array(12);
    const init_date = new Date();


    for(let i = 0; i < 14; i++){
      let date = new Date();
      date.setDate(init_date.getDate() + i);
      var dayOfWeek = DateHandler.dayArray[date.getDay()]
      if (dayOfWeek != 'вс'){
        arrOfDays.push({date : date, day : dayOfWeek, month : DateHandler.months[date.getMonth()]});
      }
    }
    return arrOfDays;
  }
}