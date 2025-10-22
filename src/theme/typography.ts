import type { Theme } from '@mui/material/styles';

/**
 * ฟังก์ชันที่รับ theme เป็น parameter
 * @param theme
 * @param scale ขยายตัวอักษร
 * @returns theme.typography
 */
const getTypography = (theme: Theme, scale: number) => ({
  ...theme.typography,
  // ใช้ breakpoints เพื่อกำหนด Responsive Font Size
  h1: {
    ...theme.typography.h1,
    [theme.breakpoints.up('xs')]: {
      fontSize: `${5.75 * scale}rem`,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: `${5.75 * scale}rem`,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: `${6 * scale}rem`,
    },
  },
  h2: {
    ...theme.typography.h2,
    [theme.breakpoints.up('xs')]: {
      fontSize: `${3.5 * scale}rem`,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: `${3.5 * scale}rem`,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: `${3.75 * scale}rem`,
    },
  },
  h3: {
    ...theme.typography.h3,
    [theme.breakpoints.up('xs')]: {
      fontSize: `${2.75 * scale}rem`,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: `${2.75 * scale}rem`,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: `${3 * scale}rem`,
    },
  },
  h4: {
    ...theme.typography.h4,
    [theme.breakpoints.up('xs')]: {
      fontSize: `${1.875 * scale}rem`,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: `${1.875 * scale}rem`,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: `${2.125 * scale}rem`,
    },
  },
  h5: {
    ...theme.typography.h5,
    [theme.breakpoints.up('xs')]: {
      fontSize: `${1.25 * scale}rem`,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: `${1.25 * scale}rem`,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: `${1.5 * scale}rem`,
    },
  },
  h6: {
    ...theme.typography.h6,
    [theme.breakpoints.up('xs')]: {
      fontSize: `${1 * scale}rem`,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: `${1 * scale}rem`,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: `${1.25 * scale}rem`,
    },
  },
  subtitle1: {
    ...theme.typography.subtitle1,
    [theme.breakpoints.up('xs')]: {
      fontSize: `${0.75 * scale}rem`,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: `${0.75 * scale}rem`,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: `${1 * scale}rem`,
    },
  },
  subtitle2: {
    ...theme.typography.subtitle2,
    [theme.breakpoints.up('xs')]: {
      fontSize: `${0.75 * scale}rem`,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: `${0.75 * scale}rem`,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: `${0.875 * scale}rem`,
    },
  },
  body1: {
    ...theme.typography.body1,
    [theme.breakpoints.up('xs')]: {
      fontSize: `${0.75 * scale}rem`,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: `${0.75 * scale}rem`,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: `${1 * scale}rem`,
    },
  },
  body2: {
    ...theme.typography.body2,
    [theme.breakpoints.up('xs')]: {
      fontSize: `${0.75 * scale}rem`,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: `${0.75 * scale}rem`,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: `${0.875 * scale}rem`,
    },
  },
  button: {
    ...theme.typography.button,
    [theme.breakpoints.up('xs')]: {
      fontSize: `${0.75 * scale}rem`,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: `${0.75 * scale}rem`,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: `${0.875 * scale}rem`,
    },
  },
  caption: {
    ...theme.typography.caption,
    [theme.breakpoints.up('xs')]: {
      fontSize: `${0.55 * scale}rem`,
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: `${0.55 * scale}rem`,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: `${0.75 * scale}rem`,
    },
  },
});

export default getTypography;
