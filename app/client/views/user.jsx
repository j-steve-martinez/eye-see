import React from 'react';
import Images from './images.jsx'

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        var data = {
            isConfirm: false
        };
        this.state = data;
    }
    onClick(e) {
        // console.log('onClick');
        // console.log(e.target.id);
        e.preventDefault();

        var data = {
            isConfirm: true
        };

        function findPos(obj) {
            var curtop = 0;
            if (obj.offsetParent) {
                do {
                    curtop += obj.offsetTop;
                } while (obj = obj.offsetParent);
                return [curtop];
            }
        }
        window.scrollTo(0, findPos(document.getElementById("confirm")));
        this.setState(data);
    }
    onConfirm(e) {
        e.preventDefault();
        // console.log('onConfirm');
        // console.log(e.target.id);
        this.setState({ isConfirm: false });
    }
    render() {
        // console.log('User');
        // console.log(this.props);
        // console.log(this.state);
        var books, booksHtml, borrowed, borrowedHtml, requests, requestsHtml, name, email, city, state, icon;

        /**
         * Make sure some books exist
         */
        if (this.state.isConfirm) {
            if (this.state.book.isAccept === true || this.state.book.isRequest) {
                confirm = (
                    <div className="alert alert-danger alert-dismissible" role="alert">
                        <strong>{this.state.book.title}</strong> has been requested or is on loan. Try again later.
                    </div>
                )
            } else {
                confirm = (
                    <form className="form-horizontal">
                        <label className='well text-danger' >Delete: {this.state.book.title}? </label>
                        <button onClick={this.onConfirm} name={this.state.book._id} id='delete' className="btn btn-success btn-lg" >Delete</button>
                        <button onClick={this.onConfirm} name={this.state.book._id} id='cancel' className="btn btn-danger btn-lg" >Cancel</button>
                    </form>
                )
            }
        } else {
            confirm = null;
        }

        /**
         * Filter out images not user
         */
        var images = this.props.images.filter((item)=>{
            return item.userId === this.props.auth._id;
        });

        /**
         * Show blank page if no images
         */
        if (this.props.images.length === 0) {
            var images = null;
        } else {
            var images = <Images images={images} auth={this.props.auth} type='user' />
        }
        return (
            <div className="" >
                <div>
                    {images}
                </div>
            </div>
        )
    }
}