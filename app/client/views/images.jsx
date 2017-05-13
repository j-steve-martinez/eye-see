import React from 'react';
// var React = require('react');
// var Masonry = require('react-masonry-component');
import Masonry from 'react-masonry-component';

export default class Images extends React.Component {
    constructor(props) {
        super(props);
        console.log('images constructor');
        // this.cH = this.cH.bind(this);
        // this.submit = this.submit.bind(this);
        // this.state = { appName: 'Eye See' }
    }
    render() {
        var masonryOptions = {
            transitionDuration: '0.8s'
        };
        var childElements = this.props.images.map((element, key) => {
            /**
             * Change the icon
             */
            if (this.props.auth._id === false) {
                var icon = null;
            } else {
                var icon = <img className='icon' src={element.icon} />
            }

            /**
             * If user add a delete button
             */
            if (this.props.type === 'user' && this.props.auth._id !== false) {
                var del = (
                    <button className='btn btn-danger btn-xs del'>
                        <span className='glyphicon glyphicon-remove'></span>
                    </button>
                )
            } else {
                var del = null;
            }

            /**
             * Check the likes
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
                        <button className='btn btn-info btn-xs like' >
                            {like}
                            <span className="badge">{element.likes}</span>
                        </button>
                        {del}
                    </div>
                </div>
            );
        });

        // elementType={'ul'} // default 'div'
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