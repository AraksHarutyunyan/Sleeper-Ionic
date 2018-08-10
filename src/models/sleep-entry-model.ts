export class SleepEntryModel {
  public date: Date = new Date();

  public sleepTime: string = ""; //TODO: make private and getters
  public wakeTime: string = "";

  constructor(date: Date) {
    this.date = date;
  }

  getDateString() {
    // return this.date.toLocaleDateString();
    return this.date.toDateString();
  }
  addSleepTime(sleepTime: string) {
    this.sleepTime = sleepTime;
  }

  addWakeTime(wakeTime: string) {
    this.wakeTime = wakeTime;
  }
}
