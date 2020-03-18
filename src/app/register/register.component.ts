import { Component, OnInit } from '@angular/core';
import { userRegister } from '../registerUser';
import { ApiService } from '../api.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
//import { userInfo } from 'os';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  subjects: string[] = [];
   valid = false;
   passwordregex = "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}";

  constructor(private api:ApiService,
              private router:Router) { 
    }

  ngOnInit() {
    $('#navigator').hide();
  }

  public model = new userRegister('','','',
  ['Angular','Python','WebDesigning','Android','C#.NET'],
  [false,false,false,false,false],
  'male',['Rajkot','Ahmedabad','Jamnagar'],'Rajkot',1);

  onSubmit(form: NgForm)
  {
    if(!this.valid)
      return;

    console.log('submitting....');
    var email = this.model.email; 
   var password = this.model.password;
   var gender = this.model.gender; 
   var age = this.model.age; 
   var city = this.model.city_selected;
   var i = 0;
   this.model.subjects_selected.forEach(element => {    
     if(element)
     {
        switch(i)
        {
          case 0: this.subjects.push('Angular'); break; 
          case 1: this.subjects.push('Python'); break;
          case 2: this.subjects.push('WebDesigning'); break;
          case 3: this.subjects.push('Android'); break;
          case 4: this.subjects.push('C#.NET'); break;
        }
     }
     i++;
   });
    //console.log(this.subjects);
   var json = '{"email":"' + email + '","password":"' + password + '", "gender":"' + gender + '","age":"' + age + '","city":"'+ city + '"';
   json = json + ', "subjects":[';
   this.subjects.forEach(element => {
        json += '"' + element + '"' + ',';
   });
   json = json.slice(0,json.length - 1);
   json += ']}';
   console.log(json);
   this.api.registerUser(JSON.parse(json)).subscribe((res)=>{
    if(res.ok == 1)
    {
      $("#Valid").show().delay(1000).fadeOut(400);      
      setTimeout(() => {
        this.router.navigate(['../login']);
       }, 1200);      
    }
    else
    {
      $("#Error").show().delay(1000).fadeOut(400);   
    }
  });    
  }

  validate(form:NgForm)
  {
    var frmCntrl = form.controls['passwordconf']; 
    var cond1 = frmCntrl != null && (frmCntrl.dirty || frmCntrl.touched);
    var cond2 = this.model.password != this.model.confpassword;
    
    if(cond1 && cond2)
    {
      frmCntrl.setErrors({"incorrect":"true"}); 
      frmCntrl.updateValueAndValidity();
      if(this.model.confpassword != '')
        $('#pwderr').show(); 
      this.valid = false;
     // console.log(form.invalid);
     // console.log(frmCntrl.getError('incorrect'));
    }
    else if(cond1 && !cond2)
    {
      $('#pwderr').hide(); 
      this.valid = true;
      frmCntrl.clearValidators(); 
      frmCntrl.updateValueAndValidity();
    }    
  }  
}
