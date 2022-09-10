import React from 'react'
import { Link } from 'react-router-dom'

const PostCard = (props) => {
    return (
        <div class="card" style={{ width: "18rem", marginTop: '2em' }}>
            <div class="card-body">
                <h5 class="card-title">{props.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{props.genre}</h6>
                <p class="card-text">{props.summary.slice(0, 80)}...</p>
                <Link to={`/admin/users/${props.id}`} class="card-link">View Post</Link>
                {/* <Link to="#" class="card-link">Delete user</Link> */}
            </div>
        </div>
    )
}

export default PostCard
