import { Component, OnInit } from '@angular/core';
import { UserData } from '../usrdata';
import { ApiService } from '../api.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit() {
    $('#navigator').show();
  }

  public model = new UserData('Foo', 'Bar');
  submitted = false;

  onSubmit(){
    this.submitted = true; 
    var json = JSON.parse('{"fname":"'+this.model.fname+'","lname":"'+this.model.lname + '"}'); 
    this.api.postData(json).subscribe((res)=>{
      console.log('data posted...');
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
