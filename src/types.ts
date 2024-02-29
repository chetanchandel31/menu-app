export type TypeSetStateFunction<TypeState> = React.Dispatch<
  React.SetStateAction<TypeState>
>;

export type TypeHeaderNavItem = { name: string; path: string };

export type TypeResult<T> =
  | { isSuccess: true; result: T }
  | { isSuccess: false; errorMessages: string[]; details?: any };
