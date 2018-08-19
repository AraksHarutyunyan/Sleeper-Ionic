export class SleepEntryModel {
  private data: Object = {
    date: new Date(),
    sleepTime: "",
    wakeTime: ""
  };

  private hasSleepTime: boolean = false;
  private hasWakeTime: boolean = false;

  constructor(date: Date) {
    this.data["date"] = date;
  }

  isCompleteEntry() {
    return this.hasSleepTime && this.hasWakeTime;
  }

  /* Return JS Date obj */
  getDate() {
    return this.data["date"];
  }

  /* Return JS Date obj's String */
  getDateString() {
    return this.data["date"].toDateString();
  }

  /* Return formatted custom obj with only date parameters, no time */
  getDateObject() {
    let dateObj: Date = this.data["date"];
    return {
      year: dateObj.getFullYear(),
      month: dateObj.getMonth(),
      date: dateObj.getDate(),
      isComplete: this.isCompleteEntry()
    };
  }

  getSleepTime() {
    return this.data["sleepTime"];
  }

  getWakeTime() {
    return this.data["wakeTime"];
  }

  addSleepTime(sleepTime: string) {
    this.data["sleepTime"] = sleepTime;
    this.hasSleepTime = true;
  }

  addWakeTime(wakeTime: string) {
    this.data["wakeTime"] = wakeTime;
    this.hasWakeTime = true;
  }
}
