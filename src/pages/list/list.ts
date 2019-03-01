import { Component } from '@angular/core';
import {Storage } from "@ionic/storage";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  items;

  constructor(private storage: Storage ) {
    storage.keys().then((data) => {
      if (data.indexOf("history") > -1) {
        storage.get("history").then((data) => {
          this.items = data;
        });
      }else {
        this.items = [];
      }
      console.log(this.items);
    });
  }
}
