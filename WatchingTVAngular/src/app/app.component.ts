import {Component, OnInit} from '@angular/core';
import {BroadcastFavoriCreateService} from './broadcast-favori-create.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'WatchingTV';

  constructor(public broadcastFavoriCreate:BroadcastFavoriCreateService){}

  ngOnInit(){

  }

  listenFavoriCreated(){

  }

}
