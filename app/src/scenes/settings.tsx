import { bind } from 'decko';
import * as React from 'react';

import { Button } from '../components/button';
import { Text } from '../components/text';
import { View } from '../components/view';

export class Settings extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <>
        <View>
          <Text>Settings</Text>
        </View>
        <View>
          <Text>
            Trigger a page reload without hitting the cache to force fetch an
            updated version
          </Text>
          <Button onPress={this.onReload}>Reload without cache</Button>
        </View>
        <View>
          <Text>
            Remove all items from storage, this includes all your training data.
            Use with caution!
          </Text>
          <Button onPress={this.onClearStorage}>Clear storage</Button>
        </View>
      </>
    );
  }

  @bind
  private onReload(): void {
    window.location.reload(true);
  }

  @bind
  private onClearStorage(): void {
    window.localStorage.clear();
    this.onReload();
  }
}
