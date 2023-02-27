export default interface IAccountRepository{
  getByLoginPassword(login: string, password : string) : Promise<any>
  isLoginExists(login : string) : Promise<boolean>
  createAccount(login : string, password : string, type : string, userId: string) : Promise<any>
  getById(id: string): Promise<any>;
}