import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { CalendarPage } from "./calendar";

import { CalendarModule } from "ionic3-calendar-en";

@NgModule({
  declarations: [CalendarPage],
  imports: [IonicPageModule.forChild(CalendarPage), CalendarModule]
  // providers: [Calendar]
})
export class CalendarPageModule {}
