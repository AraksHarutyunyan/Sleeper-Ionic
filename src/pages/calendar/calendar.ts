import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { Calendar } from "@ionic-native/calendar";
import { EntryCollectionProvider } from "../../providers/entry-collection/entry-collection";
import { SleepEntryPage } from "../sleep-entry/sleep-entry";
import { SleepEntryModel } from "../../models/sleep-entry-model";

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

  monthNum: number = new Date().getMonth();
  yearNum: number = new Date().getFullYear();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private entryCollection: EntryCollectionProvider
  ) {
    // for (let entry of this.entryCollection.getEntriesByMonth(
    //   new Date().getMonth(),
    //   new Date().getFullYear()
    // )) {
    //   this.entriesLogged.push(entry.getDateObject());
    // }
  }

  onDaySelect(event: Object) {
    console.log(event);
    if (event["hasEvent"]) this.openEntry(event);
  }

  onMonthSelect(event: Object) {
    console.log(event);
    this.monthNum = event["month"];
    this.yearNum = event["year"];

    if (this.entriesLogged.length > 365) {
      // Clear array
      this.entriesLogged.length = 0;
    }

    let entriesByMonth: SleepEntryModel[] = this.entryCollection.getEntriesByMonth(
      event["month"],
      event["year"]
    );
    for (let entry of entriesByMonth) {
      console.log(entry);
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
      console.log(entry);
      this.entriesLogged.push(entry);
    }

    console.log("ionViewDidLoad CalendarPage");
  }

  ionViewDidEnter() {
    let entries = this.entryCollection.getEntriesByMonth(
      this.monthNum,
      this.yearNum
    );
    for (let event of this.entriesLogged) {
      for (let entry of entries) {
        if (event.getDate().getTime() === entry.getDate().getTime()) {
          break;
        }
        this.entriesLogged.push(entry);
      }
    }
    console.log(this.entriesLogged);
    //   let entriesByMonth: SleepEntryModel[] = this.entryCollection.getEntriesByMonth(
    //     event["month"],
    //     event["year"]
    //   );
    //   for (let entry of entriesByMonth) {
    //     this.entriesLogged.push(entry.getDateObject());
    //   }
    // }
  }

  clearDatabase() {
    this.entryCollection.clearDatabase();
  }
}
