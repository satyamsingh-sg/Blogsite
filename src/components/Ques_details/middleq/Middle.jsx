import { useSelector } from "react-redux";

const Middle = () => {
    const questiondata = useSelector((state) => state.question); // selecting the data from the store
    return (
        <div>
            <div>
                <span>{questiondata.description} </span>{" "}
                {/*printing the question description */}
            </div>
            <div style={{ paddingRight: "1em", paddingTop: "1em" }}>
                <img
                    src={questiondata.imageUrl}
                    alt="none"
                    width="820px"
                    height="248px"
                />{" "}
                {/*printing the question immage if any */}
            </div>
        </div>
    );
};

export default Middle;
