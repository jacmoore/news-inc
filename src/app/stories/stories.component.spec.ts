import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StoriesComponent } from "./stories.component";
import { provideHttpClient } from "@angular/common/http";
import { BreakpointObserver } from "@angular/cdk/layout";
import { of } from "rxjs";

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
  it("should set gridCols to 1 when Breakpoints.Handset matches", () => {
    const observe = jest
      .spyOn(breakpointObserver, "observe")
      .mockReturnValue(of({ matches: true, breakpoints: {} }));
    component.ngOnInit();
    expect(component.gridCols).toBe(1);
  });

  it("should set gridCols to 2 when Breakpoints.Handset matches", () => {
    const observe = jest
      .spyOn(breakpointObserver, "observe")
      .mockReturnValue(of({ matches: false, breakpoints: {} }));
    component.ngOnInit();
    expect(component.gridCols).toBe(2);
  });

  it("should call load with TOP_STORIES", () => {
    jest.spyOn(component, "load");
    component.ngOnInit();
    expect(component.load).toHaveBeenCalledWith(component.TOP_STORIES);
  });
});
