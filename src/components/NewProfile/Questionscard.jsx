import { useSelector } from "react-redux";
import QuestionCard from "../home/cards/QuestionCard";

const Questionscard = (props) => {
    const quesdata = useSelector((state) => state.questions); //fetching question data from the question store

    return (
        <div>
            <div
                className="container-fluid"
                style={{
                    height: "535px",
                    overflowY: "scroll",
                    borderLeft: "1px solid #b1b1b1",
                    borderRight: "1px solid #b1b1b1",
                    borderBottom: "1px solid #b1b1b1",
                    backgroundColor: "#edf5e1",
                }}
            >
                {props.curUser
                    ? quesdata.map((question) => (
                          <QuestionCard //if the user is current user then render the posts of current user
                              key={question.questionId}
                              id={question.questionId}
                              votes={question.likes}
                              answers={question.comments}
                              question={question.question}
                              details={question.description}
                              userId={question.userId}
                              publishedDate={question.publishedDate}
                              author={question.author}
                          />
                      ))
                    : props.questionsData.map((question) => (
                          <QuestionCard // if the user is other user then render the questions of other user in the question section
                              key={question.questionId}
                              id={question.questionId}
                              votes={question.likes}
                              answers={question.comments}
                              question={question.question}
                              details={question.description}
                              userId={question.userId}
                              publishedDate={question.publishedDate}
                              author={question.author}
                          />
                      ))}
            </div>
        </div>
    );
};

export default Questionscard;
