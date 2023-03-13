export default interface IRegisterRepository{
  createRegister(name:string, surName:string, email:string, phone : string) : Promise<any>;
  getById (id : string) : Promise<any>;
  changeInfo (id : string, name : string, surName : string, email : string, phone : string) : Promise<any>
  delete(userId: any): Promise<any>;
}