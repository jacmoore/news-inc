import { TestBed } from "@angular/core/testing";

import { StoriesService } from "./stories.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { Story } from "./story";

describe("StoriesService", () => {
  let service: StoriesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StoriesService],
    });
    service = TestBed.inject(StoriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should fetch story ids", () => {
    const dummyStoryIds = [1, 2, 3];
    service.fetch("topstories").subscribe((ids) => {
      expect(ids.length).toBe(3);
      expect(ids).toEqual(dummyStoryIds);
    });

    const req = httpMock.expectOne(
      `${service.HACKER_NEWS_API_URL}/topstories.json`
    );
    expect(req.request.method).toBe("GET");
    req.flush(dummyStoryIds);
  });

  it("should fetch stories", () => {
    const dummyStoryIds = [1, 2, 3];
    const dummyStories: Story[] = [
      { id: 1, title: "Story 1" } as Story,
      { id: 2, title: "Story 2" } as Story,
      { id: 3, title: "Story 3" } as Story,
    ];

    service.fetchStories(dummyStoryIds, 3).subscribe((stories) => {
      expect(stories.length).toBe(3);
      expect(stories).toEqual(dummyStories);
    });

    dummyStoryIds.forEach((id) => {
      const req = httpMock.expectOne(
        `${service.HACKER_NEWS_API_URL}/item/${id}.json`
      );
      expect(req.request.method).toBe("GET");
      const story = dummyStories.find((story) => story.id === id);
      req.flush(story ? story : {});
    });
  });

  it("should increment page after fetching stories", () => {
    const dummyStoryIds = [1, 2, 3];
    service.fetchStories(dummyStoryIds, 3).subscribe();
    expect(service.page).toBe(1);
  });
});
