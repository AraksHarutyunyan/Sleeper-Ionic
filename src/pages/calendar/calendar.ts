import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

import { Calendar } from "@ionic-native/calendar";
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
  entriesLogged: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private calendar: Calendar
  ) {
    this.entriesLogged = [
      {
        year: 2018,
        month: 7,
        date: 24
      },
      {
        year: 2018,
        month: 7,
        date: 3
      }
    ];
  }

  onDaySelect(event: any) {
    console.log(event);
  }

  onMonthSelect(event: any) {
    console.log(event);
  }
  openCalendar() {
    console.log(typeof this.calendar === "undefined");
    // this.calendar.openCalendar(new Date()).then(
    //   msg => {
    //     console.log(msg);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CalendarPage");
  }
}
