import React from 'react';
// var React = require('react');
// var Masonry = require('react-masonry-component');
import Masonry from 'react-masonry-component';

export default class Images extends React.Component {
    constructor(props) {
        super(props);
        // console.log('Images constructor');
        this.filter = this.filter.bind(this);
        this.like = this.like.bind(this);
        this.del = this.del.bind(this);
        this.state = { images: this.props.images};
    }
    filter(e) {
        e.preventDefault();
        // console.log('filter');
        // console.log(e.target.id);
        var filtered = this.state.images.filter((item) => {
            return item.userId === e.target.id;
        });
        console.log(filtered);
        this.setState({ images: filtered });
    }
    like(e) {
        e.preventDefault();
        console.log('like');
        console.log(e.target.id);
    }
    del(e) {
        e.preventDefault();
        console.log('del');
        console.log(e.target);
    }
    componentWillReceiveProps(nextProps){
        // console.log('componentWillReceiveProps');
        // console.log(nextProps);
        this.setState(nextProps)
    }
    render() {
        console.log('images props');
        console.log(this.props);
        console.log(this.state);

        var masonryOptions = {
            transitionDuration: '0.8s'
        };

        var delildElements = this.state.images.map((element, key) => {
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
                        <span className='glyphicon glyphicon-remove'></span>
                    </button>
                )
            } else {
                var del = null;
            }

            /**
             * deleck the likes
             */
            if (element.likes > 0) {
                var like = <span className="glyphicon glyphicon-star"></span>
            } else {
                var like = <span className="glyphicon glyphicon-star-empty"></span>
            }

            return (
                <div key={key} className="image-element-class">
                    <img src={element.url} className="images" />
                    <div className='caption' >{element.caption}</div>
                    <div className='footer' >
                        {icon}
                        <button id={element._id} onClick={this.like} className='btn btn-info btn-xs like' >
                            {like}
                            <span className="badge">{element.likes}</span>
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
                {delildElements}
            </Masonry>
        );
    }
}