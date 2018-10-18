import * as React from 'react';
import styled from 'styled-components';
import { Icon } from './icon';

const AvatarContainer = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 35vw;
  border-radius: 50%;
  background-color: ${props => props.theme.color.anthrazit};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledIcon = styled(Icon)`
  font-size: 42px;
  color: white;
`;

export interface AvatarProps {
  className?: string;
  size: 'normal';
}

export class Avatar extends React.PureComponent<AvatarProps> {
  public render(): JSX.Element {
    return (
      <AvatarContainer className={this.props.className}>
        <AvatarSVG />
      </AvatarContainer>
    );
  }
}

class AvatarSVG extends React.Component {
  public render(): JSX.Element {
    return <StyledIcon icon="user" />;
  }
}
