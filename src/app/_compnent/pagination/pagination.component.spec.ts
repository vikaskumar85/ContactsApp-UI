import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test case 1: Component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test case 2: ngOnChanges should set page when items array changes
  it('should set page when items array changes', () => {
    const setPageSpy = spyOn(component, 'setPage').and.callThrough();
    component.items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    component.initialPage = 2;
    component.ngOnChanges({
      items: { currentValue: component.items, previousValue: [] } as any
    });
    expect(setPageSpy).toHaveBeenCalledWith(component.initialPage);
  });

  // Test case 3: setPage should update pager and emit page of items
  it('should update pager and emit page of items on setPage', () => {
    component.items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    component.pageSize = 2;
    component.maxPages = 5;

    spyOn(component.changePage, 'emit');
    const expectedPager = {
      totalItems: 10,
      currentPage: 2,
      pageSize: 2,
      totalPages: 5,
      startPage: 1,
      endPage: 5,
      startIndex: 2,
      endIndex: 3,
      pages: [1, 2, 3, 4, 5]
    };

    component.setPage(2);
    expect(component.pager).toEqual(expectedPager);
    expect(component.changePage.emit).toHaveBeenCalledWith([3, 4]);
  });

  // Test case 4: paginate should return correct pager object
  it('should return correct pager object from paginate', () => {
    const totalItems = 15;
    const pageSize = 5;
    const maxPages = 5;

    const pager = component.paginate(totalItems, 3, pageSize, maxPages);
    expect(pager.totalItems).toBe(totalItems);
    expect(pager.currentPage).toBe(3);
    expect(pager.pageSize).toBe(pageSize);
    expect(pager.totalPages).toBe(3);
    expect(pager.startPage).toBe(1);
    expect(pager.endPage).toBe(3);
    expect(pager.startIndex).toBe(10);
    expect(pager.endIndex).toBe(14);
    expect(pager.pages).toEqual([1, 2, 3]);
  });

  // Test case 5: paginate should handle case where current page is greater than total pages
  it('should handle case where current page is greater than total pages in paginate', () => {
    const totalItems = 15;
    const pageSize = 5;
    const maxPages = 5;

    const pager = component.paginate(totalItems, 4, pageSize, maxPages);
    expect(pager.totalItems).toBe(totalItems);
    expect(pager.currentPage).toBe(3); // Should adjust to the last available page
    expect(pager.pageSize).toBe(pageSize);
    expect(pager.totalPages).toBe(3);
    expect(pager.startPage).toBe(1);
    expect(pager.endPage).toBe(3);
    expect(pager.startIndex).toBe(10);
    expect(pager.endIndex).toBe(14);
    expect(pager.pages).toEqual([1, 2, 3]);
  });

  // Test case 6: paginate should handle case where current page is less than 1
  it('should handle case where current page is less than 1 in paginate', () => {
    const totalItems = 15;
    const pageSize = 5;
    const maxPages = 5;

    const pager = component.paginate(totalItems, -1, pageSize, maxPages);
    expect(pager.totalItems).toBe(totalItems);
    expect(pager.currentPage).toBe(1); // Should adjust to the first available page
    expect(pager.pageSize).toBe(pageSize);
    expect(pager.totalPages).toBe(3);
    expect(pager.startPage).toBe(1);
    expect(pager.endPage).toBe(3);
    expect(pager.startIndex).toBe(0);
    expect(pager.endIndex).toBe(4);
    expect(pager.pages).toEqual([1, 2, 3]);
  });

});
