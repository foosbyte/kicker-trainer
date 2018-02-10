import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Image } from './image';
import { View } from './view';

const CategoryWrapper = styled(View)`
  display: flex;
  flex-grow: 1;
`;

const ImageTitleStack = styled(View)`
  position: relative;
  width: 100%;
  min-height: 400px;
`;

const StyledLink = styled(Link)`
  display: block;
  width: 100%;
`;

export interface CategoryProps {
  to?: string;
  title: string;
  image: React.ReactElement<Image>;
}

export class Category extends React.PureComponent<CategoryProps> {
  public render(): JSX.Element {
    return (
      <CategoryWrapper>
        {this.withLink(
          <ImageTitleStack>
            {this.props.children}
            {this.props.image}
          </ImageTitleStack>,
        )}
      </CategoryWrapper>
    );
  }

  private withLink(component: React.ReactElement<any>): JSX.Element {
    if (!this.props.to) {
      return component;
    }
    return <StyledLink to={this.props.to}>{component}</StyledLink>;
  }
}
