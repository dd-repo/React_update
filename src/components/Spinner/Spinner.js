import React from 'react';
import logo from 'static/logos/infosweep-logo-160.png'
import classes from './Spinner.scss'

const Spinner = () => {
  return (
    <div id={classes.loader}>
      <div>
        <div className={classes.top}>
          <img className={classes.logo} src={logo} />
          <div className={classes.loader}>
            <svg
              version="1.1"
              id="loader-1"
              xmlns="http://www.w3.org/2000/svg"
              xlinkHref="http://www.w3.org/1999/xlink" x={0} y={0}
              width={30} height={30} viewBox="0 0 40 40" enableBackground="new 0 0 40 40" spacing="preserve"
            >
              <g>
                <path
                  fill="#2d2d2d"
                  d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
                />
                <path
                  fill="#2c97de"
                  d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z"
                >
                </path>
              </g>
            </svg>
          </div>
        </div>
        <div className={classes.bottom}>
          Loading. Please Wait. <i className="fa fa-cricle" style={{opacity: 0}}></i>
        </div>
      </div>
    </div>
  )
}

export default Spinner;
