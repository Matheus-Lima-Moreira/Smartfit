import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FormsComponent } from './components/forms/forms.component';
import { BehaviorSubject } from 'rxjs';
import { CardsListComponent } from './components/cards-list/cards-list.component';
import { Location } from './types/location.interface';
import { GetUnitsService } from './services/get-units.service';
import { LegendComponent } from './components/legend/legend.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FormsComponent,
    CardsListComponent,
    LegendComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showList = new BehaviorSubject<boolean>(false);
  unitsList: Location[] = [];

  constructor(private unitService: GetUnitsService) { }

  onSubmit() {
    this.unitsList = this.unitService.getFilteredUnits();
    this.showList.next(true);
  }
}
