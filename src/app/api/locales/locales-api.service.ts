import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@/app/config.service';
import { Locale } from './locales.model';

@Injectable()
export class LocalesApiService {
  constructor(private http: HttpClient, private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/locales`;
  }

  public get() {
    return this.http.get<Locale[]>(this.base);
  }
}
