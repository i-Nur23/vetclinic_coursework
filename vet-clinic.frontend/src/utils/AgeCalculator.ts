export const AgeCalculator = (dob : Date) => {
  var birthDate = new Date(dob)
  var now = new Date(); //Текущя дата
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Текущя дата без времени
  var dobnow = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()); //ДР в текущем году
  var age; //Возраст

//Возраст = текущий год - год рождения
  age = today.getFullYear() - birthDate.getFullYear();
//Если ДР в этом году ещё предстоит, то вычитаем из age один год
  if (today < dobnow) {
    age = age-1;
  }

  return age
}