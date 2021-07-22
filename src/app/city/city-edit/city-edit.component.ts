import {Component, OnInit} from '@angular/core';
import {City} from '../../model/city';
import {CityService} from '../../city.service';
import {ActivatedRoute} from '@angular/router';
import {CountryService} from '../../country.service';
import {Country} from '../../model/country';

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
              private countryService: CountryService) {
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
      alert('Success');
    });
  }
}
