import PropTypes from 'prop-types';
function Main(props) {
  const { children, visibleIndex, index, ...other } = props;  
  return (
    <div
      role="tabpanel"
      hidden={visibleIndex !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {visibleIndex === index && children}
    </div>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  visibleIndex: PropTypes.any.isRequired,
};

export default Main;
