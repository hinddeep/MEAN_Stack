import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public remember = false;
  constructor(private api:ApiService,
              private router:Router) { }

  ngOnInit() {
    $('#navigator').hide();
    if(localStorage.getItem('user') != null)
    {
      this.router.navigate(['../dashboard']);      
    }
  }

  onSubmit(email,password){   
    
    var json = JSON.parse('{"usr":"' + email + '","pwd":"' + password + '"}');
    this.api.loginValidate(json).subscribe((res) => {
        switch(res.ok)
        {
          case 'error': {
            $("#Error").show().delay(1000).fadeOut(400);
            break;
          } 
          case 'match': {
            console.log('match');
            
            localStorage.setItem('user',email);
            
            $('#link')[0].click();
            
            break;
          }
          case 'noMatch': {
            $("#Incorrect").show().delay(1000).fadeOut(400);
            break;
          }
          case 'userNotFound': {
            $("#NotFound").show().delay(1000).fadeOut(400);
            break;
          }
        }
    });
  }
}
