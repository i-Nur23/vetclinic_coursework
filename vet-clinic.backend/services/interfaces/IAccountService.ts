export default interface IAccountService{
  findAccount(login : string, password : string) : Promise<any>
  createAccount(login: string, password : string, name: string, surName : string, email : string, role: string) : Promise<any>
}