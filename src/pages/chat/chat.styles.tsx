import { makeStyles } from '@material-ui/core/styles';

const chatStyles = makeStyles((theme) => ({
  chatSection: {
    width: '100%',
    height: '90vh'
  },
  borderRight: {
    borderRight: '1px solid #e0e0e0',
    padding: '5px'
  },
}));

export default chatStyles;