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
import { IonicStorageModule } from "@ionic/storage";

import { ChartsModule } from "ng2-charts";
import { CalendarModule } from "ionic3-calendar-en";
import { HttpModule, Http } from "@angular/http";
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { SleepEntryPage } from "../pages/sleep-entry/sleep-entry";
import { CalendarPage } from "../pages/calendar/calendar";
import { EntryListPage } from "../pages/entry-list/entry-list";
import { StatisticsPage } from "../pages/statistics/statistics";
import { CreateNewEntryPage } from "../pages/create-new-entry/create-new-entry";

import { EntryCollectionProvider } from "../providers/entry-collection/entry-collection";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CalendarPage,
    EntryListPage,
    SleepEntryPage,
    StatisticsPage,
    CreateNewEntryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    ChartsModule,
    CalendarModule,
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CalendarPage,
    EntryListPage,
    SleepEntryPage,
    StatisticsPage,
    CreateNewEntryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Calendar,
    EntryCollectionProvider
  ]
})
export class AppModule {}
