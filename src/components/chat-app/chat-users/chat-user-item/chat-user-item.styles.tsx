import Badge from '@material-ui/core/Badge';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';

export const OnlineBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  }),
)(Badge);

export const BusyBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: 'red',
      color: 'red',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  }),
)(Badge);