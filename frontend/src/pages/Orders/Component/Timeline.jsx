import PropTypes from 'prop-types';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Typography from '@mui/material/Typography';

function CustomizedTimeline({ currentStep }) {
  const steps = [
    { label: 'Packing', time: '9:30 am', icon: <HomeIcon />, step: 'packing' },
    { label: 'Shipping', time: '10:00 am', icon: <LocalShippingIcon />, step: 'shipping' },
    { label: 'On Way', time: '1:00 pm', icon: <DirectionsRunIcon />, step: 'onWay' },
    { label: 'Delivered', time: '5:00 pm', icon: <CheckCircleIcon />, step: 'delivered' },
  ];

  return (
    <Timeline position="alternate">
      {steps.map(({ label, time, icon, step }) => (
        <TimelineItem key={step}>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
            {time}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color={currentStep === step ? 'primary' : 'grey'}>
              {icon}
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              {label}
            </Typography>
            <Typography>
              {step === 'packing' && 'The items are being packed.'}
              {step === 'shipping' && 'The package is on the way to the carrier.'}
              {step === 'onWay' && 'The package is on its way to you.'}
              {step === 'delivered' && 'The package has been delivered.'}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

CustomizedTimeline.propTypes = {
  currentStep: PropTypes.oneOf(['packing', 'shipping', 'onWay', 'delivered']).isRequired,
};

export default CustomizedTimeline;
