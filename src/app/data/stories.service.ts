import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StoriesService {
  #http = inject(HttpClient);

  find(): Observable<number[]> {
    return this.#http.get<number[]>(
      `https://hacker-news.firebaseio.com/v0/topstories.json`
    );
  }
}
