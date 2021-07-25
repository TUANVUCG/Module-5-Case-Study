import {Component, OnInit} from '@angular/core';
import {CityService} from '../../service/city/city.service';
import {ActivatedRoute} from '@angular/router';
import {City} from '../../model/city';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css']
})
export class CityDetailComponent implements OnInit {
  city: City = {};

  constructor(private cityService: CityService,
              private activateRoute: ActivatedRoute) {
    this.activateRoute.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      this.getCityById(id);
    });
  }

  ngOnInit() {
  }

  getCityById(id) {
    this.cityService.getCityById(id).subscribe(city => {
      this.city = city;
    });
  }
}
