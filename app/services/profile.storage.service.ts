import {Injectable} from "@angular/core";
import * as fs from "file-system";

@Injectable()
export class ProfileStorage {
  folderName: string = "io.hackages.hackages-messenger";
  fileName: string = "profile_id"
  folder: any;
  file: any;

  constructor() {
    let documents = fs.knownFolders.documents();
    this.folder = documents.getFolder(this.folderName);
    this.file = this.folder.getFile((this.fileName) + ".txt");

  }

  storeId(id: string) {
    return this.file.writeText(id)
      .catch(err => {
        // Error
      });
  }

  readId() {
    return this.file.readText()
  }
}