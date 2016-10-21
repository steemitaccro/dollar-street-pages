import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { MathService } from '../../common/math-service/math-service';
import { PhotographerPlacesService } from './photographer-places.service';
import { LoaderService } from '../../common/loader/loader.service';

@Component({
  selector: 'photographer-places',
  templateUrl: './photographer-places.template.html',
  styleUrls: ['./photographer-places.css']
})

export class PhotographerPlacesComponent implements OnInit, OnDestroy {
  @Input() public  photographerId: string;
  private places: any = [];
  private math: MathService;
  private loaderService: LoaderService;
  private photographerPlacesServiceSubscribe: Subscription;
  private photographerPlacesService: PhotographerPlacesService;

  public constructor(math: MathService,
                     loaderService: LoaderService,
                     photographerPlacesService: PhotographerPlacesService) {
    this.math = math;
    this.loaderService = loaderService;
    this.photographerPlacesService = photographerPlacesService;
  }

  public ngOnInit(): void {
    this.loaderService.setLoader(false);

    this.photographerPlacesServiceSubscribe = this.photographerPlacesService
      .getPhotographerPlaces(`id=${this.photographerId}`)
      .subscribe((res: any) => {
        if (res.err) {
          console.error(res.err);
          return;
        }

        this.places = res.data.places;
        this.loaderService.setLoader(true);
      });
  }

  public ngOnDestroy(): void {
    this.photographerPlacesServiceSubscribe.unsubscribe();
    this.loaderService.setLoader(false);
  }
}
