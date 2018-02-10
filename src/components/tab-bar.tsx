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
  border-bottom: 4px solid transparent;
  text-align: center;
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
        exact
        activeStyle={{
          borderBottomColor: '#8190a5',
        }}
      >
        <Text>{this.props.title}</Text>
      </Link>
    );
  }
}
