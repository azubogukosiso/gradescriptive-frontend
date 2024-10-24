import { useEffect } from "react";

const ExamQuestionComponent = ({ index, question, marks, examQuestions, setStudentAnswers, tempStorage, setTempStorage }) => {

    useEffect(() => {
        // ISSUE HERE: On live reload, assigns fields to empty values even when populated. 
        const initialTempStorage = examQuestions.map(() => ({ answer: '' }));
        setTempStorage(initialTempStorage);
    }, [examQuestions]);

    const tempStorageModifier = (e, index) => {
        const updatedTempStorage = [...tempStorage];
        updatedTempStorage[index].answer = e.target.value;
        setTempStorage(updatedTempStorage);
    }

    return (
        <div className='my-5 w-75'>
            <div>
                <div className='fw-bold'>Question {index + 1}:</div>
                <div className='my-1'></div>
                <div>{question}</div>
                <textarea onChange={(e) => {
                    tempStorageModifier(e, index);
                    setStudentAnswers(tempStorage);
                }}
                    className='w-75 p-1' name={"answer" + index} rows="4" cols="50"></textarea>

                <div className='my-1'></div>

                <div className='fw-bold'>({marks} marks)</div>
            </div>
        </div>
    )
}

export default ExamQuestionComponent