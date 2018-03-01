import { bind } from 'decko';
import * as React from 'react';
import styled from 'styled-components';

import playfieldPath from './foosball-playfield.jpg';

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

  public componentDidMount(): void {
    this.playfield = new Image();
    this.playfield.onload = () => {
      this.forceUpdate();
    };
    this.playfield.src = playfieldPath;
  }

  public componentDidUpdate(): void {
    if (this.canvas && this.playfield && this.playfield.src) {
      const ctx = this.canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(
          this.playfield,
          0,
          0,
          this.props.width,
          this.props.height,
        );
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
