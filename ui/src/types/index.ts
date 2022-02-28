export interface IHawkFormData {
  name: string;
  size: "SMALL" | "MEDIUM" | "LARGE";
  gender: "MALE" | "FEMALE";
  length: number[];
  wingspan: number[];
  weight: number[];
  pictureUrl: string;
  colorDescription: string;
  behaviorDescription: string;
  habitatDescription: string;
}

export type HawkData = Omit<IHawkFormData, "length" | "wingspan" | "weight"> & {
  id?: string;
  lengthBegin: number;
  lengthEnd: number;
  wingspanBegin: number;
  wingspanEnd: number;
  weightEnd: number;
  weightBegin: number;
};
