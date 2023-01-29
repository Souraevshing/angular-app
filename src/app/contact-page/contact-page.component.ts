import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { fakeListing } from '../fake-data';
import { ListingsService } from '../listings.service';
import { Listing } from '../types';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
})
export class ContactPageComponent implements OnInit {
  email: string = '';
  message: string = '';
  listing: Listing;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingsService: ListingsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.listingsService.getListingById(id!).subscribe((listing) => {
      this.listing = listing;
      this.message = `I'm interested in your product ${this.listing.name.toLowerCase()} `;
    });
  }

  sendMessage(): void {
    alert('message sent!');
    this.router.navigateByUrl('/listings');
  }
}
