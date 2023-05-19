export const MonthsCalculator = (dob : Date) => {
  var birthDate = new Date(dob)
  var now = new Date(); //Текущя дата
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Текущя дата без времени
  var dobnow = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()); //ДР в текущем году
  var months;
  months = now.getMonth() - birthDate.getMonth();

  if (months < 0) {
    months = 12 + months;
  }

  return months
}