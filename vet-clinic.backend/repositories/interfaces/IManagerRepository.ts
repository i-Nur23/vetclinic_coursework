export default interface IManagerRepository {
  createManager (name:string, surName:string, email:string, phone : string) : Promise<any>
  getById (id : string) : Promise<any>;
}