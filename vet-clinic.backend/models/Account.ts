import mongoose from "mongoose";

var Schema = mongoose.Schema;

var AccountSchema = new Schema({
  login: String,
  password: String,
  type: {
    type: Schema.Types.String,
    enum:['client','doctor','applicant']},
  userId: {type: Schema.Types.ObjectId}
})

export interface IAccount{
  login: string,
  password: string,
  type: string,
  userId: string
}

export const Account = mongoose.model('Account', AccountSchema)