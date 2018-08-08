import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BeingImageService {
  public imageConfigs = {};

  constructor(
    public http: HttpClient) {
    this.getBeingConfig('dwarf');
    this.getBeingConfig('tree');
    this.getBeingConfig('booty');
    this.getBeingConfig('grassback');
    this.getBeingConfig('tallgrass');
    this.getBeingConfig('dragon');
    this.getBeingConfig('tile-grass');
    this.getBeingConfig('dove');
    this.getBeingConfig('cow');
  }

  public getBeingConfig(url) {
    this.http.get('assets/beings-config/' + url + '.json').subscribe( (res: any) => {
     this.imageConfigs[url] = res;
    });
  }
}
