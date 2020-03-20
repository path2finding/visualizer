import React, { Suspense } from 'react';
import Wall from './Wall';
import Empty from './Empty';

interface GenericSpace {
  type: string;
  visited: Boolean;
  path: Boolean;
}

const GenericSpace: React.FC<GenericSpace> = props => {
  if (props.type === 'empty') {
    return <Empty visited={props.visited} path={props.path} />;
  } else {
    return (
      <Suspense fallback="none">
        <Wall type={props.type} />
      </Suspense>
    );
  }
};

export default GenericSpace;
