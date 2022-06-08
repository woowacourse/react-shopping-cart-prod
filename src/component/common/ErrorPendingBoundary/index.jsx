import React from 'react';
import PropTypes from 'prop-types';

import Loader from 'component/Loader';

export default function ErrorPendingBoundary({children, fallback, error, pending = false, data}) {
  if (!data) return <>{children}</>;

  if (data.products.length === 0) return fallback;

  if (pending) return <Loader />;

  if (error) return fallback;

  return <>{children}</>;
}

ErrorPendingBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  fallback: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  error: PropTypes.bool,
  pending: PropTypes.bool,
  data: PropTypes.object,
};
