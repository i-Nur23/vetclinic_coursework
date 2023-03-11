export default interface IDoctorRepository{
  createDoc(name:string, surName:string, email:string, phone : string) : Promise<any>;
  addDocInfo(id : string, spec : string, image : string) : Promise<any>;
}