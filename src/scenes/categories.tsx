import * as React from 'react';
import styled from 'styled-components';

import { Category } from '../components/category';
import { Image } from '../components/image';
import { View } from '../components/view';

const CategoriesWrapper = styled(View)`
  /* display: flex;
  flex-grow: 1;
  flex-direction: column; */
`;

export class Categories extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <CategoriesWrapper>
        <Category
          title="Create workout"
          image={this.getImage('https://dummyimage.com/320x148/755175/cacbdb')}
        />
        <Category
          to="/exercises/5-bar"
          title="5 Bar Excercises"
          image={this.getImage('https://dummyimage.com/320x148/755175/cacbdb')}
        />
        <Category
          to="/exercises/2-bar"
          title="2 Bar Excercises"
          image={this.getImage('https://dummyimage.com/320x148/755175/cacbdb')}
        />
        <Category
          to="/exercises/3-bar"
          title="3 Bar Excercises"
          image={this.getImage('https://dummyimage.com/320x148/755175/cacbdb')}
        />
      </CategoriesWrapper>
    );
  }

  private getImage(source: string): JSX.Element {
    return <Image source={source} width={320} height={148} />;
  }
}
