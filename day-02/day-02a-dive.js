const submarine = (start_X = 0, start_Y = 0) => { 
  let X = start_X;
  let Y = start_Y;
  return {
    get X() { return X; },
    get Y() { return Y; },
    forward: (units) => X += units,
    down: (units) => Y += units,
    up: (units) => Y -= units,
    reset: () => {
      this.X = start_X;
      this.Y = start_Y;
    }
  }
}

export { submarine }