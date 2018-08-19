import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { Calendar } from "@ionic-native/calendar";
import { EntryCollectionProvider } from "../../providers/entry-collection/entry-collection";
import { SleepEntryPage } from "../sleep-entry/sleep-entry";

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-calendar",
  templateUrl: "calendar.html"
})
export class CalendarPage {
  entriesLogged: Array<Object> = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private entryCollection: EntryCollectionProvider
  ) {
    for (let entry of this.entryCollection.getEntriesByMonth(
      new Date().getMonth(),
      new Date().getFullYear()
    )) {
      this.entriesLogged.push(entry.getDateObject());
    }
  }

  onDaySelect(event: Object) {
    console.log(event);
    if (event["hasEvent"]) this.openEntry(event);
  }

  onMonthSelect(event: Object) {
    console.log(event);

    if (this.entriesLogged.length > 365) {
      // Clear array
      this.entriesLogged.length = 0;
    }

    let entriesByMonth = this.entryCollection.getEntriesByMonth(
      event["month"],
      event["year"]
    );
    for (let entry of entriesByMonth) {
      this.entriesLogged.push(entry.getDateObject());
    }
  }

  openEntry(dateObj: Object) {
    this.navCtrl.push(SleepEntryPage, {
      entry: this.entryCollection.getEntry(
        dateObj["year"],
        dateObj["month"],
        dateObj["date"]
      )
    });
  }

  ionViewDidLoad() {
    for (let entry of this.entryCollection.getEntriesByMonth(
      new Date().getMonth(),
      new Date().getFullYear()
    )) {
      this.entriesLogged.push(entry.getDateObject());
    }

    console.log("ionViewDidLoad CalendarPage");
  }
}
