import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { SleepEntryModel } from "../../models/sleep-entry-model";

/**
 * Generated class for the SleepEntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-sleep-entry",
  templateUrl: "sleep-entry.html"
})
export class SleepEntryPage {
  entry: SleepEntryModel = undefined;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.entry = navParams.get("entry");
    console.log(this.entry);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SleepEntryPage");
  }
}
