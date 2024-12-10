import { Component } from "@angular/core";
import { StoriesComponent } from "./stories/stories.component";
import { MatToolbar } from "@angular/material/toolbar";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [StoriesComponent, MatToolbar],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "news-inc";
}
