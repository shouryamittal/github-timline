import React, {Component} from 'react';
import axios from 'axios';
class Insights extends Component {
    componentDidMount() {
        console.log(this.props.location.state);
    }
    render() {
        return (
            <div>
                Insights
            </div>
        )
    }
}

export default Insights;