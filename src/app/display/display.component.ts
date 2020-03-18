import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';

const serverPort = 5000;
const apiUrl = 'http://localhost:' + serverPort + '/read';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})

export class DisplayComponent implements OnInit {

  constructor(private http: HttpClient,
              private api:ApiService,
              private router:Router) { }
  students: any;
  
  ngOnInit() {
    if(localStorage.getItem('user') == null)
      this.router.navigate(['../login']);
      
      else
      {
        this.http.get(apiUrl).subscribe((data)=>{
        this.students = data;
        console.log(data);
        $('#navigator').show();
        });
       }
  }

  del(id)
  {
    console.log('delete ' + id + ' clicked');
    this.api.delData(JSON.parse('{"id":"' + id + '"}')).subscribe((res)=>{
      if(res.ok == 1)
      {
        $('#'+id).parent().parent().hide(400,"swing");
        $("#Success").show().delay(1000).fadeOut(400);
      }
      else
      {
        $("#Failure").show().delay(1000).fadeOut(400);
      }
    });
  }

  updt(id)
  {
    console.log('update ' + id + ' clicked');
    var queryid = "F" + id;
    var fname = $('#'+ queryid).text();
	  queryid = "L" + id;
    var lname = $('#'+ queryid).text();
     
    var json = '{"id":"' + id + '", "fname":"' + fname + '", "lname":"' + lname + '"}';
    console.log(json);
    this.api.updtData(JSON.parse(json)).subscribe((res)=>{
      if(res.ok == 1)
      {
        $("#Success").show().delay(1000).fadeOut(400);
      }
      else
      {
        $("#Failure").show().delay(1000).fadeOut(400);
      }
    });
  }
}