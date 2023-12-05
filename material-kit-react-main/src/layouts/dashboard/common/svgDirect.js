   /* eslint-disable */

import React from 'react';

const SvgDirect = ({ content, ...rest }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} {...rest} />;
};

export default SvgDirect;
