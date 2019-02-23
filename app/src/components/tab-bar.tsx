import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { theme, withTheme } from '../styled-components';
import { Icon, IconType } from './icon';
import { Space } from './space';
import { Text } from './text';
import { View } from './view';

const FlexedSpace = styled(Space)`
  display: flex;
  flex-direction: column;
`;

const Bar = styled(View)`
  display: flex;
  flex-direction: row;
  box-shadow: 3px 0 8px 0 rgba(7, 8, 9, 0.5);
  background-color: ${props =>
    props.theme ? props.theme.color.anthrazit : 'initial'};
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
  border-bottom: 4px solid transparent;
  text-align: center;
`;

export interface TabBarItemProps {
  title: string;
  to: string;
  icon: IconType;
  theme?: typeof theme;
}

export const TabBarItem = withTheme(
  class TabBarItem extends React.Component<TabBarItemProps> {
    public render(): JSX.Element {
      return (
        <Link
          to={this.props.to}
          exact
          activeStyle={{
            color: this.props.theme ? this.props.theme.color.green : 'inherit',
          }}
        >
          <Space inset="s">
            <FlexedSpace between="xxs">
              <Icon icon={this.props.icon} />
              <Text>{this.props.title}</Text>
            </FlexedSpace>
          </Space>
        </Link>
      );
    }
  }
);
