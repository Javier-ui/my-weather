import { CordModel } from "./cord.model";
import { InfoModel } from "./info.model";

export class CityWeatherModel {
  coord: CordModel;
  weather: InfoModel[];
  main: {
    temp: number;
  }

  constructor() {
    this.coord = new CordModel();
    this.main = { temp: 0 };
    this.weather = [];
  }
}
