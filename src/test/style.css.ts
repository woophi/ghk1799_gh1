import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const container = style({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 40px)',
});
const steps = style({
  color: '#6d7986',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
});

const card = recipe({
  base: {
    boxShadow: '0 10px 30px rgba(0,0,0,.1)',
    borderRadius: '12px',
    padding: '22px 18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  variants: {
    bg: {
      wrong: {
        backgroundColor: '#feebea',
        color: '#ef3124',
        '--radio-label-color': '#ef3124',
        padding: '22px 16px 20px 18px',
        boxShadow: 'none',
      },
      right: {
        backgroundColor: '#ebf9f1',
        color: '#2fc26e',
        '--radio-label-color': '#2fc26e',
        padding: '22px 16px 20px 18px',
        boxShadow: 'none',
      },
      none: {
        backgroundColor: '#fff',
      },
    },
  },
});

const cards = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const circle = recipe({
  variants: {
    wrong: {
      true: {
        backgroundColor: '#ef3124 !important',
      },
      false: {
        backgroundColor: '#2fc26e !important',
      },
    },
  },
});

const hint = style({
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '16px',
  marginLeft: '36px',
});

const resultsWrap = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  flexGrow: 1,
  textAlign: 'center',
});
const iconBg = style({
  width: '80px',
  height: '80px',
  borderRadius: '27px',
  backgroundColor: '#ef3124',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
const resultsText = style({
  color: '#6d7986',
  fontSize: '16px',
  lineHeight: '22px',
});

export const testStyles = {
  container,
  steps,
  card,
  cards,
  circle,
  hint,
  resultsWrap,
  iconBg,
  resultsText,
};
