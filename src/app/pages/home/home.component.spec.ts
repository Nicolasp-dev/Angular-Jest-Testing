import { BookService } from './../../services/book.service';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component"
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Book } from 'src/app/models/book.model';
import { of } from 'rxjs';

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

const bookServiceMock = {
  getBooks: () => of(listBook)
}

@Pipe({
  name: 'reduceText'
})
class ReducePipeMock implements PipeTransform {
  transform(): string {
      return ''
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        ReducePipeMock
      ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: BookService,
          useValue: bookServiceMock
        }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should get books from subscription', () => {
    const bookService = fixture.debugElement.injector.get(BookService);
    const spy = jest.spyOn(bookService, 'getBooks').mockReturnValueOnce(of(listBook));

    component.getBooks();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(component.listBook.length).toBeGreaterThan(0);
  })
})
