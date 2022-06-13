export interface Vote {
  voted_for: string;
  voted_by: string;
}

export interface Votes {
  [key: string]: number;
}
