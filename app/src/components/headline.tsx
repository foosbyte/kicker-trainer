import * as React from 'react';
import styled from 'styled-components';
import { Text } from './text';

const HeadlineText = styled(Text)`
  font-size: 22px;
  font-weight: bold;
  color: ${(props: HeadlineProps) => (props.darkBackground ? '#fff' : '#000')};
`;

export interface HeadlineProps {
  className?: string;
  darkBackground?: boolean;
}

export class Headline extends React.Component<HeadlineProps> {
  public render(): JSX.Element {
    return (
      <HeadlineText
        className={this.props.className}
        darkBackground={this.props.darkBackground}
      >
        {this.props.children}
      </HeadlineText>
    );
  }
}
