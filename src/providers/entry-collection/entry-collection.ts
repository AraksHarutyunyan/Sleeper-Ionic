import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SleepEntryModel } from "../../models/sleep-entry-model";
import { getLocaleMonthNames } from "../../../node_modules/@angular/common";

var monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const MAX_RECENT_ENTRIES: number = 93;

@Injectable()
export class EntryCollectionProvider {
  private allEntries: Map<Date, SleepEntryModel> = new Map();

  //The most recent 90-93 entries, or 3months * 30or31 days worth of entries.
  private mostRecentEntries: Array<SleepEntryModel> = [];

  private entriesByMonth: Map<number, Array<SleepEntryModel>> = new Map();
  private entriesByYear: Map<number, Array<SleepEntryModel>> = new Map();

  addEntry(entry: SleepEntryModel) {
    this.allEntries.set(entry.date, entry);
    this.update(entry);
  }

  update(entry: SleepEntryModel) {
    // Check we keep this at a limited amount of entries
    if (this.mostRecentEntries.length > MAX_RECENT_ENTRIES) {
      this.mostRecentEntries.shift();
    }
    this.mostRecentEntries.push(entry);
    // Populate map with month keys and add all relating entires for that month
    let thisMonth: number = entry.date.getMonth();
    if (this.entriesByMonth.has(thisMonth)) {
      this.entriesByMonth.get(thisMonth).push(entry);
    } else {
      this.entriesByMonth.set(thisMonth, []);
    }
    // Populate map with year keys and add all relating entires for that year
    let thisYear: number = entry.date.getFullYear();
    if (this.entriesByYear.has(thisYear)) {
      this.entriesByYear.get(thisYear).push(entry);
    } else {
      this.entriesByYear.set(thisYear, []);
    }
  }

  getMostRecentEntries() {
    this.mostRecentEntries.sort(function(
      a: SleepEntryModel,
      b: SleepEntryModel
    ) {
      return +b.date.getTime() - +a.date.getTime();
    });

    this.mostRecentEntries.reduce(function(acc, item) {
      let key = item.date.getMonth();
      acc[key] = acc[key] || [];
      acc[key].push(item);
      return acc;
    });

    return this.mostRecentEntries[0];
  }

  getMonthNames() {
    return monthNames;
  }

  getMonthsSpanned(entries) {
    let monthsSpanned = Object.keys(entries).filter(key => {
      return !isNaN(Number(key));
    });

    for (let i = 0; i < monthsSpanned.length; i++) {
      monthsSpanned[i] = this.getMonthNames()[monthsSpanned[i]];
    }
    return monthsSpanned;
  }

  getAllMonthsSpanned() {
    return Array.from(this.entriesByMonth.keys());
  }

  getYearsSpanned() {
    return Array.from(this.entriesByMonth.keys());
  }

  getEntriesByMonth(month: number) {
    return this.entriesByMonth.get(month);
  }

  getEntriesByYear(year: number) {
    return this.entriesByYear.get(year);
  }

  renameKeys(obj, newKeys) {
    const keyValues = Object.keys(obj).map(key => {
      const newKey = newKeys[key] || key;
      // console.log(newKey);
      return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
  }

  constructor(public http: HttpClient) {
    console.log("Hello EntryCollectionProvider Provider");
  }
}
