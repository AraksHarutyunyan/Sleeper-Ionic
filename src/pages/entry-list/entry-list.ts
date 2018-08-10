import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { SleepEntryPage } from "../sleep-entry/sleep-entry";
import { SleepEntryModel } from "../../models/sleep-entry-model";

/**
 * Generated class for the EntryListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-entry-list",
  templateUrl: "entry-list.html"
})
export class EntryListPage {
  public sleepentries: Array<SleepEntryModel> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sleepentries = [
      new SleepEntryModel("42/42/42"),
      new SleepEntryModel("forever and a day"),
      new SleepEntryModel("yesterday :D"),
      new SleepEntryModel("😂😂🤣👌🙌😆🐱‍👓🐱‍🐉😆"),
      new SleepEntryModel(
        "main(int c,char**v){return!m(v[1],v[2]);}m(char*s,char*t){return*t-42?*s?63==*t|*s==*t&&m(s+1,t+1):!*t:m(s,t+1)||*s&&m(s+1,t);}"
      )
    ];
    console.log(this.sleepentries);
  }

  openEntry(index: number) {
    this.navCtrl.push(SleepEntryPage, { entry: this.sleepentries[index] });
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad EntryListPage");
  }
}
