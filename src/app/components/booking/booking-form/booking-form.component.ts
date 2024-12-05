import { Booking } from './../../../models/booking.model';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup , ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { BookingServiceService } from '../../../services/bookingService.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent {

  formBooking:FormGroup;

  @Input()
  bookingEdit:Booking | null = null;

  constructor(private route: ActivatedRoute, private routerService: Router, private bookingService: BookingServiceService, formBuilder: FormBuilder){
    this.formBooking = formBuilder.group({
      'client': ['', [Validators.required, Validators.maxLength(50)]],
      'phone': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'persons': ['', [Validators.required],Validators.minLength(0),Validators.maxLength(50)],
      'notes': ['', [Validators.required],Validators.maxLength(240)],
      'dateCreation': ['', [Validators.required]],
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bookingEdit'].currentValue) {
      const booking = changes['personEdit'].currentValue as Booking;
      this.formBooking.patchValue({
       client: booking.client,
       phone: booking.phone,
       email: booking.email,
       persons: booking.persons,
       notes: booking.notes,
       dateCreation: booking.dateCreation
      })
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.bookingEdit = this.bookingService.getBookingById(id);


      if (this.bookingEdit) {
        this.formBooking.patchValue({
          client: this.bookingEdit.client,
          phone: this.bookingEdit.phone,
          email: this.bookingEdit.email,
          persons: this.bookingEdit.persons,
          notes: this.bookingEdit.notes,
          dateCreation: this.bookingEdit.dateCreation
        });
      }


    });

  }

  onSubmit() {
    if (this.formBooking.valid) {
      let bookingform = this.formBooking.value;

      if (this.bookingEdit) {
        let booking: Booking = new Booking(
          this.bookingEdit.id,
         bookingform.client,
         bookingform.phone,
         bookingform.email,
         bookingform.persons,
         bookingform.notes,
         bookingform.datetimeBooking,
         bookingform.dateCreation,
         bookingform.status,
        )
         this.bookingService.addBooking(booking)
        } else {
        let booking: Booking = new Booking(
          0,
          bookingform.client,
          bookingform.phone,
          bookingform.email,
          bookingform.persons,
          bookingform.notes,
          bookingform.datetimeBooking,
          bookingform.dateCreation,
          bookingform.status,
        )

        this.bookingService.addBooking(booking)
      }


      this.routerService.navigate(['/booking-resume'])
    }


  }
}
