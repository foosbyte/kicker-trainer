import { bind } from 'decko';
import * as React from 'react';
import styled from 'styled-components';

import { Matrix, Vector } from './math';

function drawLine(
  ctx: CanvasRenderingContext2D,
  mat: Matrix,
  from: Vector,
  to: Vector
): void {
  const dFrom = from.mul(mat);
  const dTo = to.mul(mat);
  ctx.beginPath();
  ctx.moveTo(dFrom.x, dFrom.y);
  ctx.lineTo(dTo.x, dTo.y);
  ctx.stroke();
}

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
  blueBars: {
    1: number;
    2: number;
    5: number;
    3: number;
  };
  redBars: {
    1: number;
    2: number;
    5: number;
    3: number;
  };
}

export class Editor extends React.PureComponent<EditorProps> {
  private static playfieldWidth = 680;
  private static playfieldHeight = 1115;

  private canvas?: HTMLCanvasElement | null;
  private ctx!: CanvasRenderingContext2D;
  private renderMatrix!: Matrix;

  public componentDidMount(): void {
    this.draw();
  }

  public componentDidUpdate(): void {
    this.draw();
  }

  private draw(): void {
    if (this.canvas && !this.ctx) {
      const ctx = this.canvas.getContext('2d');
      if (ctx) {
        this.ctx = ctx;
      }
    }
    if (this.ctx) {
      this.renderMatrix = Matrix.identity
        .rotate(90)
        .translate(Editor.playfieldHeight / 2, Editor.playfieldWidth / 2);
      this.drawTable();
      this.drawBars();
    }
  }

  private drawTable(): void {
    this.drawGrass();
    this.ctx.lineWidth = 8;
    this.ctx.strokeStyle = '#fff';
    this.ctx.lineCap = 'square';
    this.ctx.beginPath();

    const goalTopMatrix = Matrix.identity.translate(
      0,
      -Editor.playfieldHeight / 2
    );
    this.drawGoal(goalTopMatrix);

    this.drawHalfwayMarkers();

    const goalBottomMatrix = Matrix.identity
      .rotate(180)
      .translate(0, Editor.playfieldHeight / 2);
    this.drawGoal(goalBottomMatrix);

    this.ctx.stroke();
  }

  private drawGrass(): void {
    this.ctx.fillStyle = '#00c846';

    const leftTop = new Vector(
      -Editor.playfieldWidth / 2,
      -Editor.playfieldHeight / 2
    ).mul(this.renderMatrix);
    const bottomRight = new Vector(
      Editor.playfieldWidth / 2,
      Editor.playfieldHeight / 2
    ).mul(this.renderMatrix);

    this.ctx.fillRect(
      leftTop.x,
      leftTop.y,
      bottomRight.x - leftTop.x,
      bottomRight.y - leftTop.y
    );
  }

  private drawGoal(goalMatrix: Matrix): void {
    const goalWidth = 412;
    const goalHeight = 235;
    const penaltyWidth = 240;
    const penaltyHeight = 96;
    const circleWidth = 185;
    const circleHeight = 47;

    const mat = goalMatrix.mul(this.renderMatrix);

    // goal box
    const gtl = new Vector(-goalWidth / 2, 0);
    const gbl = new Vector(-goalWidth / 2, goalHeight);
    const gbr = new Vector(goalWidth / 2, goalHeight);
    const gtr = new Vector(goalWidth / 2, 0);
    drawLine(this.ctx, mat, gtl, gbl);
    drawLine(this.ctx, mat, gbl, gbr);
    drawLine(this.ctx, mat, gbr, gtr);

    // penalty box
    // width: 24 cm
    // height: 9,6 cm
    const ptl = new Vector(-penaltyWidth / 2, 0);
    const pbl = new Vector(-penaltyWidth / 2, penaltyHeight);
    const pbr = new Vector(penaltyWidth / 2, penaltyHeight);
    const ptr = new Vector(penaltyWidth / 2, 0);
    drawLine(this.ctx, mat, ptl, pbl);
    drawLine(this.ctx, mat, pbl, pbr);
    drawLine(this.ctx, mat, pbr, ptr);

    // penalty circle
    // http://mathforum.org/library/drmath/view/55037.html
    const c1 = new Vector(-circleWidth / 2, goalHeight).mul(mat);
    const c2 = new Vector(circleWidth / 2, goalHeight).mul(mat);
    const cd = circleWidth / 2;
    const cr = (cd * cd + circleHeight * circleHeight) / (2 * circleHeight);
    const cc = new Vector(0, goalHeight - (cr - circleHeight)).mul(mat);
    const start = Math.atan2(c1.y - cc.y, c1.x - cc.x);
    const end = Math.atan2(c2.y - cc.y, c2.x - cc.x);
    this.ctx.beginPath();
    this.ctx.moveTo(c1.x, c1.y);
    this.ctx.arc(cc.x, cc.y, cr, start, end, true);
    this.ctx.stroke();
  }

