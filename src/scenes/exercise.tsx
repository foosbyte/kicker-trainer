import * as React from 'react';
import styled from 'styled-components';

import { Badge } from '../components/badge';
import { Button } from '../components/button';
import { Image } from '../components/image';
import { Text } from '../components/text';
import { View } from '../components/view';

const ExerciseWrapper = styled(View)`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const ImageSizer = styled(View)`
  align-self: center;
  width: 300px;
`;

const LeftRight = styled(View)`
  display: flex;
  justify-content: space-between;
`;

export class Exercise extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <ExerciseWrapper>
        <ImageSizer>
          <Image
            source="https://dummyimage.com/600x400/755175/cacbdb"
            width={600}
            height={400}
          />
        </ImageSizer>
        <LeftRight>
          <Text>Gesamt Trainingszeit</Text>
          <Badge>5 hr 18 min</Badge>
        </LeftRight>
        <LeftRight>
          <Text>Auslösen</Text>
          <Badge>1h 14m</Badge>
        </LeftRight>
        <LeftRight>
          <Text>Aktuelle Quote</Text>
          <Badge>64%</Badge>
        </LeftRight>
        <Button>click</Button>
      </ExerciseWrapper>
    );
  }
}
