import React from 'react'
import { useSelector } from 'react-redux'
import QuestionCard from './QuestionCard'

const Questions = () => {
    const admin = useSelector(state => state.admin)
    return (
        <div className="container">
            <h1>Questions</h1>
            <div className="row">
            {admin.questions.map((item, index) => {
                    return <div className="col-md-3" key={index}>
                        <QuestionCard
                            id={item.questionId}
                            title={item.question}
                            summary={item.description}
                            genre={item.genre}
                        />
                    </div>
                })}
            </div>
        </div>
    )
}

export default Questions
