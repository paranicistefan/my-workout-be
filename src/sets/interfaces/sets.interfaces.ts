export interface ISetData {
  repetitions: number;
  weight: number;
  exercise?: { id: string };
}

export const intialSetState: ISetData = {
  repetitions: 0,
  weight: 0,
};
