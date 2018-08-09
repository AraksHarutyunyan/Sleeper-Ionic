export class SleepEntryModel {
  public date: string = "";

  public sleepTime: string = ""; //TODO: make private and getters
  public wakeTime: string = "";

  constructor(date: string) {
    this.date = date;
  }

  addSleepTime(sleepTime: string) {
    this.sleepTime = sleepTime;
  }

  addWakeTime(wakeTime: string) {
    this.wakeTime = wakeTime;
  }
}
