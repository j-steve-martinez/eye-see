import React from 'react';

export default class About extends React.Component {
  render() {
    var fccProjectURL, fccProjectName, appName, appSum, herokuURL, githubURL;
    fccProjectName = 'Build a Pinterest Clone';
    fccProjectURL = "https://www.freecodecamp.com/challenges/build-a-pinterest-clone";
    appName = 'Eye See';
    appSum = 'A Place to Share What Your Eye Sees'
    herokuURL = "#";
    githubURL = "https://github.com/j-steve-martinez/eye-see.git";

    return (
      <div className='jumbotron'>
        <div className='page-header'>
          <h1>
          {appName} <small>{appSum}</small>
          </h1>
        </div>
        <h3>Work done for the freeCodeCamp project: <a href={fccProjectURL} >{fccProjectName}</a> </h3>
        <div id='about-body' >
          It is a full stack web application that uses:
          <ul>
            <li>
              <a href="https://www.mongodb.com/" target="_blank">Database: mongoDB </a>
            </li>
            <li>
              <a href="https://nodejs.org" target="_blank">Server: Node.js </a>
            </li>
            <li>
              <a href="https://facebook.github.io/react/" target="_blanks">Views: React.js </a>
            </li>
            <li>
              <a href="http://getbootstrap.com" target="_blank">Stylesheets: Bootstrap </a>
            </li>
          </ul>
          <span id='warning'>
            This application is for educational purposes only.  Any and all data may be removed at anytime without warning.
          </span>
        </div>
        <div id='about-footer' className='text-center' >
          <span>
            <a className='link' href="https://github.com/j-steve-martinez" target="_blank">
              J. Steve Martinez
            </a>
          </span>
          <span> | </span>
          <span>
            <a className='link' href={githubURL} target="_blank">
              Github
            </a>
          </span>
        </div>
      </div>
    )
  }
}