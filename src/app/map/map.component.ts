import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CountryService } from "../services/country.service";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit{

  country: {
    name: string;
    capital: string;
    region: string;
    incomeLevel: string;
    longitude: string;
    latitude: string;
  } | null = null;
  constructor(private countryService: CountryService, private cdr: ChangeDetectorRef) {}

  initializeSVG(event: Event): void {
    const target = event.target as HTMLObjectElement;
    const svgDoc = target?.contentDocument;
    if (svgDoc) {
      const countries = svgDoc.querySelectorAll('path');
      console.log('Countries found:', countries.length);

      countries.forEach((country) => {
        country.addEventListener('click', () => {
          const countryCode = country.id;
          console.log('Country clicked:', countryCode);
          this.onCountrySelect(countryCode);
        });
        // personal pref for visual.
        country.addEventListener('mouseenter', () => {
          country.setAttribute('style', 'fill: lightblue; cursor: pointer;');
        });
        country.addEventListener('mouseleave', () => {
          country.removeAttribute('style');
        });
      });
    } else {
      console.error('SVG Error');
    }
  }

  onCountrySelect(countryCode: string): void {
    this.countryService.getCountryDetails(countryCode).subscribe((response) => {
      if (response && response[1]?.length > 0) {
        const countryData = response[1][0];
        console.log(`${countryData.name}`);
        // Just setting the properties, and not annoucing?
        this.country = {
          name: countryData.name,
          capital: countryData.capitalCity,
          region: countryData.region.value,
          incomeLevel: countryData.incomeLevel.value,
          longitude: countryData.longitude,
          latitude: countryData.latitude,
        };

        this.cdr.detectChanges();
      } else {
        console.error('Country not found');
        this.country = null;
      }
    });
  }
  ngOnInit() {
    console.log('working');
  }

}
