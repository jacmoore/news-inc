import { Component, inject } from "@angular/core";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { AsyncPipe } from "@angular/common";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatToolbar, MatToolbarModule } from "@angular/material/toolbar";
import {
  MatButtonToggle,
  MatButtonToggleChange,
} from "@angular/material/button-toggle";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { map } from "rxjs/operators";

import { StoriesService } from "../data/stories.service";
import { Story } from "../data/story";
import { TimeDifferencePipe } from "../shared/time-difference.pipe";
import { FormControl } from "@angular/forms";
import { isElementAccessExpression } from "typescript";

@Component({
  selector: "app-stories",
  templateUrl: "./stories.component.html",
  styleUrl: "./stories.component.css",
  standalone: true,
  imports: [
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatToolbarModule,
    TimeDifferencePipe,
    MatButtonToggleModule,
  ],
})
export class StoriesComponent {
  #storiesService = inject(StoriesService);
  private breakpointObserver = inject(BreakpointObserver);

  fontStyleControl = new FormControl("");
  fontStyle?: string;
  gridCols = 4;
  PAGE_SIZE = 12;
  NEW_STORIES = "newstories";
  TOP_STORIES = "topstories";
  loading = false;
  storyIds: number[] = [];
  stories: Story[] = [];
  topStories = true;

  ngOnInit(): void {
    this.breakpointObserver
      .observe(Breakpoints.Handset)
      .subscribe(({ matches }) => {
        if (matches) {
          this.gridCols = 1;
        } else {
          this.gridCols = 2;
        }
      });
    this.load(this.TOP_STORIES);
  }

  load(storyType: string): void {
    this.loading = true;

    this.#storiesService.fetch(storyType).subscribe({
      next: (storyIds: number[]) => {
        this.storyIds = storyIds;
        this.#storiesService
          .fetchStories(this.storyIds, this.PAGE_SIZE)
          .subscribe({
            next: (stories: Story[]) => {
              this.stories = stories;
              this.loading = false;
            },
            error: (error) => {
              console.error(error);
              this.loading = false;
            },
          });
      },
      error: (error) => {
        this.loading = false;
        console.error(error);
      },
    });
  }
  extractDomainFromUrl(url: string): string {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname;
    } catch (e) {
      console.error("Invalid URL:", e);
      return "No url available";
    }
  }
  toggleStories(event: MatButtonToggleChange) {
    if (event.value === "top") {
      this.topStories = true;
      this.load(this.TOP_STORIES);
    } else {
      this.topStories = false;
      this.load(this.NEW_STORIES);
    }
  }
}
