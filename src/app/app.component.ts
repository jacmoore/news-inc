import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { StoriesComponent } from "./stories/stories.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, StoriesComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "news-inc";
}
