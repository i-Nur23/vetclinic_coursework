import {BaseRepository} from "./BaseRepository";
import {Service} from "../models/Service";

export class ServiceRepository extends BaseRepository {
  constructor(db : string) {
    super(db);
  }

  getAllTypes = async () => {
    this.connect();

    var types = await Service
      .find()
      .select('-_id type')
      .exec();

    var types_arr = types.map(x => x.type);

    return types_arr;
  }

  getAll = async () => {
    this.connect();

    var types = await Service
      .find()
      .exec();

    return types;
  }
}