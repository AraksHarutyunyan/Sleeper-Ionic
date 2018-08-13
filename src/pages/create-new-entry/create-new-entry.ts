import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { EntryCollectionProvider } from "../../providers/entry-collection/entry-collection";

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
  public myDate: any = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public entryCollection: EntryCollectionProvider
  ) {
    this.updateMaxSelectDate();
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
