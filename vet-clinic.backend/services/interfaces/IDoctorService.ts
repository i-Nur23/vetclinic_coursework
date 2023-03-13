export default interface IDoctorService {
  addDocInfo(id : string, spec : string, image : string) : Promise<any>
  changeDocInfo(accId : string, userId : string, login : string, password : string, name : string, surName : string,
                         email : string, phone  :string, spec : string) : Promise<any>
  changeDocInfoAndPhoto(accId : string, userId : string, login : string, password : string, name : string, surName : string,
                         email : string, phone  :string, spec : string, image : string) : Promise<any>
}