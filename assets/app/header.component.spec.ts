import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { AuthService } from './auth/auth.service';
import { HeaderComponent } from './header.component';

import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';

let authService: any;
let componentUserService: any;
let comp:    HeaderComponent;
let fixture: ComponentFixture<HeaderComponent>;
let de, deBtn:      DebugElement;
let el, elBtn:      HTMLElement;
let authServiceStub: {
  isLoggedIn: boolean;
  user: { 
    firstName: string,
    subscribe: any
  };
};

export const fake_routes: Routes = [
// {path: 'home', component: MyComponent},
];

export const ButtonClickEvents = {
   left:  { button: 0 },
   right: { button: 2 }
};

export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}


describe('HeaderComponent', () => {
  beforeEach(() => {
    authServiceStub = {
      isLoggedIn: true,
      user: { 
        firstName: 'Test User',
        subscribe: () => {}
    },

    };
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ], // declare the test component
      providers:    [ {provide: AuthService, useValue: authServiceStub } ],
      imports: [RouterTestingModule.withRoutes(fake_routes)]
    })
      .compileComponents();
    

    fixture = TestBed.createComponent(HeaderComponent);
    comp    = fixture.componentInstance;

    // // UserService actually injected into the component
    authService = fixture.debugElement.injector.get(AuthService);
    componentUserService = authService;
    // // AuthService from the root injector
    authService = TestBed.get(AuthService);

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('header'));
    el = de.nativeElement;

    deBtn = fixture.debugElement.query(By.css('.logout'));
    elBtn = de.nativeElement;

  });
  
  it('should have app name', () => {
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).toContain('Travel Planner');
  });

  it('should have logout and admin panel', () => {
    fixture.detectChanges();
    const content = el.textContent;
    expect(content).toContain('Logout');
    expect(content).toContain('Admin panel');
  });

  it('should inject the component\'s UserService instance',
    inject([AuthService], (service: AuthService) => {
    expect(service).toBe(componentUserService);
  }));

  it('TestBed and Component UserService should be the same', () => {
    expect(authService === componentUserService).toBe(true);
  });

  it('stub object and injected UserService should not be the same', () => {
    expect(authServiceStub === authService).toBe(false);
    // Changing the stub object has no effect on the injected service
    authServiceStub.isLoggedIn = false;
    expect(authService.isLoggedIn).toBe(true);
  });
});
