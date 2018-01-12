import React from 'react';
import {Link,} from 'react-router-dom';

import './nothinghere.css'

const NothingHere = () => {
  return (<div className='nothing'>
    <Link className='go-back' to='/'>Take me home</Link>
  </div>)
};

export default NothingHere;