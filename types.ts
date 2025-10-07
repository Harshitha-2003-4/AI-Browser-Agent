export interface Chapter {
  title: string;
}

export interface Course {
  title: string;
  url: string;
  chapters: Chapter[];
}

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface SearchResult {
    courses: Course[];
    sources: GroundingSource[];
}