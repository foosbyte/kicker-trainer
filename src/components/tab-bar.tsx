import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { Text } from './text';
import { View } from './view';

const Bar = styled(View)`
  display: flex;
  flex-direction: row;
  background-color: #262626;
`;

export interface TabBarProps {
  barTintColor?: string;
}

export class TabBar extends React.PureComponent<TabBarProps> {
  public render(): JSX.Element {
    return <Bar>{this.props.children}</Bar>;
  }
}

const Link = styled(NavLink)`
  text-decoration: none;
  color: white;
  flex-grow: 1;
  padding: 12px;
  border-bottom: 4px none #8190a5;
`;

export interface TabBarItemProps {
  title: string;
  to: string;
}

export class TabBarItem extends React.Component<TabBarItemProps> {
  public render(): JSX.Element {
    return (
      <Link
        to={this.props.to}
        exact={true}
        activeStyle={{
          borderBottomStyle: 'solid',
        }}
      >
        <Text>{this.props.title}</Text>
      </Link>
    );
  }
}
