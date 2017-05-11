import React from 'react';
// import Login from './login.jsx';
// import Logout from './logout.jsx';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.cH = this.cH.bind(this);
        this.state = { appName: 'Eye See' }
    }
    cH(e) {
        // console.log('Header cH');
        // console.log(e.target.id);
        e.preventDefault();
        this.props.router(e.target.id);
    }
    render() {
        // console.log('header props');
        // console.log(this.props);
        /**
         * Login links should be:
         *  All Books
         *  My Books
         *  Configure glyphicon
         *  Logout glyphicon
         */
        var logout = (
            <div>
                <ul className="nav navbar-nav">
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Add Image <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                            <form onSubmit={this.submit} className="navbar-form" >

                                <div className="form-group">
                                    <label htmlFor="image">Image URL:</label>
                                    <input type="url" className="form-control" id="image" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="caption">Caption:</label>
                                    <input type="text" className="form-control" id="caption" required />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                            </form>
                        </ul>
                    </li>
                </ul>
                <ul className="nav navbar-nav navbar-right" >
                    <li><a id="all" onClick={this.cH} href="#"><span className="glyphicon glyphicon-th"></span> All Pics</a></li>
                    <li><a id="user" onClick={this.cH} href="#"><span className="glyphicon glyphicon-user"></span> My Pics</a></li>
                    <li><a id="logout" onClick={this.cH} href="#"><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
                    <li><a id="about" onClick={this.cH} href="#"><span className="glyphicon glyphicon-question-sign"></span> About</a></li>
                </ul>
            </div>
        );
        var login = (
            <ul className="nav navbar-nav navbar-right" >
                {/*<li><a id="signup" onClick={this.cH} href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>*/}
                <li><a id="login" onClick={this.cH} href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                <li><a id="about" onClick={this.cH} href="#"><span className="glyphicon glyphicon-question-sign"></span> About</a></li>
            </ul>
        );
        var navs, auth = this.props.auth;
        // console.log('auth');
        // console.log(auth);
        // console.log('typeof auth._id');
        // console.log(typeof auth._id);
        var myHeader;
        if (auth._id !== false) {
            // console.log('is logged in');
            navs = logout;
        } else {
            // console.log('not logged in');
            navs = login;
        }
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">

                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        {/*<a className="navbar-brand" href="#">Brand</a>*/}
                        <a id="start" onClick={this.cH} className="navbar-brand" href="#">{this.state.appName}</a>
                    </div>
                </div>
                {navs}

            </nav>
        );
    }
}