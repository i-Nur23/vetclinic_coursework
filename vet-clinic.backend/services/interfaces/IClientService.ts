export default interface IClientService{
  getAll() : Promise<any>
  getClient(id : string) : Promise<any>
}