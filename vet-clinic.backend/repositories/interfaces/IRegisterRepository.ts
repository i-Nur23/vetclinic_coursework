export default interface IRegisterRepository{
  createRegister(name:string, surName:string, email:string, phone : string) : Promise<any>;
}