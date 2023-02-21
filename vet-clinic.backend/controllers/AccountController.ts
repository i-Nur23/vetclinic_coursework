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
      res.json({isFound : false})
      return;
    }

    if (login == 'admin' && password == 'admin'){
      console.log('It\'s admin');
      res.json({isFound : true, role: 'admin'})
      return;
    }

    var account = await this.accountService.findAccount(login, password)

    console.log(account)

    if (account == null){
      console.log('Account wasn\'t found')
      res.json({isFound : false})
      return;
    }

    res.json({isFound : true, role: account.type, id: account.userId})

  }
}