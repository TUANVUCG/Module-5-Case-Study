import {Component, OnInit} from '@angular/core';
import {CityService} from '../../service/city/city.service';
import {CountryService} from '../../service/country/country.service';
import {City} from '../../model/city';
import {Country} from '../../model/country';
import {NotificationService} from '../../service/notification/notification.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-city-create',
  templateUrl: './city-create.component.html',
  styleUrls: ['./city-create.component.css']
})
export class CityCreateComponent implements OnInit {
  city: City = {};
  countries: Country[] = [];
  isSubmitted = false;
  selectedImg = null;
  imgSrc = 'https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_960_720.png';

  constructor(private cityService: CityService,
              private countryService: CountryService,
              private notificationService: NotificationService,
              private storage: AngularFireStorage) {
  }

  ngOnInit() {
    this.getAllCountries();
  }


  getAllCountries() {
    this.countryService.getAllCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

  createNewCity(createForm) {
    if (this.selectedImg != null) {
      const filePath = `${this.selectedImg.name.split('.').splice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImg).snapshotChanges()
        .pipe(finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.imgSrc = url;
            console.log('URL = ' + url);
            if (createForm.valid) {
              this.city.image = url;
              this.cityService.createNewCity(this.city).subscribe(() => {
                this.notificationService.showSuccessMessage('Create success');
              });
            } else {
              this.notificationService.showFailMessage('Invalid value');
            }
          });
        })).subscribe();
    }
  }

  showPreview(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = event.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImg = event.target.files[0];
      if (this.selectedImg != null) {
        const filePath = `${this.selectedImg.name.split('.').splice(0, -1).join('.')}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, this.selectedImg).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.imgSrc = url;
            });
          })).subscribe();
      }
    } else {
      this.selectedImg = null;
    }
  }
}
