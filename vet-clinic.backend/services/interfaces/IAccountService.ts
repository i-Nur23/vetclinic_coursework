export default interface IAccountService{
  findAccount(login : string, password : string) : Promise<any>
}