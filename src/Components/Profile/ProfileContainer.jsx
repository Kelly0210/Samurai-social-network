import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    addPost,
    getUserProfileThunkCreator,
    getUserStatusThunkCreator,
    updateNewPostText
} from "../../redux/ProfilePageReducer";
import {Redirect, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userID = this.props.match.params.userID;
        if (!userID) {
            userID = 2;
        }
        this.props.getUserProfileThunkCreator(userID);
        // this.props.getUserStatusThunkCreator(userID);
    }

    render(){
        return <Profile {...this.props} profile={this.props.profile} addPost={this.props.addPost}/>
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        profilePage: state.profilePage,
    }
}

export default compose(
    connect(mapStateToProps, {
        addPost,
        updateNewPostText,
        getUserProfileThunkCreator,
        getUserStatusThunkCreator
        }),
    withRouter,
    // withAuthRedirect,
)(ProfileContainer)