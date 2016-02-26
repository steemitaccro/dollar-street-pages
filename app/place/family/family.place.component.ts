import { Component, OnInit , Inject } from 'angular2/core';
import {
  RouterLink
} from 'angular2/router';

import {FamilyPlaceService} from './family.place.service';

let tpl = require('./family.place.component.html');
let style = require('./family.place.component.css');

@Component({
  selector: 'family-place',
  template: tpl,
  styles: [style],
  providers: [FamilyPlaceService],
  directives:[RouterLink]
})

export class FamilyPlaceComponent {
  private familyPlaceService:FamilyPlaceService;
  private loadMore:boolean = true;
  private amazon:any = '';
  private loadPage:boolean = true;
  private filterList:any = 'all';
  private type:any = {};
  private images:any = [];
  private places:any = [];
  private isZoom:boolean = false;
  private resThing:any;
  private image:any;

  constructor(@Inject(FamilyPlaceService) familyPlaceService:any) {
    this.familyPlaceService = familyPlaceService;
  }

  ngOnInit(): void {
    this.nextImages(10);
  }

  goToThing (thing, image) {
    this.images.length = 0;
    this.nextImages(10, image);
    this.getThings();
  };

  getThings () {

    this.places.length = 0;

    this.familyPlaceService.getPlaceFamilyThings()
      .subscribe((res:any)=> {
        if (res.err) {
          return res.err;
        }
        this.updateArr(this.places, res.places);

        this.resThing = res.thing;
        this.image = res.image;
      });
  };


  updateArr (context:any, update:any, change?:any) {
    var cloneArr = update.slice(0);

    if (change) {
      cloneArr = change(cloneArr);
    }

    Array.prototype.unshift.apply(cloneArr, [0, 1]);
    Array.prototype.splice.apply(context, cloneArr);
  }

  nextImages (limit, image?:any) {
    this.familyPlaceService.getPlaceFamilyImages('isTrash=false&limit=10&placeId=54b4f73c9f0c8d666e1ac45e&skip=0')
      .subscribe((res:any)=> {
        if (res.err) {
          return res.err;
        }
        this.images = res.images;
      });
  }
}