import mongoose from "mongoose";

var Schema = mongoose.Schema;

var AccountSchema = new Schema({
  login: String,
  password: String,
  type: {
    type: Schema.Types.String,
    enum:['Клиент','Врач','Регистратор','Менеджер']},
  userId: {type: Schema.Types.ObjectId}
})

export const Account = mongoose.model('Account', AccountSchema)