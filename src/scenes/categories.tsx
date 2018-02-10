import * as React from 'react';
import styled from 'styled-components';

import { View } from '../components/view';

const CategoriesWrapper = styled(View)`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const Category = styled(View)`
  flex-grow: 1;
`;

export class Categories extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <CategoriesWrapper>
        <Category>Create workout</Category>
        <Category>5 Bar Excercises</Category>
        <Category>2 Bar Excercises</Category>
        <Category>3 Bar Excercises</Category>
      </CategoriesWrapper>
    );
  }
}
