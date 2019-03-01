import {Component, ViewChild} from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { NgxQRCodeComponent } from "ngx-qrcode2";
import { SocialSharing } from '@ionic-native/social-sharing';
import { Storage  } from "@ionic/storage";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild(NgxQRCodeComponent) qrcodecontent: NgxQRCodeComponent;

    options:BarcodeScannerOptions;
    encodText: string="";
    encodedData: any={};
    scannedData:any={};
    historique;
    constructor(public scanner: BarcodeScanner,private socialSharing: SocialSharing, private storage: Storage ) {
        storage.keys().then((data) => {
            if (data.indexOf("history") > -1) {
                storage.get("history").then((data) => {
                    this.historique = data;
                });
            }else {
                this.historique = [];
                console.log(typeof this.historique);
            }
        });
    }
    scan(){
        this.options= {
            prompt: 'Scan it'
        };
        this.scanner.scan(this.options).then((data) => {
            this.scannedData = data;
        }, (err) => {
            console.log("error :", err);
        })
    }
    encode(){
        this.encodedData = this.encodText;
        this.historique.push({"nom":this.encodText, "date": Date()});
        this.storage.set("history", this.historique);
    }

    sharing(){
        this.qrcodecontent.toDataURL().then((data) => {
            this.socialSharing.share("Message","Subject", data.toString())
                .then((entries) => {
                    console.log('success ' + JSON.stringify(entries));
                })
                .catch((error) => {
                    alert('error ' + JSON.stringify(error));
                });
        });
    }
}
