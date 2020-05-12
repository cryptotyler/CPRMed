import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';  
import { AngularFireDatabase,AngularFireList, AngularFireObject, } from '@angular/fire/database';
import { ToastController } from '@ionic/angular';
import { Observable ,of, ObjectUnsubscribedError} from 'rxjs';
import { filter ,map} from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import {GetWeight} from '../../models/getWeight';
import { transformAll } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {
  private basePath: string = 'gram';
  getweight: AngularFireObject<GetWeight> = null;
    public averageArray: number[];
    public highPressed:number=0;
    public lowPressed:number=0;
    public mainListener:boolean;
    public truePressed:number=0;
    public items;
    public valueTemp;
    public $subcrible;
    public totalWeight: number;
    constructor(public Database: AngularFireDatabase,public toastController:ToastController ) {
      this.items = Database.object('gram').valueChanges()
    }
    async presentToast(text:string) {
      const toast = await this.toastController.create({
        message: text,
        duration: 2000
      });
      toast.present();
    }
  ngOnInit() {
  }
  simulationStart(){
    this.$subcrible= this.items.subscribe(
      value => {
        this.totalWeight=parseInt(value);
        if(this.totalWeight<30000){
          this.lowPressed++;
        }
        else if(this.totalWeight>50000){
          this.highPressed++;
        }
        else{
          this.truePressed++;
        }
      });
    //this.$subcrible= this.items.subscribe(value => {this.averageArray=value});
    //transformAll(this.items:Observable<number>):Observable<string>);
    //this.totalWeight = this.items.pipe(filter((n:number)=>n!=0),map(n=>n*n));
  }
  simulationStop(){
      this.mainListener=false;
  }
  getItem(): AngularFireObject<GetWeight> {
    this.getweight = this.Database.object('gram')
    return this.getweight
  }
}
