import {Component, OnInit} from '@angular/core';
import {City} from '../../model/city';
import {CityService} from '../../service/city/city.service';
import {ActivatedRoute} from '@angular/router';
import {CountryService} from '../../service/country/country.service';
import {Country} from '../../model/country';
import {NotificationService} from '../../service/notification/notification.service';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.css']
})
export class CityEditComponent implements OnInit {
  city: City = {};
  countries: Country[] = [];

  constructor(private cityService: CityService,
              private activateRoute: ActivatedRoute,
              private countryService: CountryService,
              private notificationService: NotificationService) {
    this.activateRoute.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      this.getCityById(id);
    });
  }

  ngOnInit() {
    this.getAllCountries();
  }

  getCityById(id) {
    this.cityService.getCityById(id).subscribe(city => {
      this.city = city;
    });
  }

  getAllCountries() {
    this.countryService.getAllCountries().subscribe(countries =>
      this.countries = countries);
  }

  editCityById(id) {
    this.cityService.editCityById(id, this.city).subscribe(() => {
        this.notificationService.showSuccessMessage('Edit success');
      },
      () => {
        this.notificationService.showFailMessage('Edit fail');
      });
  }
}
