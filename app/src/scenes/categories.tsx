import * as React from 'react';

import { Category } from '../components/category';
import { Image } from '../components/image';
import { Space } from '../components/space';

export class Categories extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <Space between="s">
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
      </Space>
    );
  }

  private getImage(source: string): JSX.Element {
    return <Image source={source} width={320} height={148} />;
  }
}
