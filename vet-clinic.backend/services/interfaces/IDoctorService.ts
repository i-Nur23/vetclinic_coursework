export default interface IDoctorService {
  addDocInfo(id : string, spec : string, image : string) : Promise<any>
}