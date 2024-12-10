import { Component, inject } from "@angular/core";
import { StoriesService } from "../data/stories.service";
import { Story } from "../data/story";

@Component({
  selector: "app-stories",
  imports: [],
  templateUrl: "./stories.component.html",
  styleUrl: "./stories.component.css",
})
export class StoriesComponent {
  #storiesService = inject(StoriesService);

  loading = false;
  storyIds: number[] = [];
  stories: Story[] = [];

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;

    this.#storiesService.fetch().subscribe({
      next: (storyIds: number[]) => {
        this.storyIds = storyIds;
        this.#storiesService.fetchStories(this.storyIds).subscribe({
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
}
