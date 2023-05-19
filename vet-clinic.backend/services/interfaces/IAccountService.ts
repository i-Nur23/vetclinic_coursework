export default interface IAccountService{
  findAccount(login : string, password : string) : Promise<any>
  createAccount(login: string, password : string, name: string, surName : string, email : string, phone : string, role: string) : Promise<any>
  getAllWorkers(): Promise<any>;
  changeWorkerInfo(accId : string, userId : string, login : string,password : string,name : string,surName : string,email : string,
                            phone : string,
                            role : string) :Promise<any>
  deleteAccount(accId: any): Promise<any>;
  genClient(name : string, surname: string, email : string, phone : string): Promise<any>;
}