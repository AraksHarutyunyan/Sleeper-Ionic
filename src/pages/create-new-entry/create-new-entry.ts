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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public entryCollection: EntryCollectionProvider
  ) {
    
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CreateNewEntryPage");
  }
}
