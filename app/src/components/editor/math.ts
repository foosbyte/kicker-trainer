export class Vector {
  public readonly x: number;
  public readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

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

  public dot(v: Vector): number {
    return this.x * v.x + this.y * v.y;
  }

  get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public rotate(alpha: number): Vector {
    const rad = (alpha * Math.PI) / 180;
    const sin = Math.sin(rad);
    const cos = Math.cos(rad);
    return new Vector(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
  }
}

export class Matrix {
  public static readonly identity = new Matrix(1, 0, 0, 0, 1, 0, 0, 0, 1);
  public static readonly rotate180 = new Matrix(
    Math.cos(Math.PI),
    Math.sin(Math.PI),
    0,
    -Math.sin(Math.PI),
    Math.cos(Math.PI),
    0,
    1 - Math.cos(Math.PI),
    1 - Math.cos(Math.PI),
    1
  );

  public static translate(v: Vector): Matrix {
    return new Matrix(1, 0, 0, 0, 1, 0, v.x, v.y, 1);
  }

  public static rotate(alpha: number): Matrix {
    const rad = (alpha * Math.PI) / 180;
    const sin = Math.sin(rad);
    const cos = Math.cos(rad);
    return new Matrix(cos, sin, 0, -sin, cos, 0, 1 - cos, 1 - cos, 1);
  }

  public static scale(v: Vector): Matrix {
    return new Matrix(v.x, 0, 0, 0, v.y, 0, 0, 0, 1);
  }

  constructor(
    public readonly x0: number,
    public readonly y0: number,
    public readonly z0: number,
    public readonly x1: number,
    public readonly y1: number,
    public readonly z1: number,
    public readonly x2: number,
    public readonly y2: number,
    public readonly z2: number
  ) {}

  public translate(x: number, y: number): Matrix {
    return this.mul(Matrix.translate(new Vector(x, y)));
  }

  public rotate(alpha: number): Matrix {
    return this.mul(Matrix.rotate(alpha));
  }

  public scale(factor: number): Matrix {
    return this.mul(Matrix.scale(new Vector(factor, factor)));
  }

  public mul(m: Matrix): Matrix {
    return new Matrix(
      m.x0 * this.x0 + m.x1 * this.y0 + m.x2 * this.z0,
      m.y0 * this.x0 + m.y1 * this.y0 + m.y2 * this.z0,
      m.z0 * this.x0 + m.z1 * this.y0 + m.z2 * this.z0,
      m.x0 * this.x1 + m.x1 * this.y1 + m.x2 * this.z1,
      m.y0 * this.x1 + m.y1 * this.y1 + m.y2 * this.z1,
      m.z0 * this.x1 + m.z1 * this.y1 + m.z2 * this.z1,
      m.x0 * this.x2 + m.x1 * this.y2 + m.x2 * this.z2,
      m.y0 * this.x2 + m.y1 * this.y2 + m.y2 * this.z2,
      m.z0 * this.x2 + m.z1 * this.y2 + m.z2 * this.z2
    );
  }
}

export function rad2deg(rad: number): number {
  return (rad / Math.PI) * 180;
}
