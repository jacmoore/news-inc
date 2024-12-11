import { Component, inject } from "@angular/core";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonToggleChange } from "@angular/material/button-toggle";
import { MatButtonToggleModule } from "@angular/material/button-toggle";

import { StoriesService } from "../data/stories.service";
import { Story } from "../data/story";
import { TimeDifferencePipe } from "../shared/time-difference.pipe";

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
  #breakpointObserver = inject(BreakpointObserver);

  NEW_STORIES = "newstories";
  TOP_STORIES = "topstories";
  PAGE_SIZE = 12;

  gridCols = 4;
  page = 0;
  rowheight = "250px";
  loading = false;
  storyIds: number[] = [];
  stories: Story[] = [];
  topStories = true;
  constructor() {
    this.#breakpointObserver
      .observe([
        Breakpoints.HandsetPortrait,
        Breakpoints.TabletPortrait,
        Breakpoints.WebPortrait,
        Breakpoints.TabletLandscape,
      ])
      .subscribe(({ breakpoints }) => {
        if (breakpoints[Breakpoints.HandsetPortrait]) {
          this.gridCols = 1;
        } else if (breakpoints[Breakpoints.TabletPortrait]) {
          this.gridCols = 2;
        } else {
          this.gridCols = 4;
        }
      });
  }

  ngOnInit(): void {
    this.load(this.TOP_STORIES, this.page);
  }

  load(storyType: string, page: number): void {
    this.loading = true;

    this.#storiesService.fetch(storyType).subscribe({
      next: (storyIds: number[]) => {
        this.storyIds = storyIds;
        this.#storiesService
          .fetchStories(this.storyIds, this.PAGE_SIZE, page)
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

  onPage(event: PageEvent): void {
    this.page = event.pageIndex;
    this.topStories
      ? this.load(this.TOP_STORIES, this.page)
      : this.load(this.NEW_STORIES, this.page);
  }
  extractDomainFromUrl(url: string): string {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname;
    } catch (e) {
      return "Url not available";
    }
  }
  toggleStories(event: MatButtonToggleChange) {
    if (event.value === "top") {
      this.topStories = true;
      this.load(this.TOP_STORIES, this.page);
    } else {
      this.topStories = false;
      this.load(this.NEW_STORIES, this.page);
    }
  }
}
