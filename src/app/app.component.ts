import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
//import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoginComponent]
})
export class AppComponent {
  title = 'CRUD app using MEAN'; 
  rememberme = false;

  constructor(login:LoginComponent) {
    this.rememberme = login.remember;
  }

  ngOnInit(){
    
  }

  toggleHeading(){
      $("#a").click(function(e) {
        $("#d").removeClass('active');
        $("#a").addClass('active');
      }); 

      $("#d").click(function(e) {
        $("#a").removeClass('active');
        $("#d").addClass('active');
      });
    }
    
    logout(){
      console.log(this.rememberme);
      if(!this.rememberme)
        localStorage.clear();
      console.log("logged out...");
      console.log(localStorage.getItem('user'));
    }  
}
