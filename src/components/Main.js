//not using this

import React, { Component } from 'react'

import {connect} from 'react-redux'
import {bindActionCreators } from 'redux'
import {fetchUser} from '../redux/actions/index'
    //idk this is redux thing
    const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, dispatch})


export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser()
        
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default connect (null, mapDispatchProps)(Main);
