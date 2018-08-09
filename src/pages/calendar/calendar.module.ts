import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { CalendarPage } from "./calendar";

import { Calendar } from "@ionic-native/calendar";

@NgModule({
  declarations: [CalendarPage, Calendar],
  imports: [IonicPageModule.forChild(CalendarPage)]
  // providers: [Calendar]
})
export class CalendarPageModule {}
