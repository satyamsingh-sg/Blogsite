import { CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { adminActions } from '../store/admin'
import { fetchPosts, fetchQuestions, fetchUsers } from '../store/admin-actions'

const Admin = () => {
    const dispatch = useDispatch()
    const [submit, setSubmit] = useState(false)
    useEffect(() => {
        setSubmit(true)
        dispatch(fetchUsers()).then((result) => {
            dispatch(adminActions.setUsers(result))
        })
        dispatch(fetchPosts()).then((result) => {
            dispatch(adminActions.setPosts(result))
        })
        dispatch(fetchQuestions()).then((result) => {
            dispatch(adminActions.setQuestions(result))
            setSubmit(false)
        })
    }, [])
    return (
        submit ? <CircularProgress /> : <div>
            <ul class="nav">
                <li class="nav-item">
                    <Link to="users" className='nav-link'>Users</Link>
                </li>
                <li class="nav-item">
                    <Link to="posts" className='nav-link'>Posts</Link>
                </li>
                <li class="nav-item">
                    <Link to="questions" className='nav-link'>Questions</Link>
                </li>
            </ul>
            <div className='container d-flex justify-content-center'>
                <h1>Admin Page</h1>
            </div>
            <Outlet />
        </div>
    )
}

export default Admin
