export namespace SignEntity {
    export interface UserSignIn {
      username: string;
      password: string;
    }
    export interface UserSignUp {
      username: string;
      password: string;
    }
}
export interface MovieDetails {
  id: number;
  title: string;
  description: string;
  rate: string;
  year: string;
  runtime: string;
  genre: string;
  country: string;
  images: string;
  video: string;
}
