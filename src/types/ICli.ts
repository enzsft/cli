export interface ICli {
  start: (argv: string[]) => Promise<void>;
}
