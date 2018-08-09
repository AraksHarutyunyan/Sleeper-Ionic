import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

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
  date: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.date = "brother";
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad SleepEntryPage");
  }
}
