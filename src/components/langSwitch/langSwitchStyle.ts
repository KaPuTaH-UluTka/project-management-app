import { rootStyles } from '../../style/rootStyles';

export default () => ({
  width: 75,
  height: 35,
  alignItems: 'center',
  '& .MuiSwitch-switchBase': {
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: rootStyles.yellowLight,
      transform: 'translateX(45px)',
      '& .MuiSwitch-thumb:before': {},
      '& + .MuiSwitch-track': {
        backgroundColor: rootStyles.violetLight,
        opacity: 1,
        '&:before': {
          content: '""',
        },
        '&:after': {
          content: '"Ru"',
          right: 40,
        },
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 25,
    height: 25,
    mt: '5px',
    '&:before': {
      content: "''",
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: rootStyles.violetLight,
    borderRadius: 22 / 2,
    height: 20,
    alignItems: 'center',
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      content: '"En"',
      left: 35,
    },
  },
});
