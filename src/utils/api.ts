import {http} from '../services/http';
import { SignEntity } from './types';
import { MovieDetails } from './types';

export const signIn = (data: SignEntity.UserSignIn) => http.post('/api/login', data);
export const signOut = (data: SignEntity.UserSignUp) => http.post('/api/register', data);
export const addMovie = (data: MovieDetails) => http.post('/api/add_movie', data);
