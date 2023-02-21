export default interface IAccountRepository{
  getByLoginPassword(login: string, password : string) : Promise<any>
}