import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SleepEntryModel } from "../../models/sleep-entry-model";
import { getLocaleMonthNames } from "../../../node_modules/@angular/common";
import { Storage } from "@ionic/storage";
import { dateDataSortValue } from "../../../node_modules/ionic-angular/umd/util/datetime-util";

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
const OBJS = "WOW";
const ALL_STORAGE_KEY = "ALL_FIELDS";
const FULL_STORAGE_KEY = "ALL_ENTRIES";
const MONTH_STORAGE_KEY = "BY_MONTH";
const YEAR_STORAGE_KEY = "BY_YEAR";
const RECENT_STORAGE_KEY = "BY RECENT";

@Injectable()
export class EntryCollectionProvider {
  //Map Date.getTime() (exact match) to Model
  private allEntries: Map<Number, SleepEntryModel> = new Map();

  private entriesByMonth: Map<Number, Array<SleepEntryModel>> = new Map();
  private entriesByYear: Map<Number, Array<SleepEntryModel>> = new Map();

  //The most recent 90-93 entries, or 3months * 30or31 days worth of entries.
  private mostRecentEntries: Array<SleepEntryModel> = [];

  addEntry(entry: SleepEntryModel) {
    let date = entry.getDate();
    if (
      !this.entryExists(date.getFullYear(), date.getMonth(), date.getDate())
    ) {
      this.allEntries.set(entry.getDate().getTime(), entry);
      this.update(entry);
    }
  }

  hasChanged(len: number) {
    return len != this.mostRecentEntries.length;
  }
  entryExists(year: number, month: number, date: number) {
    return (
      typeof this.allEntries.get(new Date(year, month, date).getTime()) !==
      "undefined"
    );
  }
  getEntry(year: number, month: number, date: number) {
    return this.allEntries.get(new Date(year, month, date).getTime()) || {};
  }

  getMostRecentEntries() {
    if (this.mostRecentEntries.length == 0) {
      return [];
    }

    let copyofMostRecent = [];
    for (let entry of this.mostRecentEntries) {
      copyofMostRecent.push(entry.deepCopy());
    }

    // If only one entry to give
    if (this.mostRecentEntries.length == 1) {
      return copyofMostRecent; //LOL huge bug because i was passing references screw js
    }

    copyofMostRecent.sort(function(a: SleepEntryModel, b: SleepEntryModel) {
      return +a.getDate().getTime() - +b.getDate().getTime();
    });

    copyofMostRecent = copyofMostRecent.reduce(function(acc, item) {
      let key = item.getDate().getMonth();
      acc[key] = acc[key] || [];
      acc[key].push(item);
      return acc;
    }, []);

    return copyofMostRecent; //[0]
  }

  getMonthNames() {
    return monthNames;
  }

  getMonthsSpanned(entries) {
    // If only one entry, make sure we skip any unfilled date indices
    if (Object.keys(entries).length === 1) {
      if (entries.length === 1) {
        return {
          Month: [this.getMonthNames()[entries[0].getDate().getMonth()]],
          index: entries[0].getDate().getMonth()
        };
      } else {
        for (let key in entries) {
          if (entries.hasOwnProperty(key) && key !== undefined) {
            // entries[key] is an array of SleepModels assigned to that month index (as represented by key)
            // We just need that month name, so return the first item (guaranteed to exist)
            return {
              Month: [
                this.getMonthNames()[entries[key][0].getDate().getMonth()]
              ],
              index: entries[key][0].getDate().getMonth()
            };
          }
        }
      }
    }
    // Check if key is a number (maybe check if it's 0-11?")
    let monthsSpanned = Object.keys(entries).filter(key => {
      return !isNaN(Number(key));
    });
    let monthIndexes = [];

    for (let i = 0; i < monthsSpanned.length; i++) {
      monthsSpanned[i] = this.getMonthNames()[monthsSpanned[i]];
      monthIndexes[i] = monthsSpanned[i];
    }
    return {
      Month: monthsSpanned,
      index: monthIndexes
    };
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
    console.log("Pushing to: " + new Date(date.getFullYear(), date.getMonth()));
    if (this.entriesByMonth.has(thisMonth)) {
      this.entriesByMonth.get(thisMonth).push(entry);
    } else {
      this.entriesByMonth.set(thisMonth, []);
    }
    console.log(this.entriesByMonth.get(thisMonth).push(entry));
    // Populate map with year keys and add all relating entires for that year
    let thisYear: number = new Date(date.getFullYear()).getTime();
    if (this.entriesByYear.has(thisYear)) {
      this.entriesByYear.get(thisYear).push(entry);
    } else {
      this.entriesByYear.set(thisYear, []);
    }

    // this.storeAllEntries();
    this.storeEntry(entry);
  }

