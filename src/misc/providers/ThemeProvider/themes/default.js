import "@fontsource/raleway";
import "@fontsource/quicksand";

const commonColors = {
  text: {
    primary: '#000000ff',
    primaryContrast: '#fffefa',
    primaryHeader: '#000000ff',
    secondary: '#7a7a79ff',
    secondaryHeader: '#fffefa',
    tertiary: '#ffd050',
    tertiaryHeader: '#ffd050',
    error: '#f4666dff',
    info: '#1C7FDB',
    success: '#4baf4eff',
    warning: '#E9A631',
  },
  background: {
    primary: '#fefffcff',
    primaryHeader: '#fefffcff',
    secondary: '#fffefa',
    secondaryHeader: '#fef8e9ff',
    tertiary: '#ddc8a7',
    tertiaryHeader: '#fefffcff',
    edit: '#EBF1F6',
    error: '#F6CCCE',
    info: '#D9E5EE',
    success: '#D0E4D6',
    warning: '#FAEDD5',
  },
};
const theme = {
  button: {
    color: {
      header: {
        background: commonColors.background.primaryHeader,
        backgroundDisabled: 'rgba(255, 255, 255, 0.1)',
        backgroundHovered: 'rgba(255, 255, 255, 0.1)',
        text: commonColors.text.primaryHeader,
      },
      primary: {
        background: '#ffd050',
        backgroundDisabled: '#ffd050',
        backgroundHovered: '#fdc734ff',
        text: commonColors.text.primary,
      },
      secondary: {
        background: 'none',
        backgroundDisabled: 'rgba(255, 255, 255, 0.1)',
        backgroundHovered: 'rgba(0, 0, 0, 0.05)',
        text: commonColors.text.primary,
      },
      tertiary: {
        background: 'none',
        backgroundDisabled: 'none',
        backgroundHovered: 'none',
        text: commonColors.text.secondary,
      },

    },
  },
  card: {
    color: {
      background: {
        edit: commonColors.background.edit,
        error: commonColors.background.error,
        info: commonColors.background.info,
        paper: commonColors.background.secondary,
        moonlight: commonColors.background.secondaryHeader,
        success: commonColors.background.success,
        warning: commonColors.background.warning,
      },
    },
  },
  circularProgress: {
    color: '#1192E8',
  },
  colors: commonColors,
  header: {
    color: {
      background: commonColors.background.primaryHeader,
      text: {
        primary: commonColors.text.primaryHeader,
        secondary: commonColors.text.secondaryHeader,
      },
    },
    height: 48,
  },
  hover: {
    background: 'rgba(0, 0, 0, 0.05)',
    backgroundLight: 'rgba(255, 255, 255, 0.15)',
    selected: {
      background: 'rgba(0, 0, 0, 0.10)',
    },
  },
  icon: {
    color: {
      default: commonColors.text.tertiary,
      header: commonColors.text.tertiaryHeader,
      error: commonColors.text.error,
      success: commonColors.text.success,
      warning: commonColors.text.warning,
      info: commonColors.text.info,
    },
  },
  iconButton: {
    border: {
      color: 'rgba(255, 255, 255, 0.5)',
    },
  },
  input: {
    color: {
      header: {
        border: '',
        placeholder: '',
        text: {
          primary: '',
          secondary: '',
        },
      },
      primary: {
        border: commonColors.text.tertiary,
        placeholder: commonColors.text.tertiary,
        text: {
          primary: commonColors.text.primary,
          secondary: commonColors.text.secondary,
        },
      },
    }
  },
  link: {
    color: '#1C7FDB',
  },
  loading: {
    background: '#FFFFFF',
  },
  menu: {
    color: {
      header: {
        background: commonColors.background.secondary,
      },
      primary: {
        background: commonColors.background.secondary,
      },
    }
  },
  menuItem: {
    color: {
      header: {
        backgroundHovered: 'rgba(0, 0, 0, 0.05)',
        backgroundSelected: 'rgba(0, 0, 0, 0.1)',
      },
      primary: {
        backgroundHovered: 'rgba(0, 0, 0, 0.05)',
        backgroundSelected: 'rgba(0, 0, 0, 0.1)',
      },
    }
  },
  pageContainer: {
    border: '#E6E6E6',
    color: {
      background: commonColors.background.primary,
      text: {
        primary: '',
        secondary: '',
      },
    },
    content: {
      color: {
        background: commonColors.background.secondary,
      },
      width: 1024,
    },
  },
  sideBar: {
    background: '#F1F1F1',
    border: '#E6E6E6',
    width: 220,
  },
  spacing: (x = 1) => x * 8,
  typography: {
    color: {
      error: commonColors.text.error,
      info: commonColors.text.info,
      primary: commonColors.text.primary,
      secondary: commonColors.text.secondary,
      tertiary: commonColors.text.tertiary,
      success: commonColors.text.success,
      warning: commonColors.text.warning,
    },
    variants: {
      caption: {
        fontFamily: "'Quicksand', sans-serif",
        fontSize: '18px',
        fontWeight: 600,
        letterSpacing: '0.03333em',
        lineHeight: 1.3,
      },
      default: {
        fontFamily: "'Quicksand', sans-serif",
        fontSize: '18px',
        fontWeight: 400,
        letterSpacing: '0.03333em',
        lineHeight: 1.3,
      },
      subtitle: {
        fontFamily: "'Quicksand', sans-serif",
        fontSize: '20px',
        fontWeight: 400,
        letterSpacing: '0.03333em',
        lineHeight: 1.3,
      },
      title: {
        fontFamily: "'Quicksand', sans-serif",
        fontSize: '22px',
        fontWeight: 600,
        letterSpacing: '0.03333em',
        lineHeight: 1.3,
      },
      h1: {
        fontFamily: "'Raleway', sans-serif",
        fontSize: '34px',
        fontWeight: 600,
        letterSpacing: '0.03333em',
        lineHeight: 1.3,
      },
      h4: {
        fontFamily: "'Raleway', sans-serif",
        fontSize: '22px',
        fontWeight: 400,
        letterSpacing: '0.03333em',
        lineHeight: 1.3,
      },
      h5: {
        fontFamily: "'Raleway', sans-serif",
        fontSize: '20px',
        fontWeight: 400,
        letterSpacing: '0.03333em',
        lineHeight: 1.3,
      },
    },
  },
};

export default theme;
