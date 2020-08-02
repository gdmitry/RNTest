export type ActionWithPayload<T> = {
  type: string;
  payload: T;
};

export type ActionWithoutPayload = {
  type: string;
};
