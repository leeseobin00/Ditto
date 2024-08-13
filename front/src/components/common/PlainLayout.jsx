import PropTypes from "prop-types";

function PlainLayout({ children }) {
  return <div>{children}</div>;
}

PlainLayout.propTypes = {
  children: PropTypes.node,
};

export default PlainLayout;
