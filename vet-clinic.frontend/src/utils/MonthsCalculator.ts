export const MonthsCalculator = (dob : Date) => {
  var birthDate = new Date(dob)
  var now = new Date(); //Текущя дата
  var months;
  months = now.getMonth() - birthDate.getMonth();
  if (months < 0) {
    months = 12 + months;
  }
  return months
}