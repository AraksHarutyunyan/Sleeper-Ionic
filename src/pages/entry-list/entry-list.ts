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
  // template: `<div *ngFor="let month of entriesByMonth(sleepentries)"></div>`
})
export class EntryListPage {
  monthsSpanned: Array<string> = [];
  public sleepentries: Object = new Object();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public entryCollection: EntryCollectionProvider
  ) {
    let sample_entries = [
      // new SleepEntryModel(new Date(2018, 7, 7)),
      // new SleepEntryModel(new Date(2018, 7, 8)),
      // new SleepEntryModel(new Date(2018, 7, 9)),
      // new SleepEntryModel(new Date(2018, 7, 10)),
      // new SleepEntryModel(new Date(2018, 7, 11)),
      // new SleepEntryModel(new Date(2018, 7, 7)),
      // new SleepEntryModel(new Date(2018, 8, 8)),
      // new SleepEntryModel(new Date(2018, 8, 9)),
      // new SleepEntryModel(new Date(2018, 11, 10)),
      // new SleepEntryModel(new Date(2018, 11, 11)),
      // new SleepEntryModel(new Date(2019, 1, 14)),
      // new SleepEntryModel(new Date(2019, 6, 6)),
      // new SleepEntryModel(new Date(2019, 7, 7))
    ];

    // for (let entry of sample_entries) {
    //   this.entryCollection.addEntry(entry);
    // }
    this.collectEntriesToShow();
  }

  collectEntriesToShow() {
    // if (!this.entryCollection.hasChanged(Object.keys(this.sleepentries).length))
    //   return;
    // if (Object.keys(this.sleepentries).length !== 0) return;
    // get back Object of misc entry collection data.
    this.sleepentries = this.entryCollection.getMostRecentEntries();

    // get back the months that our entries span
    let monthObj = this.entryCollection.getMonthsSpanned(this.sleepentries);
    this.monthsSpanned = monthObj["Month"];

    // rename monthindex-as-string keys in our object into month names
    if (Object.keys(this.sleepentries).length === 1) {
      this.sleepentries[this.monthsSpanned[0]] = [this.sleepentries["0"]];
      delete this.sleepentries["0"]; // delete the original '0' key that remains ONLY for single entries
    } else {
      // Create copy of sleepentries
      let seCopy = {};
      for (let key in Object.keys(this.sleepentries)) {
        seCopy[key] = JSON.parse(JSON.stringify(this.sleepentries[key]));
      }

      // Update sleep entries to replace monthIndex(number) keys with the month names
      this.sleepentries = this.entryCollection.renameKeys(
        seCopy,
        this.entryCollection.getMonthNames()
      );
    }
    console.log(this.sleepentries);

    for (let month of this.monthsSpanned) {
      console.log(this.sleepentries[month]);
    }
  }

  openEntry(month: string, index: number) {
    this.navCtrl.push(SleepEntryPage, {
      entry: this.sleepentries[month][index]
    });
  }

  printthis(event) {
    console.log(event);
  }

  createNewEntry() {
    this.navCtrl.push(CreateNewEntryPage);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad EntryListPage");
  }

  ionViewWillEnter() {
    this.collectEntriesToShow();
  }
}
