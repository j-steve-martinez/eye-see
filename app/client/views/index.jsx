'use strict'

var React = require('react');
var ReactDOM = require('react-dom');

import About from './about.jsx';
// import Config from './config.jsx'
import Header from './header.jsx';
import Login from './login.jsx';
// import Signup from './signup.jsx';
import Start from './start.jsx';
import User from './user.jsx';
import All from './all.jsx';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.router = this.router.bind(this);
        this.ajax = this.ajax.bind(this);
        this.parseAuth = this.parseAuth.bind(this);
        var auth = { _id: false, error: '' };
        this.state = { auth: auth, images: [] };
    }
    router(route) {
        // console.log('main router');
        // console.log(route);
        if (route === 'logout') {
            this.ajax({ route: 'logout' });
        } else {
            var auth = this.state.auth;
            auth.error = null;
            this.setState({ route: route, auth: auth });
        }
    }
    ajax(data) {
        // console.log('main ajax');
        // console.log(data);
        /**
         * Ajax to the server
         */
        var auth, url, URL, method, primus, contentType, route, reroute, header = {}, state = {};
        if (data.primus) {
            state.primus = data.primus;
            delete data.primus;
        }

        route = data.route;

        switch (route) {
            case 'all':
                // console.log('route: signup');
                url = '/signup'
                header.method = 'POST';
                header.url = url;
                break;
            case 'add':
                // console.log('route: add');
                url = '/api/images'
                header.method = 'POST';
                header.url = url;
                break;
            case 'like':
                // console.log('route: like');
                url = '/api/images'
                header.method = 'PUT';
                header.url = url;
                break;
            case 'delete':
                // console.log('route: delete');
                url = '/api/images'
                header.method = 'DELETE';
                header.url = url;
                break;
            case 'update':
                // console.log('route: update');
                url = '/update'
                header.method = 'POST';
                header.url = url;
                break;
            case 'login':
                // console.log('route: user');
                url = '/login';
                header.method = 'POST';
                header.url = url;
                break;
            case 'logout':
                // console.log('route: user');
                url = '/logout';
                header.method = 'GET';
                header.url = url;
                break;
            default:
                break;
        }
        header.contentType = "application/json";
        header.dataType = 'json'
        header.data = JSON.stringify(data);
        // console.log('ajax header');
        // console.log(data);
        // console.log(header);

        /**
         * Get data from server
         */
        $.ajax(header)
            .then(results => {
                // console.log('AJAX .then');
                // console.log(results);
                switch (route) {
                    case 'all':
                        // console.log('signup .then');
                        reroute = 'user';
                        auth = this.parseAuth(results.user);
                        break;
                    case 'add':
                        // console.log('add .then');
                        state.images = this.state.images;
                        if (results.image) {
                            state.images.push(results.image);
                        }
                        reroute = 'user';
                        auth = this.state.auth;
                        break;
                    case 'delete':
                        // console.log('delete .then');
                        state.images = this.state.images.filter(item => {
                            return item._id.toString() !== results.imageId.toString();
                        });
                        reroute = 'user';
                        auth = this.state.auth;
                        break;
                    case 'like':
                        // console.log('like .then');
                        // console.log(results.image._id);
                        reroute = results.type;
                        auth = this.state.auth;
                        state.images = this.state.images;
                        state.images.forEach(item => {
                            if (item._id === results.image._id) {
                                // console.log(item);
                                item.likes = results.image.likes;
                                item.users = results.image.users;
                            }
                        });
                        break;
                    case 'update':
                        // console.log('update .then');
                        reroute = 'user';
                        auth = this.parseAuth(results.user);
                        break;
                    case 'login':
                        // console.log('login .then');
                        reroute = 'user';
                        auth = this.parseAuth(results.user);
                        break;
                    case 'logout':
                        // console.log('logout .then');
                        reroute = 'start';
                        auth = this.parseAuth(results.user);
                        break;
                }
                // console.log('reroute..........');
                // console.log(reroute);
                state.route = reroute;
                state.auth = auth;

                if (reroute !== undefined) {
                    this.setState(state);
                }
            })
            .fail(err => {
                // console.log('AJAX .fail');
                // console.log(err);
                var auth = this.state.auth;
                if (err.responseJSON) {
                    auth.error = err.responseJSON.error;
                    this.setState({ route: route, auth: auth });
                } else {
                    this.setState({ route: 'start' });
                }
            });
    }
    parseAuth(data) {
        // console.log('parseAuth');
        // console.log(data);
        if (data._id === false) {
            return data;
        } else {

            var auth, type, error, obj, id, name, email, city, state, icon;
            Object.keys(data).forEach(key => {
                // console.log(key);
                switch (key) {
                    case 'local':
                        type = 'local'
                        break;
                    case 'twitter':
                        type = 'twitter'
                        break;
                    case 'facebook':
                        type = 'facebook';
                        break;
                    case 'google':
                        type = 'google'
                        break;
                    default:
                        break;
                }
            });
            // console.log('type');
            // console.log(type);
            // console.log(data[type]);
            data._id ? id = data._id : id = false;
            data[type].name ? name = data[type].name : name = '';
            data[type].city ? city = data[type].city : city = '';
            data[type].state ? state = data[type].state : state = '';
            data[type].email ? email = data[type].email : email = '';
            data[type].email ? icon = data[type].icon : icon = '';

            data.error ? error = data.error : error = null;

            obj = {
                _id: id,
                type, type,
                name: name,
                email: email,
                city: city,
                state: state,
                icon: icon,
                error: error
            }
            // console.log('return');
            // console.log(obj);
            return obj;
        }
    }
    componentDidMount() {
        /**
         * Set the primus handler
         */
        // var primus = new Primus();
        // primus.on('data', data => {
        //     // console.log('primus data');
        //     // console.log(data);
        //     if (typeof data === 'object') {
        //         // console.log('primus got json');
        //     }
        // });
        var apiUrl = window.location.origin + '/api/images';
        $.ajax({
            url: apiUrl,
            method: 'GET'
        }).then(data => {
            // console.log('comp did mount ajax.then');
            // console.log(data);
            // var route, auth = this.parseAuth(data.user);
            // console.log(auth._id);
            // auth._id ? route = 'user' : route = 'start'
            this.setState({ images: data.images })
        })
    }
    componentWillMount() {
        // console.log('Main componentWillMount');
        var apiUrl = window.location.origin + '/user/:id';
        $.ajax({
            url: apiUrl,
            method: 'GET'
        }).then(data => {
            // console.log('comp will mount ajax.then');
            // console.log(data);
            var route, auth = this.parseAuth(data.user);
            // console.log(auth._id);
            auth._id ? route = 'user' : route = 'all'
            this.setState({ route: route, auth: auth })
        })
    }
    render() {
        // console.log('Main render');
        // console.log(this.state);
        var page, error, route;
        route = this.state.route;
        error = this.state.auth.error;
        if (error) {
            route = error.type;
        }
        switch (route) {
            case 'start':
                page = <Start auth={this.state.auth} />
                break;
            case 'login':
                page = <Login ajax={this.ajax} auth={this.state.auth} />
                break;
            case 'config':
                page = <Config ajax={this.ajax} auth={this.state.auth} />
                break;
            case 'signup':
                page = <Signup ajax={this.ajax} auth={this.state.auth} />
                break;
            case 'all':
                page = <All ajax={this.ajax} auth={this.state.auth} images={this.state.images} />
                break;
            case 'user':
                page = <User ajax={this.ajax} auth={this.state.auth} images={this.state.images} />
                break;
            case 'about':
                page = <About />
                break;
            default:
                // console.log('showing default blank page');
                page = null
                break;
        }
        return (
            <div className="container-fluid" >
                <Header router={this.router} ajax={this.ajax} auth={this.state.auth} />
                {page}
            </div>
        )
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('content')
);
