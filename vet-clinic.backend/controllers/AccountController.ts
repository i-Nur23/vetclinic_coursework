import IAccountService from "../services/interfaces/IAccountService";

export class AccountController{
  accountService : IAccountService

  constructor(accountService : IAccountService) {
    this.accountService = accountService
  }

  find = async (req : any, res : any) => {
    var login = req.query.login;
    var password = req.query.password;
    if (login == '' || password == ''){
      res.json({isFound : false, data: null})
      return;
    }

    if (login == 'admin' && password == 'admin'){
      console.log('It\'s admin');
      res.json({isFound : true, data: {role: 'admin', id:'0'} })
      return;
    }

    var account = await this.accountService.findAccount(login, password)

    if (account == null){
      console.log('Account wasn\'t found')
      res.json({isFound : false})
      return;
    }
    res.json({isFound : true, data: { role: account.type, id: account.id} })
  }

  create = (req: any, res:any) => {
    console.log('Here')

    var login = req.query.login;
    var password = req.query.password;
    var name = req.query.name;
    var surName = req.query.surName;
    var email = req.query.email;
    var phone = req.query.phone;
    var role = req.query.role;

    if (login == 'admin'){
      res.json({ok: false, message: 'Вы не можете создать аккаунт с таким логином'});
      return;
    }

    var result = this.accountService.createAccount(login,password,name,surName,email,phone,role)

    result.then(json => res.json(json))
  }

  getWorkers = async (req: any, res: any) => {
    var answer = this.accountService.getAllWorkers();

    answer.then(answer => res.json(answer))

  }

  changeWorkersInfo = async (req: any, res: any) => {
    var accId = req.params.id;
    var userId = req.body.userId;
    var login = req.body.login;
    var password = req.body.password;
    var name = req.body.name;
    var surName = req.body.surName;
    var email = req.body.email;
    var phone = req.body.phone;
    var role = req.body.role;

    console.log(req.body)

    var response = await this.accountService.changeWorkerInfo(accId, userId, login, password, name, surName, email, phone, role)

    res.json(response)
  }

  deleteWorker = async (req : any, res  : any) => {

    var accId = req.params.id;

    await this.accountService.deleteAccount(accId);

    res.json({ok : true})
  }

  genClient = async (req: any, res: any) => {
    await this.accountService.genClient(
      req.body.name,
      req.body.surname,
      req.body.email,
      req.body.phone
    );

    res.json({ok : true})

  }
}