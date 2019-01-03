import * as React from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '../components/icon';
import styled, { theme } from '../styled-components';

export interface WrapperProps {
  theme: typeof theme;
  inverted: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px 10px;
  border-radius: 4px;
  border: ${({ inverted, theme }: WrapperProps) =>
    inverted ? `2px dotted ${theme.color.green}` : 'none'};
  background: ${({ inverted, theme }: WrapperProps) =>
    inverted
      ? 'transparent'
      : `linear-gradient(90deg, #46eda9 0%, ${theme.color.green} 100%)`};
  box-shadow: 0 2px 8px 0 ${props => props.theme.color.black};
`;

export interface TitleProps {
  theme: typeof theme;
  inverted: boolean;
}

const Title = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 26px;
  font-weight: 600;
  color: ${({ inverted, theme }: TitleProps) =>
    inverted ? theme.color.green : theme.color.black};
`;

const SubTitle = styled.span`
  font-size: 13px;
  color: ${props => props.theme.color.black};
`;

const StyledLink = styled(Link)`
  display: block;
  width: 100%;
`;

export interface CategoryProps {
  to?: string;
  title: string;
  subtitle?: string;
  inverted: boolean;
}

export class Category extends React.PureComponent<CategoryProps> {
  public static defaultProps = {
    inverted: false,
  };

  public render(): JSX.Element {
    const component = (
      <Wrapper inverted={this.props.inverted}>
        <Title inverted={this.props.inverted}>
          {this.props.title}
          <Icon icon="arrow-right" />
        </Title>
        {this.props.subtitle && <SubTitle>{this.props.subtitle}</SubTitle>}
      </Wrapper>
    );

    return this.props.to ? (
      <StyledLink to={this.props.to}>{component}</StyledLink>
    ) : (
      component
    );
  }
}

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

const CategoryList = styled.div`
  display: grid;
  grid-auto-rows: 1fr;
  grid-row-gap: 10px;
  padding: 10px;
`;

export class Categories extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <CategoryWrapper>
        <CategoryList>
          <Category to="/exercises/3bar" title="3 Bar Exercises" />
          <Category to="/exercises/5bar" title="5 Bar Exercises" />
          <Category to="/exercises/2bar" title="2 Bar Exercises" />
          <Category to="/exercises/1bar" title="1 Bar Exercises" />
          <Category title="Create workout" inverted={true} />
        </CategoryList>
      </CategoryWrapper>
    );
  }
}
