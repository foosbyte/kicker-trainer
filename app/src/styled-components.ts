import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';

import { theme } from './theme';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  withTheme,
} = styledComponents as ThemedStyledComponentsModule<typeof theme>;

export { css, createGlobalStyle, keyframes, theme, ThemeProvider, withTheme };
export default styled;
