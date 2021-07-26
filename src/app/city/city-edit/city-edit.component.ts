import {Component, OnInit} from '@angular/core';
import {City} from '../../model/city';
import {CityService} from '../../service/city/city.service';
import {ActivatedRoute} from '@angular/router';
import {CountryService} from '../../service/country/country.service';
import {Country} from '../../model/country';
import {NotificationService} from '../../service/notification/notification.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.css']
})
export class CityEditComponent implements OnInit {
  city: City = {};
  countries: Country[] = [];
  selectedImage = null;
  imgSrc = '';

  constructor(private cityService: CityService,
              private activateRoute: ActivatedRoute,
              private countryService: CountryService,
              private notificationService: NotificationService,
              private storage: AngularFireStorage) {
    this.activateRoute.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      this.getCityById(id);
    });
  }

  ngOnInit() {
    this.getAllCountries();
    this.imgSrc = this.city.image;
  }

  getCityById(id) {
    this.cityService.getCityById(id).subscribe(city => {
      this.city = city;
      this.imgSrc = this.city.image;
    });
  }

  getAllCountries() {
    this.countryService.getAllCountries().subscribe(countries =>
      this.countries = countries);
  }


  editCityById(id) {
    if (this.selectedImage != null) {
      const filePath = `${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            console.log(url);
            this.imgSrc = url;
            this.city.image = url;
            this.cityService.editCityById(id, this.city).subscribe(() => {
                this.notificationService.showSuccessMessage('Edit success');
              },
              () => {
                this.notificationService.showFailMessage('Edit fail');
              });
          });
        })).subscribe();
    }
  }

  showPreview(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = event.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      if (this.selectedImage != null) {
        const filePath = `${this.selectedImage.name.split('.').splice(0, -1).join('.')}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.imgSrc = url;
            });
          })).subscribe();
      }
    } else {
      this.selectedImage = null;
    }
  }
}
