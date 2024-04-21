export const enum SquareState {
    UNSTAMPED = 0,
    STAMPED = 1,
}

export class SquareInfo {
  constructor(public readonly phrase : string, public state: SquareState) {

  }
}