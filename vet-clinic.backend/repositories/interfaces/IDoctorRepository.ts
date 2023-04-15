export default interface IDoctorRepository{
  createDoc(name:string, surName:string, email:string, phone : string) : Promise<any>;
  addDocInfo(id : string, spec : string, image : string) : Promise<any>;
  getById(id : string) : Promise<any>
  changeInfo (id : string, name : string, surName : string, email : string, phone : string, spec : string) : Promise<any>
  changeInfoAndPhoto (id : string, name : string, surName : string, email : string, phone : string, spec : string, image : string) : Promise<any>
  getPathToImage(userId: string): Promise<any>;
  delete(userId: any): Promise<any>;
  getAll() : Promise<any>;
  getAllWithTimes(): Promise<any>;
}