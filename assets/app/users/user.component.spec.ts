import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { UserService } from './user.service';
import { UserComponent } from './user.component';
import { User } from '../auth/user.model';

import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';

let tripService: any;
let expectedUser: User;
let componentUserService: any;
let comp:    UserComponent;
let fixture: ComponentFixture<UserComponent>;
let deElements, deBtn, deBtn2, deFirstElement:      DebugElement;
let elBtn, elBtn2:      HTMLElement;
let tripServiceStub: {
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


describe('UserComponent', () => {
  beforeEach(() => {
    tripServiceStub = {
      isLoggedIn: true,
      user: { 
        firstName: 'Test User',
        subscribe: () => {}
    },

    };


    TestBed.configureTestingModule({
      declarations: [ UserComponent ], // declare the test component
      providers:    [ {provide: UserService, useValue: tripServiceStub }],
      imports: [RouterTestingModule.withRoutes(fake_routes)]
    })
      // .compileComponents();
    

    fixture = TestBed.createComponent(UserComponent);
    comp    = fixture.componentInstance;

    // UserService actually injected into the component
    tripService = fixture.debugElement.injector.get(UserService);
    componentUserService = tripService;
    // UserService from the root injector
    tripService = TestBed.get(UserService);

    // query for the title <h1> by CSS element selector
    deElements = fixture.debugElement.queryAll(By.all());
    // elUser = deUser.nativeElement;
    deFirstElement = fixture.debugElement.query(By.all());
    // console.log('el user', elUser);

    deBtn = fixture.debugElement.query(By.css('.edit-btn'));
    elBtn = deBtn.nativeElement;

    deBtn2 = fixture.debugElement.query(By.css('.delete-btn'));
    elBtn2 = deBtn2.nativeElement;


    expectedUser = new User('test@test.com', '12345','John', 'James', '1', 'admin');
    comp.user = expectedUser;
    comp.onEdit = ()=> {};
    fixture.detectChanges(); // trigger initial data binding

  });
  
  it('should display user first name', () => {
    const expectedFirstName = expectedUser.firstName;
    expect(deElements[0].nativeElement.textContent).toContain(expectedFirstName);
  });

  it('should display user last name', () => {
    const expectedLastName = expectedUser.lastName;
    expect(deElements[1].nativeElement.textContent).toContain(expectedLastName);
  });

  it('should display user email', () => {
    const expectedEmail = expectedUser.email;
    expect(deElements[2].nativeElement.textContent).toContain(expectedEmail);
  });

  it('should display user role', () => {
    const expectedRole = expectedUser.role;
    expect(deElements[3].nativeElement.textContent).toContain(expectedRole);
  });

  it('should have delete button', () => {
    expect(deElements[4].nativeElement.textContent).toContain('Delete');
  });

  it('should have edit button', () => {
    expect(deElements[4].nativeElement.textContent).toContain('Edit');
  });

  it('should have delete button', () => {
    expect(deElements[4].nativeElement.textContent).toContain('Edit');
  });

  it('should call onEdit function when edit is clicked', () => {
    spyOn(comp, 'onEdit')
    click(elBtn);   // triggerEventHandler helper
    fixture.detectChanges();
    expect(comp.onEdit).toHaveBeenCalled();
  });

  it('should call onDelete function when delete is clicked', () => {
    spyOn(comp, 'onDelete')
    click(elBtn2);   // triggerEventHandler helper
    fixture.detectChanges();
    expect(comp.onDelete).toHaveBeenCalled();
  });

});
