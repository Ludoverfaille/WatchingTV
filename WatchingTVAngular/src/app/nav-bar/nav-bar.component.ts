import { Component, OnInit } from '@angular/core';
import {NavBarService} from './nav-bar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  film:any;
  recherches_result:any;
  resultat:any;

  constructor(public navBarService: NavBarService) {
  }

  rechercher() {
    this.navBarService.rechercher(this.resultat).subscribe(data => {
      this.recherches_result = data['results'];
      console.log(data)

    });
  }

  ngOnInit() {

  }

}