  private drawHalfwayMarkers(): void {
    const radius = 205 / 2;

    const leftSide = new Vector(-Editor.playfieldWidth / 2, 0);
    const leftEnd = new Vector(0 - radius, 0);
    drawLine(this.ctx, this.renderMatrix, leftSide, leftEnd);

    const rightSide = new Vector(Editor.playfieldWidth / 2, 0);
    const rightEnd = new Vector(0 + radius, 0);
    drawLine(this.ctx, this.renderMatrix, rightSide, rightEnd);

    const center = new Vector(0, 0).mul(this.renderMatrix);
    const start = new Vector(radius, 0).mul(this.renderMatrix);

    this.ctx.beginPath();
    this.ctx.moveTo(start.x, start.y);
    const alpha = Math.atan2(this.renderMatrix.y0, this.renderMatrix.x0);
    this.ctx.arc(
      center.x,
      center.y,
      radius,
      alpha,
      alpha + 360 * Math.PI / 180
    );

    this.ctx.moveTo(center.x, center.y);
    this.ctx.arc(center.x, center.y, 5, 0, 360 * Math.PI / 180);
    this.ctx.stroke();
  }

  private drawBars(): void {
    const playerWidth = 23;
    const bars = [
      { players: 1, height: 25, offset: 240, distanceBetween: 0, max: 0 },
      { players: 2, height: 175, offset: 0, distanceBetween: 210, max: 0 },
      { players: 5, height: 475, offset: 0, distanceBetween: 98, max: 0 },
      { players: 3, height: 775, offset: 0, distanceBetween: 160, max: 0 },
    ];
    bars.forEach(bar => {
      bar.max =
        Editor.playfieldWidth -
        bar.offset * 2 -
        (bar.players * playerWidth + (bar.players - 1) * bar.distanceBetween);
    });

    this.ctx.lineWidth = 15;
    this.ctx.strokeStyle = 'silver';
    this.ctx.beginPath();

    // blue player
    bars.forEach(bar => {
      const left = new Vector(
        -Editor.playfieldWidth / 2,
        Editor.playfieldHeight / 2 - bar.height
      );
      const right = new Vector(
        Editor.playfieldWidth / 2,
        Editor.playfieldHeight / 2 - bar.height
      );
      drawLine(this.ctx, this.renderMatrix, left, right);

      const propsPosition = this.props.blueBars[bar.players as 1 | 2 | 5 | 3];
      const barPosition =
        bar.offset + bar.max / 2 + bar.max / 2 * (propsPosition / 100);

      this.drawPlayers(
        left,
        bar.players,
        barPosition,
        bar.distanceBetween,
        playerWidth,
        '#00f'
      );
    });

    // red player
    bars.forEach(bar => {
      const left = new Vector(
        -Editor.playfieldWidth / 2,
        -Editor.playfieldHeight / 2 + bar.height
      );
      const right = new Vector(
        Editor.playfieldWidth / 2,
        -Editor.playfieldHeight / 2 + bar.height
      );
      drawLine(this.ctx, this.renderMatrix, left, right);

      const propsPosition = Math.max(
        -100,
        Math.min(this.props.blueBars[bar.players as 1 | 2 | 5 | 3], 100)
      );
      const barPosition =
        bar.offset + bar.max / 2 + bar.max / 2 * (propsPosition / 100);

      this.drawPlayers(
        left,
        bar.players,
        barPosition,
        bar.distanceBetween,
        playerWidth,
        '#f00'
      );
    });

    this.ctx.stroke();
  }

  private drawPlayers(
    left: Vector,
    players: number,
    maximumPullOut: number,
    distanceBetween: number,
    playerWidth: number,
    color: string
  ): void {
    this.ctx.save();
    this.ctx.fillStyle = color;

    let position = left.add(new Vector(maximumPullOut, 20));
    for (let i = 0; i < players; i++) {
      this.drawPlayer(position, playerWidth);
      position = position.add(new Vector(playerWidth + distanceBetween, 0));
    }

    this.ctx.restore();
  }

  private drawPlayer(position: Vector, width: number): void {
    const dPosition = position.mul(this.renderMatrix);

    this.ctx.beginPath();
    this.ctx.fillRect(dPosition.x, dPosition.y, 45, width);
    this.ctx.stroke();
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
