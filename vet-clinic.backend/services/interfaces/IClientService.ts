export default interface IClientService{
  getAll() : Promise<any>
  getClient(id : string) : Promise<any>
  changeInfo(id : string,login: string, name: string, surName: string, email: string): Promise<any>
  getPets(id: any): Promise<any>;
}