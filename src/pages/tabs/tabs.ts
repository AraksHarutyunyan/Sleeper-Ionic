import { Component } from "@angular/core";

import { AboutPage } from "../about/about";
import { ContactPage } from "../contact/contact";
import { HomePage } from "../home/home";
import { EntryListPage } from "../entry-list/entry-list";
import { CalendarPage } from "../calendar/calendar";
import { StatisticsPage } from "../statistics/statistics";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = StatisticsPage;
  tab2Root = EntryListPage;
  tab3Root = CalendarPage;

  constructor() {}
}
