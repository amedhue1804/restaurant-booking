import { FooterComponent } from './../../components/footer/footer.component';
import { BookingResumeComponent } from './../../components/booking/booking-resume/booking-resume.component';
import { BookingFormComponent } from './../../components/booking/booking-form/booking-form.component';
import { HeaderComponent } from './../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule,HeaderComponent,BookingFormComponent,BookingResumeComponent,FooterComponent],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent {

}
