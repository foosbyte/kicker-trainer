import { bind } from 'decko';
import * as React from 'react';
import styled from 'styled-components';

import { Matrix, Vector } from './math';

interface WrapperProps {
  width: number;
  height: number;
}

const Wrapper = styled.div`
  position: relative;
  padding-bottom: ${({ width, height }: WrapperProps) =>
    height / width * 100 + '%'};
  width: 100%;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export interface EditorProps {
  width: number;
  height: number;
}

function drawLine(
  ctx: CanvasRenderingContext2D,
  mat: Matrix,
  from: Vector,
  to: Vector,
): void {
  const dFrom = from.mul(mat);
  const dTo = to.mul(mat);
  ctx.moveTo(dFrom.x, dFrom.y);
  ctx.lineTo(dTo.x, dTo.y);
}

export class Editor extends React.PureComponent<EditorProps> {
  private static playfieldWidth = 680;
  private static playfieldHeight = 1115;

  private canvas?: HTMLCanvasElement | null;
  private ctx?: CanvasRenderingContext2D;

  public componentDidMount(): void {
    this.draw();
  }

  public componentDidUpdate(): void {
    this.draw();
  }

  private draw(): void {
    this.prepareContext();
    if (this.ctx) {
      const tableMatrix = Matrix.identity
        .rotate(90)
        .translate(Editor.playfieldHeight / 2, Editor.playfieldWidth / 2);
      this.drawTable(this.ctx, tableMatrix);
      this.drawBars(this.ctx, tableMatrix);
    }
  }

  private prepareContext(): void {
    if (this.canvas && !this.ctx) {
      const ctx = this.canvas.getContext('2d');
      if (ctx) {
        this.ctx = ctx;
      }
    }
  }

  private drawTable(ctx: CanvasRenderingContext2D, mat: Matrix): void {
    this.drawGrass(ctx, mat);
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#fff';
    ctx.beginPath();

    const goalTopMatrix = Matrix.identity
      .translate(0, -Editor.playfieldHeight / 2)
      .mul(mat);
    this.drawGoal(ctx, goalTopMatrix);

    this.drawHalfwayMarkers(ctx, mat);

    const goalBottomMatrix = Matrix.identity
      .rotate(180)
      .translate(0, Editor.playfieldHeight / 2)
      .mul(mat);
    this.drawGoal(ctx, goalBottomMatrix);

    ctx.stroke();
  }

  private drawGrass(ctx: CanvasRenderingContext2D, mat: Matrix): void {
    ctx.fillStyle = '#00c846';

    const leftTop = new Vector(
      -Editor.playfieldWidth / 2,
      -Editor.playfieldHeight / 2,
    ).mul(mat);
    const bottomRight = new Vector(
      Editor.playfieldWidth / 2,
      Editor.playfieldHeight / 2,
    ).mul(mat);

    ctx.fillRect(
      leftTop.x,
      leftTop.y,
      bottomRight.x - leftTop.x,
      bottomRight.y - leftTop.y,
    );
  }

  private drawGoal(ctx: CanvasRenderingContext2D, mat: Matrix): void {
    const goalWidth = 412;
    const goalHeight = 235;
    const penaltyWidth = 240;
    const penaltyHeight = 96;
    const circleWidth = 185;
    const circleHeight = 47;

    // goal box
    const gtl = new Vector(-goalWidth / 2, 0);
    const gbl = new Vector(-goalWidth / 2, goalHeight);
    const gbr = new Vector(goalWidth / 2, goalHeight);
    const gtr = new Vector(goalWidth / 2, 0);
    drawLine(ctx, mat, gtl, gbl);
    drawLine(ctx, mat, gbl, gbr);
    drawLine(ctx, mat, gbr, gtr);

    // penalty box
    // width: 24 cm
    // height: 9,6 cm
    const ptl = new Vector(-penaltyWidth / 2, 0);
    const pbl = new Vector(-penaltyWidth / 2, penaltyHeight);
    const pbr = new Vector(penaltyWidth / 2, penaltyHeight);
    const ptr = new Vector(penaltyWidth / 2, 0);
    drawLine(ctx, mat, ptl, pbl);
    drawLine(ctx, mat, pbl, pbr);
    drawLine(ctx, mat, pbr, ptr);

    // penalty circle
    // http://mathforum.org/library/drmath/view/55037.html
    const c1 = new Vector(-circleWidth / 2, goalHeight).mul(mat);
    const c2 = new Vector(circleWidth / 2, goalHeight).mul(mat);
    const cd = circleWidth / 2;
    const cr = (cd * cd + circleHeight * circleHeight) / (2 * circleHeight);
    const cc = new Vector(0, goalHeight - (cr - circleHeight)).mul(mat);
    const start = Math.atan2(c1.y - cc.y, c1.x - cc.x);
    const end = Math.atan2(c2.y - cc.y, c2.x - cc.x);
    ctx.moveTo(c1.x, c1.y);
    ctx.arc(cc.x, cc.y, cr, start, end, true);
  }

  private drawHalfwayMarkers(ctx: CanvasRenderingContext2D, mat: Matrix): void {
    const radius = 205 / 2;

    const leftSide = new Vector(-Editor.playfieldWidth / 2, 0);
    const leftEnd = new Vector(0 - radius, 0);
    drawLine(ctx, mat, leftSide, leftEnd);

    const rightSide = new Vector(Editor.playfieldWidth / 2, 0);
    const rightEnd = new Vector(0 + radius, 0);
    drawLine(ctx, mat, rightSide, rightEnd);

    const center = new Vector(0, 0).mul(mat);
    const start = new Vector(radius, 0).mul(mat);

    ctx.moveTo(start.x, start.y);
    const alpha = Math.atan2(mat.y0, mat.x0);
    ctx.arc(center.x, center.y, radius, alpha, alpha + 360 * Math.PI / 180);

    ctx.moveTo(center.x, center.y);
    ctx.arc(center.x, center.y, 5, 0, 360 * Math.PI / 180);
  }

  private drawBars(ctx: CanvasRenderingContext2D, mat: Matrix): void {
    ctx.lineWidth = 15;
    ctx.strokeStyle = 'silver';
    ctx.beginPath();

    const bars = [
      { players: 1, height: 25, maximumPullOut: 250, distanceBetween: 0 },
      { players: 2, height: 175, maximumPullOut: 0, distanceBetween: 210 },
      { players: 5, height: 475, maximumPullOut: 0, distanceBetween: 160 },
      { players: 3, height: 775, maximumPullOut: 0, distanceBetween: 98 },
    ];

    // bottom player
    bars.forEach(bar => {
      const left = new Vector(
        -Editor.playfieldWidth / 2,
        Editor.playfieldHeight / 2 - bar.height,
      );
      const right = new Vector(
        Editor.playfieldWidth / 2,
        Editor.playfieldHeight / 2 - bar.height,
      );
      drawLine(ctx, mat, left, right);
    });

    // top player
    bars.forEach(bar => {
      const left = new Vector(
        -Editor.playfieldWidth / 2,
        -Editor.playfieldHeight / 2 + bar.height,
      );
      const right = new Vector(
        Editor.playfieldWidth / 2,
        -Editor.playfieldHeight / 2 + bar.height,
      );
      drawLine(ctx, mat, left, right);
    });

    ctx.stroke();
  }

  public render(): JSX.Element {
    const { width, height } = this.props;
    return (
      <Wrapper width={width} height={height}>
        <Canvas innerRef={this.canvasRef} width={width} height={height} />
      </Wrapper>
    );
  }

  @bind
  private canvasRef(ref: HTMLCanvasElement | null): void {
    this.canvas = ref;
  }
}
