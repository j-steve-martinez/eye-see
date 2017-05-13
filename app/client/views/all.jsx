import React from 'react';
import Images from './images.jsx';

export default class All extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // console.log('All props');
        // console.log(this.props);
        var props = this.props;
        var filtered = [];
        return (
            <div className="" >
                <Images {...props} type='all' />
            </div>
        );
    }
}