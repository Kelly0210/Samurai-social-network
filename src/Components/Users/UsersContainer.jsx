import React from "react";
import {connect} from "react-redux";
import {
    setUsers,
    toggleIsFetching,
    setCurrentPage,
    setTotalUsersCount,
    toggleFollow
} from "../../redux/UsersPageReducer";
import * as axios from "axios";
import Users from "./Users";
import Preloader from "../Common/preloader";
class UsersAPIComponent extends React.Component {

    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?
        page=${this.props.currentPage}
        &count=${this.props.pageSize}`, {withCredentials: true})
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.toggleIsFetching(true);
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?
        page=${pageNumber}
        &count=${this.props.pageSize}`, {withCredentials: true})
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items);
            });
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                       usersData={this.props.usersData}
                       currentPage={this.props.currentPage}
                       pageSize={this.props.pageSize}
                       toggleFollow={this.props.toggleFollow}
                       onPageChanged={this.onPageChanged}
                />
            </>
    }
}

let mapStateToProps = (state) => {
    return {
        usersData: state.usersPage.usersData,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
};

const UsersContainer = connect(mapStateToProps, {
    toggleFollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
}) (UsersAPIComponent);

export default UsersContainer;