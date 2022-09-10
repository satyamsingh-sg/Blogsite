import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
    const admin = useSelector(state => state.admin)
    return (
        <div className='container'>
            <h1>Users</h1>
            <div className="row">
                {admin.users.map((item, index) => {
                    return <div className="col-md-3" key={index}>
                        <div class="card" style={{width: "18rem", marginTop: '2em'}}>
                            <div class="card-body">
                                <h5 class="card-title">{item.firstname}{" "}{item.lastName}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">{item.email}</h6>
                                <p class="card-text">{item.bio}</p>
                                <Link to={`/admin/users/${index}`} class="card-link">View profile</Link>
                                {/* <Link to="#" class="card-link">Delete user</Link> */}
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Users
