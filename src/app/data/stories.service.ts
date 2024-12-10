import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { first, forkJoin, Observable, tap } from "rxjs";
import { Story } from "./story";

@Injectable({
  providedIn: "root",
})
export class StoriesService {
  #http = inject(HttpClient);

  allStoryIds: number[] = [];
  stories: Story[] = [];
  fetchingStoryDetails = false;
  page = 0;

  PAGE_SIZE = 10;
  HACKER_NEWS_API_URL = "https://hacker-news.firebaseio.com/v0";

  fetch(storyType: string): Observable<number[]> {
    return this.#http
      .get<number[]>(`${this.HACKER_NEWS_API_URL}/${storyType}.json`)
      .pipe(first());
  }

  fetchStories(storyIds: number[], pageSize: number): Observable<Story[]> {
    const ids = this.getStoryIdsForCurrentPage(storyIds, pageSize);
    this.setFetchingStoryDetails(true);

    return this.fetchStoryDetails(ids).pipe(
      tap(() => {
        this.setFetchingStoryDetails(false);
        this.incrementPage();
      })
    );
  }

  private getStoryIdsForCurrentPage(
    storyIds: number[],
    pageSize: number
  ): number[] {
    const start = this.page * pageSize;
    const end = start + pageSize;
    return storyIds.slice(start, end);
  }

  private setFetchingStoryDetails(value: boolean): void {
    this.fetchingStoryDetails = value;
  }

  private fetchStoryDetails(ids: number[]): Observable<Story[]> {
    return forkJoin(
      ids.map((id: number) =>
        this.#http.get<Story>(`${this.HACKER_NEWS_API_URL}/item/${id}.json`)
      )
    ).pipe(first());
  }

  private incrementPage(): void {
    this.page++;
  }
}
