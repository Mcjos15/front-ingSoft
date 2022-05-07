import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-listar',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit, OnDestroy {


  title = 'datatables';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  posts: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      lengthMenu: [5, 10, 25]
    };

    this.http.get('http://jsonplaceholder.typicode.com/posts')
      .subscribe(posts => {
        this.posts = posts;
        console.log(this.posts);

        this.dtTrigger.next(void 0);
      });

  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}






export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
