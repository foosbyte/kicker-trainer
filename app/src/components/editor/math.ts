export class Vector {
  constructor(public readonly x: number, public readonly y: number) {}

  public add(that: Vector): Vector {
    return new Vector(this.x + that.x, this.y + that.y);
  }

  public mul(val: number | Matrix): Vector {
    if (typeof val === 'number') {
      return new Vector(this.x * val, this.y * val);
    }
    return new Vector(
      this.x * val.x0 + this.y * val.x1 + val.x2,
      this.x * val.y0 + this.y * val.y1 + val.y2
    );
  }

  get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public rotate(alpha: number): Vector {
    const rad = alpha * Math.PI / 180;
    const sin = Math.sin(rad);
    const cos = Math.cos(rad);
    return new Vector(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
  }
}

export class Matrix {
  public static readonly identity = new Matrix(1, 0, 0, 1, 0, 0);
  public static readonly rotate180 = new Matrix(
    Math.cos(Math.PI),
    Math.sin(Math.PI),
    -Math.sin(Math.PI),
    Math.cos(Math.PI),
    1 - Math.cos(Math.PI),
    1 - Math.cos(Math.PI)
  );

  public static translate(v: Vector): Matrix {
    return new Matrix(1, 0, 0, 1, v.x, v.y);
  }

  public static rotate(alpha: number): Matrix {
    const rad = alpha * Math.PI / 180;
    const sin = Math.sin(rad);
    const cos = Math.cos(rad);
    return new Matrix(cos, sin, -sin, cos, 1 - cos, 1 - cos);
  }

  constructor(
    public readonly x0: number,
    public readonly y0: number,
    public readonly x1: number,
    public readonly y1: number,
    public readonly x2: number,
    public readonly y2: number
  ) {}

  public translate(x: number, y: number): Matrix {
    return this.mul(Matrix.translate(new Vector(x, y)));
  }

  public rotate(alpha: number): Matrix {
    return this.mul(Matrix.rotate(alpha));
  }

  public mul(m: Matrix): Matrix {
    return new Matrix(
      m.x0 * this.x0 + m.x1 * this.y0,
      m.y0 * this.x0 + m.y1 * this.y0,
      m.x0 * this.x1 + m.x1 * this.y1,
      m.y0 * this.x1 + m.y1 * this.y1,
      m.x0 * this.x2 + m.x1 * this.y2 + m.x2,
      m.y0 * this.x2 + m.y1 * this.y2 + m.y2
    );
  }
}
