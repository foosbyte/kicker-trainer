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
    const gtl = new Vector(-goalWidth / 2, 0).mul(mat);
    const gbl = new Vector(-goalWidth / 2, goalHeight).mul(mat);
    const gbr = new Vector(goalWidth / 2, goalHeight).mul(mat);
    const gtr = new Vector(goalWidth / 2, 0).mul(mat);
    ctx.moveTo(gtl.x, gtl.y);
    ctx.lineTo(gbl.x, gbl.y);
    ctx.lineTo(gbr.x, gbr.y);
    ctx.lineTo(gtr.x, gtr.y);

    // penalty box
    // width: 24 cm
    // height: 9,6 cm
    const ptl = new Vector(-penaltyWidth / 2, 0).mul(mat);
    const pbl = new Vector(-penaltyWidth / 2, penaltyHeight).mul(mat);
    const pbr = new Vector(penaltyWidth / 2, penaltyHeight).mul(mat);
    const ptr = new Vector(penaltyWidth / 2, 0).mul(mat);
    ctx.moveTo(ptl.x, ptl.y);
    ctx.lineTo(pbl.x, pbl.y);
    ctx.lineTo(pbr.x, pbr.y);
    ctx.lineTo(ptr.x, ptr.y);

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

    const leftSide = new Vector(-Editor.playfieldWidth / 2, 0).mul(mat);
    const leftEnd = new Vector(0 - radius, 0).mul(mat);
    ctx.moveTo(leftSide.x, leftSide.y);
    ctx.lineTo(leftEnd.x, leftEnd.y);

    const rightSide = new Vector(Editor.playfieldWidth / 2, 0).mul(mat);
    const rightEnd = new Vector(0 + radius, 0).mul(mat);
    ctx.moveTo(rightSide.x, rightSide.y);
    ctx.lineTo(rightEnd.x, rightEnd.y);

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

    // bottom 1 (offset 2,5cm)
    let left = new Vector(
      -Editor.playfieldWidth / 2,
      Editor.playfieldHeight / 2 - 25,
    ).mul(mat);
    let right = new Vector(
      Editor.playfieldWidth / 2,
      Editor.playfieldHeight / 2 - 25,
    ).mul(mat);
    ctx.moveTo(left.x, left.y);
    ctx.lineTo(right.x, right.y);

    // bottom 2 (offset 17,5cm)
    left = new Vector(
      -Editor.playfieldWidth / 2,
      Editor.playfieldHeight / 2 - 175,
    ).mul(mat);
    right = new Vector(
      Editor.playfieldWidth / 2,
      Editor.playfieldHeight / 2 - 175,
    ).mul(mat);
    ctx.moveTo(left.x, left.y);
    ctx.lineTo(right.x, right.y);

    // bottom 5 (offset 47,5cm)
    left = new Vector(
      -Editor.playfieldWidth / 2,
      Editor.playfieldHeight / 2 - 475,
    ).mul(mat);
    right = new Vector(
      Editor.playfieldWidth / 2,
      Editor.playfieldHeight / 2 - 475,
    ).mul(mat);
    ctx.moveTo(left.x, left.y);
    ctx.lineTo(right.x, right.y);

    // bottom 3 (offsete 77,5cm)
    left = new Vector(
      -Editor.playfieldWidth / 2,
      Editor.playfieldHeight / 2 - 775,
    ).mul(mat);
    right = new Vector(
      Editor.playfieldWidth / 2,
      Editor.playfieldHeight / 2 - 775,
    ).mul(mat);
    ctx.moveTo(left.x, left.y);
    ctx.lineTo(right.x, right.y);

    // top 1 (offset 2,5cm)
    left = new Vector(
      -Editor.playfieldWidth / 2,
      -Editor.playfieldHeight / 2 + 25,
    ).mul(mat);
    right = new Vector(
      Editor.playfieldWidth / 2,
      -Editor.playfieldHeight / 2 + 25,
    ).mul(mat);
    ctx.moveTo(left.x, left.y);
    ctx.lineTo(right.x, right.y);

    // top 2
    // top 5
    // top 3

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
