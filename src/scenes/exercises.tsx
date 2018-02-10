import * as React from 'react';
import styled from 'styled-components';

import { Category } from '../components/category';
import { Image } from '../components/image';
import { ScrollContainer } from '../components/scroll-container';
import { Text } from '../components/text';
import { View } from '../components/view';

const ExerciseWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ExerciseImage = styled(View)`
  width: 180px;
`;

interface ExerciseProps {
  name: string;
  cover: string;
}

class Exercise extends React.PureComponent<ExerciseProps> {
  public render(): JSX.Element {
    return (
      <ExerciseWrapper>
        <Text>{this.props.name}</Text>
        <ExerciseImage>
          <Image source={this.props.cover} width={180} height={90} />
        </ExerciseImage>
      </ExerciseWrapper>
    );
  }
}

export interface ExercisesProps {
  match?: {
    params?: {
      category?: string;
    };
  };
}

export class Exercises extends React.PureComponent<ExercisesProps> {
  public render(): JSX.Element {
    // const { match = {} } = this.props;
    // const { params = {} } = match;
    // const { category = '' } = params;

    return (
      <ScrollContainer>
        <Category
          title="5 Bar Excercises"
          image={
            <Image
              source="https://dummyimage.com/320x148/000/fff"
              width={320}
              height={148}
            />
          }
        />
        <Exercise
          name="Brush oben"
          cover="https://dummyimage.com/180x90/000/fff"
        />
        <Exercise
          name="Brush unten"
          cover="https://dummyimage.com/180x90/000/fff"
        />
        <Exercise
          name="Kantenpass"
          cover="https://dummyimage.com/180x90/000/fff"
        />
        <Exercise
          name="Kantenpass"
          cover="https://dummyimage.com/180x90/000/fff"
        />
      </ScrollContainer>
    );
  }
}
