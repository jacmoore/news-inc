import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StoriesComponent } from "./stories.component";
import { provideHttpClient } from "@angular/common/http";
import { BreakpointObserver } from "@angular/cdk/layout";
import { of } from "rxjs";
import { MatButtonToggleChange } from "@angular/material/button-toggle";
import { PageEvent } from "@angular/material/paginator";

describe("StoriesComponent", () => {
  let component: StoriesComponent;
  let fixture: ComponentFixture<StoriesComponent>;
  let breakpointObserver: BreakpointObserver;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoriesComponent],
      providers: [provideHttpClient(), BreakpointObserver],
    }).compileComponents();

    fixture = TestBed.createComponent(StoriesComponent);
    component = fixture.componentInstance;
    breakpointObserver = TestBed.inject(BreakpointObserver);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should set gridCols to 4 by default", () => {
    const observe = jest
      .spyOn(breakpointObserver, "observe")
      .mockReturnValue(of({ matches: true, breakpoints: {} }));
    component.ngOnInit();
    expect(component.gridCols).toBe(4);
  });

  it("should call load with TOP_STORIES", () => {
    const page = 0;
    jest.spyOn(component, "load");
    component.ngOnInit();
    expect(component.load).toHaveBeenCalledWith(component.TOP_STORIES, page);
  });

  it("should extract domain from URL", () => {
    const url = "https://example.com/path";
    const domain = component.extractDomainFromUrl(url);
    expect(domain).toBe("example.com");
  });

  it("should handle invalid URL in extractDomainFromUrl", () => {
    const url = "invalid-url";
    const domain = component.extractDomainFromUrl(url);
    expect(domain).toBe("Url not available");
  });
  it("should toggle stories", () => {
    const event: MatButtonToggleChange = { value: "new" } as any;
    jest.spyOn(component, "load");
    component.toggleStories(event);
    expect(component.topStories).toBe(false);
    expect(component.load).toHaveBeenCalledWith(
      component.NEW_STORIES,
      component.page
    );
  });

  it("should handle page event", () => {
    const event: PageEvent = { pageIndex: 1, pageSize: 12, length: 100 };
    jest.spyOn(component, "load");
    component.onPage(event);
    expect(component.page).toBe(event.pageIndex);
    expect(component.load).toHaveBeenCalledWith(
      component.TOP_STORIES,
      event.pageIndex
    );
  });
});
