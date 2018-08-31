export class SleepEntryModel {
  private data: Object = {
    date: {
      dateObj: new Date(),
      year: 2018,
      month: 1,
      date: 1
    },
    sleepTime: {
      display: "",
      hour: 0,
      minute: 0
    },
    wakeTime: {
      str: "",
      hour: 0,
      minute: 0
    }
  };

  private hasSleepTime: boolean = false;
  private hasWakeTime: boolean = false;

  constructor(date: Date) {
    this.data["date"]["dateObj"] = date;
    this.data["date"]["year"] = date.getFullYear();
    this.data["date"]["month"] = date.getMonth();
    this.data["date"]["date"] = date.getDate();
  }

  addSleepTime(hour: number, min: number) {
    this.data["sleepTime"]["display"] = hour + "hrs " + min + "min";
    this.data["sleepTime"]["hour"] = hour;
    this.data["sleepTime"]["minute"] = min;
  }
  addWakeTime(hour: number, min: number) {
    this.data["wakeTime"]["display"] = hour + "hrs " + min + "min";
    this.data["wakeTime"]["hour"] = hour;
    this.data["wakeTime"]["minute"] = min;
  }

  isCompleteEntry() {
    return this.hasSleepTime && this.hasWakeTime;
  }

  /* Return JS Date obj */
  getDate() {
    // Just in case while serialising/deserialising (in JSON) this date has remained a string
    if (typeof this.data["date"]["dateObj"] === "string") {
      this.data["date"]["dateObj"] = new Date(
        this.data["date"]["year"],
        this.data["date"]["month"],
        this.data["date"]["date"]
      );
    }

    return this.data["date"]["dateObj"];
  }

  /* Return JS Date obj's String */
  getDateString() {
    return this.getDate().toDateString();
  }

  /* Return formatted custom obj with only date parameters, no time */
  getDateObject() {
    let dateObj: Date = this.data["date"];
    return {
      year: this.data["date"]["year"],
      month: this.data["date"]["month"],
      date: this.data["date"]["date"],
      isComplete: this.isCompleteEntry()
    };
  }

  getSleepTimeDisplay() {
    return this.data["sleepTime"]["display"];
  }

  getWakeTimeDisplay() {
    return this.data["wakeTime"]["display"];
  }

  addSleepTimeDisplay(sleepdisplay: string) {
    this.data["sleepTime"]["display"] = sleepdisplay;
    this.hasSleepTime = true;
  }

  addWakeTimeDisplay(wakedisplay: string) {
    this.data["wakeTime"]["display"] = wakedisplay;
    this.hasWakeTime = true;
  }

  deepCopy() {
    return new SleepEntryModel(
      new Date(
        this.data["date"]["year"],
        this.data["date"]["month"],
        this.data["date"]["date"]
      )
    );
  }

  getCopyData() {
    return this.data;
  }
}
