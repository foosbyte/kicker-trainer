const defaultSpace = 16;

export interface ThemeInterface {
  space: {
    xxs: number;
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
  };
  color: {
    green: string;
    anthrazit: string;
  };
  fontSize: {
    xxs: number;
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
  };
}

export const theme: ThemeInterface = {
  space: {
    l: defaultSpace * 2,
    m: defaultSpace,
    s: defaultSpace / 2,
    xl: defaultSpace * 4,
    xs: defaultSpace / 4,
    xxs: defaultSpace / 8,
  },
  color: {
    green: '#4FD49E',
    anthrazit: '#22292F',
  },
  fontSize: {
    l: defaultSpace * 2,
    m: defaultSpace,
    s: defaultSpace / 2,
    xl: defaultSpace * 4,
    xs: defaultSpace / 4,
    xxs: defaultSpace / 8,
  },
};
