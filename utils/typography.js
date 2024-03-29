import Typography from 'typography';
import SutroTheme from 'typography-theme-sutro';

delete SutroTheme.googleFonts;

SutroTheme.overrideThemeStyles = ({ rhythm }) => ({
  'h1,h2,h3,h4,h5,h6': {
    marginTop: rhythm(1 / 2)
  },
  h1: {
    fontWeight: 900,
    letterSpacing: '-1px',
    fontSize: '2.00rem'
  }
});
SutroTheme.scaleRatio = 5 / 2;

const typography = new Typography(SutroTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
