import React from 'react'
import Loading from 'react-loading';
import styles from './Loader.scss';

const Loader = () => (
  <div className='container'>
    <div className={styles.spinner}>
      <div className="col-md-12">
        <Loading type='bubbles' color='white' />
      </div>
    </div>
  </div>
)

export default Loader;

