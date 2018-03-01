import { bind } from 'decko';
import * as React from 'react';
import styled from 'styled-components';

import playfieldPath from './foosball-playfield.jpg';
import rod2Path from './rod2.png';

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
  private canvas?: HTMLCanvasElement | null;
  private playfield?: HTMLImageElement;
  private rod2?: HTMLImageElement;

  public componentDidMount(): void {
    this.playfield = this.loadImage(playfieldPath);
    this.rod2 = this.loadImage(rod2Path);
  }

  private loadImage(path: string): HTMLImageElement {
    const image = new Image();
    image.onload = () => {
      this.forceUpdate();
    };
    image.src = path;
    return image;
  }

  public componentDidUpdate(): void {
    if (this.canvas && this.playfield) {
      const ctx = this.canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(
          this.playfield!,
          0,
          0,
          this.props.width,
          this.props.height,
        );
        // 1
        ctx.drawImage(this.rod2!, -5, 35, 40, this.props.height);
        // 2
        ctx.drawImage(this.rod2!, 5, 0, 40, this.props.height);
        // 3
        ctx.drawImage(this.rod2!, 50, 0, 40, this.props.height);
        // 5
        ctx.drawImage(this.rod2!, 90, 0, 40, this.props.height);
        // 5
        ctx.drawImage(this.rod2!, 150, 0, 40, this.props.height);
        // 3
        ctx.drawImage(this.rod2!, 190, 0, 40, this.props.height);
        // 2
        ctx.drawImage(this.rod2!, 253, 0, 40, this.props.height);
        // 1
        ctx.drawImage(this.rod2!, 270, 35, 40, this.props.height);
      }
    }
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
