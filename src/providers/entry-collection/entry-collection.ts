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
  //Map Date.getTime() (exact match) to Model
  private allEntries: Map<Number, SleepEntryModel> = new Map();

  private entriesByMonth: Map<Number, Array<SleepEntryModel>> = new Map();
  private entriesByYear: Map<Number, Array<SleepEntryModel>> = new Map();

  //The most recent 90-93 entries, or 3months * 30or31 days worth of entries.
  private mostRecentEntries: Array<SleepEntryModel> = [];

  addEntry(entry: SleepEntryModel) {
    this.allEntries.set(entry.getDate().getTime(), entry);
    this.update(entry);
  }

  getEntry(year: number, month: number, date: number) {
    return this.allEntries.get(new Date(year, month, date).getTime()) || {};
  }

  getMostRecentEntries() {
    this.mostRecentEntries.sort(function(
      a: SleepEntryModel,
      b: SleepEntryModel
    ) {
      return +b.getDate().getTime() - +a.getDate().getTime();
    });

    this.mostRecentEntries.reduce(function(acc, item) {
      let key = item.getDate().getMonth();
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

  getEntriesByMonth(month: number, year: number) {
    return this.entriesByMonth.get(new Date(year, month).getTime()) || [];
  }

  getEntriesByYear(year: number) {
    return this.entriesByYear.get(new Date(year).getTime()) || [];
  }

  update(entry: SleepEntryModel) {
    // Check we keep this at a limited amount of entries
    if (this.mostRecentEntries.length > MAX_RECENT_ENTRIES) {
      this.mostRecentEntries.shift();
    }
    this.mostRecentEntries.push(entry);

    let date: Date = entry.getDate();

    // Populate map with month keys and add all relating entires for that month
    let thisMonth: number = new Date(
      date.getFullYear(),
      date.getMonth()
    ).getTime();
    if (this.entriesByMonth.has(thisMonth)) {
      this.entriesByMonth.get(thisMonth).push(entry);
    } else {
      this.entriesByMonth.set(thisMonth, []);
    }
    // Populate map with year keys and add all relating entires for that year
    let thisYear: number = new Date(date.getFullYear()).getTime();
    if (this.entriesByYear.has(thisYear)) {
      this.entriesByYear.get(thisYear).push(entry);
    } else {
      this.entriesByYear.set(thisYear, []);
    }
  }

  renameKeys(obj, newKeys) {
    const keyValues = Object.keys(obj).map(key => {
      const newKey = newKeys[key] || key;
      return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
  }

  constructor(public http: HttpClient) {
    console.log("Hello EntryCollectionProvider Provider");
  }
}
