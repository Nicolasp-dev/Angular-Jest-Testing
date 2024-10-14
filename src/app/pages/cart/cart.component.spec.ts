import { BookService } from './../../services/book.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HomeComponent } from "../home/home.component";
import { CartComponent } from "./cart.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from 'src/app/models/book.model';

const listBook: Book[] = [
  {
    name: '',
    author: '',
    isbn: '',
    price: 15,
    amount: 2
  },
  {
    name: '',
    author: '',
    isbn: '',
    price: 20,
    amount: 1
  },
  {
    name: '',
    author: '',
    isbn: '',
    price: 8,
    amount: 7
  }
];

// Create a Describe
describe('CartComponent', () => {

  // Define top variables
  let component: CartComponent;
  // Add a Fixture **
  let fixture: ComponentFixture<CartComponent>;
  //
  let service: BookService;

  // Test initialization
  beforeEach(() => {
    // TestBed ** Main Configuration test module
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        HomeComponent
      ],
      providers: [
        BookService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  })

  beforeEach(() => {
    // Create a new instance of the component
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = fixture.debugElement.injector.get(BookService);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should display total price', () => {
    const totalPrice = component.getTotalPrice(listBook);

    expect(totalPrice).toBeGreaterThan(0);
    expect(totalPrice).not.toBe(0);
    expect(totalPrice).not.toBeNull();
    expect(totalPrice).toBe(106);
  })

  it('should display increments correctly', () => {
    const action = 'plus';
    const book: Book = listBook[0];

    const updateSpy = jest.spyOn(service, 'updateAmountBook').mockImplementation(() => null);
    const componentSpy = jest.spyOn(component, 'getTotalPrice').mockImplementation(() => null);

    expect(book.amount).toBe(2);

    component.onInputNumberChange(action, book);

    expect(book.amount).toBe(3)
    expect(updateSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalledTimes(1);
  })

  it('should display decrement correctly', () => {
    const action = 'minus';
    const book: Book = listBook[0];

    const updateSpy = jest.spyOn(service, 'updateAmountBook').mockImplementation(() => null);
    const componentSpy = jest.spyOn(component, 'getTotalPrice').mockImplementation(() => null);

    expect(book.amount).toBe(3);

    component.onInputNumberChange(action, book);

    expect(book.amount).toBe(2);
    expect(updateSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalledTimes(1);
  })

  it('should remove all listed books', () => {
    const serviceSpy = jest.spyOn(service, 'removeBooksFromCart').mockImplementation(() => null);
    // test a private method ** Cast the Spy as any type
    const compSpy = jest.spyOn(component as any, '_clearListCartBook');

    component.listCartBook = listBook;
    component.onClearBooks();

    expect(component.listCartBook.length).toBe(0);
    expect(compSpy).toBeCalledTimes(1);
    expect(serviceSpy).toBeCalledTimes(1);
  })

})
