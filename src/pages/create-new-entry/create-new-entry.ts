import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { EntryCollectionProvider } from "../../providers/entry-collection/entry-collection";
import { SleepEntryModel } from "../../models/sleep-entry-model";

/**
 * Generated class for the CreateNewEntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-create-new-entry",
  templateUrl: "create-new-entry.html"
})
export class CreateNewEntryPage {
  public today: string = "";
  public newDate: any = "";

  EntryDetails: any = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public entryCollection: EntryCollectionProvider
  ) {
    this.updateMaxSelectDate();
  }

  createNewEntry() {
    if (this.newDate == "") return;

    let modelDate = new Date(this.newDate);
    if (
      this.entryCollection.entryExists(
        modelDate.getFullYear(),
        modelDate.getMonth(),
        modelDate.getDate()
      )
    )
      return;
    let newModel: SleepEntryModel = new SleepEntryModel(
      new Date(
        modelDate.getFullYear(),
        modelDate.getMonth(),
        modelDate.getDate()
      )
    );
    newModel.addSleepTime(
      "" + modelDate.getHours() + "hrs " + modelDate.getMinutes() + "min"
    );
    this.entryCollection.addEntry(newModel);
  }

  updateMaxSelectDate() {
    let todayDate = new Date(),
      month = "" + (todayDate.getMonth() + 1),
      day = "" + todayDate.getDate(),
      year = todayDate.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    this.today = [year, month, day].join("-");
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad CreateNewEntryPage");
  }
}
