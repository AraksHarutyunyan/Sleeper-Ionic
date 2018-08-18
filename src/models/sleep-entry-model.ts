export class SleepEntryModel {
  private data: Object = {
    date: new Date(),
    sleepTime: "",
    wakeTime: ""
  };

  // public date: Date = new Date();
  public sleepTime: string = ""; //TODO: make private and getters
  public wakeTime: string = "";

  constructor(date: Date) {
    this.data["date"] = date;
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
      date: dateObj.getDate()
    };
  }

  addSleepTime(sleepTime: string) {
    this.sleepTime = sleepTime;
  }

  addWakeTime(wakeTime: string) {
    this.wakeTime = wakeTime;
  }
}
