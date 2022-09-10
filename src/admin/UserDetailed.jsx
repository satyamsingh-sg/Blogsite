import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PostCard from './PostCard'
import QuestionCard from './QuestionCard'

const UserDetailed = () => {
    const params = useParams()
    const users = useSelector(state => state.admin.users)
    const posts = useSelector(state => state.admin.posts)
    const questions = useSelector(state => state.admin.questions)
    const user = users[params.id]
    return (
        <div className='container'>
            <h1>{user.firstName}{" "}{user.lastName}</h1> <br />
            <h5>{user.email}</h5> <br />
            <p>{user.bio}</p>
            <b>Genres</b>
            <ul>{user.genres.map((item, index) => <li key={index}>{item}</li>)}</ul> <br />
            <div className="row">
                <h1>Posts</h1>
                {user.postIds.map((item, index) => {
                    var post = posts.filter(obj => obj.postId === item)
                    return <div className="col-md-3">
                        <PostCard
                            key={item}
                            id={item}
                            title={post[0].postTitle}
                            summary={post[0].postSummary}
                            genre={post[0].genre}
                        />
                    </div>
                })}
            </div>
            <br /> <br />
            <div className="row">
                <h1>Questions</h1>
                {user.questionIds.map((item, index) => {
                    var question = questions.filter(obj => obj.questionId === item)
                    return <div className="col-md-3">
                        <QuestionCard
                            key={item}
                            id={item}
                            title={question[0].question}
                            summary={question[0].description}
                            genre={question[0].genre}
                        />
                    </div>
                })}
                <br /><br />
                <h1>Followers</h1>
                {user.followersList.map((item, index) => {
                    return <div className="col-md-3" key={index}>
                        <div class="card" style={{ width: "18rem", marginTop: '2em' }}>
                            <div class="card-body">
                                <h5 class="card-title">{item.name}</h5>
                                <p>{item.id}</p>
                            </div>
                        </div>
                    </div>
                })}
                <br /><br />
                <h1>Following</h1>
                {user.followingList.map((item, index) => {
                    return <div className="col-md-3" key={index}>
                        <div class="card" style={{ width: "18rem", marginTop: '2em' }}>
                            <div class="card-body">
                                <h5 class="card-title">{item.name}</h5>
                                <p>{item.id}</p>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default UserDetailed
