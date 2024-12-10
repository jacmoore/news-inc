import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";

describe("The app componenet", function () {
  it("should have a RouterOutlet", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("router-outlet")).not.toBeNull();
  });

  it("should have a title property", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toBeDefined();
  });

  it("should have the correct title", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toBe("news-inc");
  });
});
