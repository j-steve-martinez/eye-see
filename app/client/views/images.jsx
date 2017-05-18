import React from 'react';
// var React = require('react');
// var Masonry = require('react-masonry-component');
import Masonry from 'react-masonry-component';

/**
 * Pollyfil for Object.assign used by react-image
 */
Object.assign || function (r) { for (var t = 1; t < arguments.length; t++) { var n = arguments[t]; for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (r[a] = n[a]) } return r };
import Img from 'react-image'

export default class Images extends React.Component {
    constructor(props) {
        super(props);
        // console.log('Images constructor');
        this.filter = this.filter.bind(this);
        this.like = this.like.bind(this);
        this.del = this.del.bind(this);
        this.state = { images: this.props.images };
    }
    filter(e) {
        e.preventDefault();
        // console.log('filter');
        // console.log(e.target.id);
        var filtered = this.state.images.filter((item) => {
            return item.userId === e.target.id;
        });
        // console.log(filtered);
        this.setState({ images: filtered });
    }
    like(e) {
        e.preventDefault();
        // console.log('like');
        // console.log(this.props);
        // console.log(e.target.id);
        var data = { route: 'like', imageId: e.target.id, type: this.props.type };
        this.props.ajax(data);
    }
    del(e) {
        e.preventDefault();
        // console.log('del');
        // console.log(e.target.id);
        var data = { route: 'delete', imageId: e.target.id };
        this.props.ajax(data);
    }
    componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps');
        // console.log(nextProps);
        this.setState(nextProps)
    }
    render() {
        // console.log('images props');
        // console.log(this.props);
        // console.log(this.state);
        var brokenImg = '/public/img/broken.png';
        var masonryOptions = {
            transitionDuration: '0.8s'
        };

        var childElements = this.state.images.map((element, key) => {
            /**
             * Set the icon
             */
            var icon = (
                <a href='#' onClick={this.filter} >
                    <img id={element.userId} className='icon' src={element.icon} />
                </a>
            )

            /**
             * If user add a delete button
             */
            if (this.props.type === 'user' && this.props.auth._id !== false) {
                var del = (
                    <button id={element._id} onClick={this.del} className='btn btn-danger btn-xs del'>
                        <span id={element._id} className='glyphicon glyphicon-remove'></span>
                    </button>
                )
            } else {
                var del = null;
            }

            /**
             * check the likes
             */
            //  onError="this.onerror=null;this.src='/public/img/Twitter.png';"
            if (element.likes > 0) {
                var like = <span id={element._id} className="glyphicon glyphicon-star"></span>
            } else {
                var like = <span id={element._id} className="glyphicon glyphicon-star-empty"></span>
            }

            /**
             * Set the image and fallback
             */
            var imgSrc = [element.url, brokenImg];

            return (
                <div key={key} className="image-element-class">
                    <Img src={imgSrc} className="images" />
                    <div className='caption' >{element.caption}</div>
                    <div className='footer' >
                        {icon}
                        <button id={element._id} onClick={this.like} className='btn btn-info btn-xs like' >
                            {like}
                            <span id={element._id} className="badge">{element.likes}</span>
                        </button>
                        {del}
                    </div>
                </div>
            );
        });

        return (
            <Masonry
                className={'my-gallery-class'}
                options={masonryOptions}
                disableImagesLoaded={false}
                updateOnEachImageLoad={false}>
                {childElements}
            </Masonry>
        );
    }
}