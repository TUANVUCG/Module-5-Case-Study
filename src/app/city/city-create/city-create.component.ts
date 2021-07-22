import {Component, OnInit} from '@angular/core';
import {CityService} from '../../city.service';
import {CountryService} from '../../country.service';
import {City} from '../../model/city';
import {error, log} from 'util';
import {Country} from '../../model/country';

@Component({
  selector: 'app-city-create',
  templateUrl: './city-create.component.html',
  styleUrls: ['./city-create.component.css']
})
export class CityCreateComponent implements OnInit {
  city: City = {};
  countries: Country[] = [];
  constructor(private cityService: CityService,
              private countryService: CountryService) {
  }

  ngOnInit() {
    this.getAllCountries();
  }

  createNewCity() {
    this.cityService.createNewCity(this.city).subscribe(data => {
    });
  }

  getAllCountries() {
    this.countryService.getAllCountries().subscribe(countries => {
      this.countries = countries;
    });
  }
}
