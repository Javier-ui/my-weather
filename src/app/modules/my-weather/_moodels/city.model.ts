import { CordModel } from "./cord.model";

export class CityModel {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: CordModel;

  constructor() {
    this.id = 0;
    this.name = '';
    this.state = '';
    this.country = '';
    this.coord = new CordModel();
  }
}
