import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { SleepEntryPage } from "../sleep-entry/sleep-entry";

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
  public sleepentries: Array<string> = [
    "what",
    "am",
    "I",
    "even",
    "doing",
    "anymore"
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sleepentries = ["what", "am", "I", "even", "doing", "anymore"];
    console.log(this.sleepentries);
  }

  openEntry(index: number) {
    console.log(this.sleepentries[index]);
    // this.navCtrl.push(this.sleepentries[index]); //{name: this.inputval}
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad EntryListPage");
  }
}