  renameKeys(obj, newKeys) {
    const keyValues = Object.keys(obj).map(key => {
      const newKey = newKeys[key] || key;
      return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
  }

  restoreAllEntryFields() {
    // this.storage.get(ALL_STORAGE_KEY).then(mapOfEntries => {
    //   if (mapOfEntries) {
    //     this.allEntries = JSON.parse(mapOfEntries["ALL"]);
    //     this.entriesByMonth = JSON.parse(mapOfEntries["MONTH"]);
    //     this.entriesByYear = JSON.parse(mapOfEntries["YEAR"]);
    //     this.mostRecentEntries = JSON.parse(mapOfEntries["RECENT"]);
    //     console.log(this.allEntries);
    //     console.log(this.entriesByMonth);
    //     console.log(this.mostRecentEntries);
    //   }
    // });
    this.storage.get(FULL_STORAGE_KEY).then(mapOfEntries => {
      if (mapOfEntries) {
        this.allEntries = JSON.parse(mapOfEntries);
      }
    });
    this.storage.get(MONTH_STORAGE_KEY).then(mapOfEntries => {
      if (mapOfEntries) {
        this.entriesByMonth = JSON.parse(mapOfEntries);
      }
    });
    this.storage.get(YEAR_STORAGE_KEY).then(mapOfEntries => {
      if (mapOfEntries) {
        this.entriesByYear = JSON.parse(mapOfEntries);
      }
    });
    this.storage.get(RECENT_STORAGE_KEY).then(mapOfEntries => {
      if (mapOfEntries) {
        this.mostRecentEntries = JSON.parse(mapOfEntries);
      }
    });
    console.log(this.allEntries);
    console.log(this.entriesByMonth);
    console.log(this.mostRecentEntries);
  }

  storeAllEntries() {
    // this.storage.set(ALL_STORAGE_KEY, {
    //   ALL: JSON.stringify(this.allEntries),
    //   MONTH: JSON.stringify(this.entriesByMonth),
    //   YEAR: JSON.stringify(this.entriesByYear),
    //   RECENT: JSON.stringify(this.mostRecentEntries)
    // });
    // this.storage.set(FULL_STORAGE_KEY, JSON.stringify(this.allEntries));
    // this.storage.set(MONTH_STORAGE_KEY, JSON.stringify(this.entriesByMonth));
    // this.storage.set(YEAR_STORAGE_KEY, JSON.stringify(this.entriesByYear));
    // this.storage.set(
    //   RECENT_STORAGE_KEY,
    //   JSON.stringify(this.mostRecentEntries)
    // );
  }

  storeEntry(entry: SleepEntryModel) {
    let entryJSON = JSON.stringify(entry);
    this.storage.get(OBJS).then(series => {
      if (series) {
        console.log(series);
        if (series.length === 0) {
          this.storage.set(OBJS, JSON.stringify([entryJSON]));
          return;
        }
        let modelArray: Array<string> = JSON.parse(series);
        modelArray.push();
        this.storage.set(OBJS, JSON.stringify(modelArray));
      }
    });
  }

  restoreEntries() {
    this.storage.get(OBJS).then(series => {
      if (series) {
        if (series.length === 0) return;
        let modelArray: Array<string> = JSON.parse(series);
        for (let entryJSON of modelArray) {
          this.addEntry(this.createModelFromData(JSON.parse(entryJSON)));
        }
      }
    });
  }

  createModelFromData(entryJSON) {
    return new SleepEntryModel(
      new Date(
        entryJSON["data"]["date"]["year"],
        entryJSON["data"]["date"]["month"],
        entryJSON["data"]["date"]["date"]
      )
    );
  }

  constructor(public http: HttpClient, public storage: Storage) {
    this.storage.ready().then(() => this.restoreEntries());
    console.log("Hello EntryCollectionProvider Provider");
  }

  clearDatabase() {
    this.storage.remove(ALL_STORAGE_KEY);
  }
}
