import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { FormsModule } from "@angular/forms";

import { AboutPage } from "../pages/about/about";
import { ContactPage } from "../pages/contact/contact";
import { HomePage } from "../pages/home/home";
import { TabsPage } from "../pages/tabs/tabs";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Calendar } from "@ionic-native/calendar";
import { SleepEntryPage } from "../pages/sleep-entry/sleep-entry";
import { CalendarPage } from "../pages/calendar/calendar";
import { EntryListPage } from "../pages/entry-list/entry-list";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SleepEntryPage,
    CalendarPage,
    EntryListPage
  ],
  imports: [BrowserModule, IonicModule.forRoot(MyApp), FormsModule],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CalendarPage,
    EntryListPage,
    SleepEntryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Calendar
  ]
})
export class AppModule {}
