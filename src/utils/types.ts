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
  rate: number;
  year: number;
  runtime: number;
  genre: string;
  country: string;
  images: string;
}
