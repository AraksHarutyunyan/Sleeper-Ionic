import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { SleepEntryPage } from "../sleep-entry/sleep-entry";
import { SleepEntryModel } from "../../models/sleep-entry-model";
import { EntryCollectionProvider } from "../../providers/entry-collection/entry-collection";
import { CreateNewEntryPage } from "../create-new-entry/create-new-entry";

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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public entryCollection: EntryCollectionProvider
  ) {
    this.sleepentries = [
      new SleepEntryModel(new Date(2018, 7, 7)),
      new SleepEntryModel(new Date(2018, 7, 8)),
      new SleepEntryModel(new Date(2018, 7, 9)),
      new SleepEntryModel(new Date(2018, 7, 10)),
      new SleepEntryModel(new Date(2018, 7, 11))
    ];
    for (let entry of this.sleepentries) {
      this.entryCollection.addEntry(entry);
    }
    this.sleepentries = Array.from(this.entryCollection.allEntries.values());
  }

  openEntry(index: number) {
    this.navCtrl.push(SleepEntryPage, { entry: this.sleepentries[index] });
  }

  createNewEntry() {
    this.navCtrl.push(CreateNewEntryPage);
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad EntryListPage");
  }
}
