import nodemailer from "nodemailer"
export class EmailService {


  private transporter : nodemailer.Transporter | null = null;
  constructor () {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'kody14@ethereal.email',
        pass: 'BbgCE1cZBBaj7Byvga'
      }
    });
  }

  private createTransporter = async () => {
  }

  public createEmailForGeneratedClient = async (login : string, password  : string, email : string) => {
    if (this.transporter !== null) {
      var resukt = await this.transporter.sendMail({
        from: '"Ветеринарная клиника Питомец" <kody14@ethereal.email>',
        to: email,
        subject: 'Новый аккаунт',
        text: `Логин: ${login}\nПароль: ${password}`
      });

      console.log(resukt)
    }
  }
}