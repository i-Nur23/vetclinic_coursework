export default interface IClientRepository{
  getAll() : Promise<any>
  createClient(name:string, surName:string, email:string) : Promise<any>
  getById(id : string) : Promise<any>
  changeInfo (userId : string, name: string, surName: string, email: string): Promise<boolean>;
  getPets(id: any): Promise<any>;
}