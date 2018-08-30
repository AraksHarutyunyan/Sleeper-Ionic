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
    this.collectEntriesToShow();
  }

  collectEntriesToShow() {
    // get back Object of misc entry collection data.
    this.sleepentries = this.entryCollection.getMostRecentEntries();

    // get back the months that our entries span
    let monthObj = this.entryCollection.getMonthsSpanned(this.sleepentries);
    this.monthsSpanned = monthObj["Month"];

    // Cleanup this returned object for future cleaner indexing
    if (
      Object.keys(this.sleepentries).length === 1 &&
      this.sleepentries[Object.keys(this.sleepentries)[0]].length < 2
    ) {
      this.sleepentries[this.monthsSpanned[0]] = [this.sleepentries["0"]];
      delete this.sleepentries["0"]; // delete the original '0' key that remains ONLY for single entries

      // If more than one entry was found
    } else {
      // Create copy of sleepentries
      let seCopy = {};

      // For each month in this sleepentries
      for (let month in this.sleepentries) {
        // If the month exists and/or is defined
        if (this.sleepentries.hasOwnProperty(month) && month !== undefined) {
          let monthEntries = this.sleepentries[month];

          // Iterates over the SleepModels (for each loop)
          for (let entry of monthEntries) {
            // Make sure this month is mapped to an array
            seCopy[month] = seCopy[month] || [];

            // Recreate this Model
            seCopy[month].push(entry.deepCopy());
          }
        }
      }

      // Update sleep entries to replace monthIndex(number) keys with the month names
      this.sleepentries = this.entryCollection.renameKeys(
        seCopy,
        this.entryCollection.getMonthNames()
      );
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
