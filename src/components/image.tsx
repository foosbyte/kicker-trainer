import * as React from 'react';
import styled from 'styled-components';

interface WrapperProps {
  width: number;
  height: number;
}

const Wrapper = styled.div`
  position: relative;
  padding-bottom: ${({ width, height }: WrapperProps) =>
    height / width * 100 + '%'};
`;

const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export interface ImageProps extends React.CSSProperties {
  source: string;
  width: number;
  height: number;
}

export class Image extends React.PureComponent<ImageProps> {
  public render(): JSX.Element {
    const { width, height, source, ...props } = this.props;
    return (
      <Wrapper width={width} height={height} {...props}>
        <Img src={source} />
      </Wrapper>
    );
  }
}
