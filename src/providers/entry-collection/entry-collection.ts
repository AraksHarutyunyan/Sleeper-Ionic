import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SleepEntryModel } from "../../models/sleep-entry-model";

/*
  Generated class for the EntryCollectionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EntryCollectionProvider {
  allEntries: Map<Date, SleepEntryModel> = new Map();

  addEntry(entry: SleepEntryModel) {
    this.allEntries.set(entry.date, entry);
  }
  constructor(public http: HttpClient) {
    console.log("Hello EntryCollectionProvider Provider");
  }
}
