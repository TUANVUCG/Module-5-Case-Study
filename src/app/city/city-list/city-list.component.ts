import {Component, OnInit} from '@angular/core';
import {City} from '../../model/city';
import {CityService} from '../../service/city/city.service';
import {ActivatedRoute} from '@angular/router';
import {NotificationService} from '../../service/notification/notification.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {
  cities: City[] = [];
  isDelete = false;

  constructor(private cityService: CityService,
              private activateRoute: ActivatedRoute,
              private notificationService: NotificationService) {
    this.activateRoute.paramMap.subscribe(paraMap => {
      const id = paraMap.get('id');
      this.deleteById(id);
    });
  }

  ngOnInit() {
    this.getAllCity();
  }

  getAllCity() {
    return this.cityService.getAllCity().subscribe(cities => {
      this.cities = cities;
    });
  }

  deleteById(id) {
    return this.cityService.deleteCityById(id).subscribe(() => {
      this.isDelete = true;
      this.notificationService.showSuccessMessage('Delete success');
      this.getAllCity();
    });
  }
}
