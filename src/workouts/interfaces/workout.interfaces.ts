import { ISetData } from 'src/sets/interfaces/sets.interfaces';

export interface IWorkoutExercise {
  id: string;
  name: string;
  sets: ISetData[];
}

export interface IWorkoutScheleton {
  programName: string;
  exercises: IWorkoutExercise[];
}

export interface IWorkoutResponse {
  id: string;
  createdAt: string;
  programName: string;
}
