import {Component, OnInit} from '@angular/core';
import {CityService} from '../../service/city/city.service';
import {CountryService} from '../../service/country/country.service';
import {City} from '../../model/city';
import {error, log} from 'util';
import {Country} from '../../model/country';
import {NotificationService} from '../../service/notification/notification.service';

@Component({
  selector: 'app-city-create',
  templateUrl: './city-create.component.html',
  styleUrls: ['./city-create.component.css']
})
export class CityCreateComponent implements OnInit {
  city: City = {};
  countries: Country[] = [];
  isSubmitted = false;

  constructor(private cityService: CityService,
              private countryService: CountryService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.getAllCountries();
  }

  createNewCity(createForm) {
    this.isSubmitted = true;
    if (createForm.valid) {
      this.cityService.createNewCity(this.city).subscribe(() => {
        this.notificationService.showSuccessMessage('Create success');
      });
    } else {
      this.notificationService.showFailMessage('Invalid value');
    }
  }

  getAllCountries() {
    this.countryService.getAllCountries().subscribe(countries => {
      this.countries = countries;
    });
  }
}
