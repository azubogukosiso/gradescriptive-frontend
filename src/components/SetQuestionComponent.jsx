import React from 'react'

const SetQuestionComponent = ({ questionData, index, setQuestions, questions, addOrRemoveQuestions }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedQuestions = [...questions]
        updatedQuestions[index][name] = value;
        setQuestions(updatedQuestions);
    }

    return (
        <div className='my-5 w-75'>
            <div className='d-flex flex-column'>
                <span className='d-flex justify-content-between'><label htmlFor="question"> Question {index + 1}:</label>
                    <textarea id='question' onChange={handleChange} className='w-75 p-1' name="question" rows="4" cols="50" defaultValue={questionData.question}></textarea>
                </span>
                <span className='my-3'></span>

                <span className='d-flex justify-content-between'><label htmlFor="answer"> Answer {index + 1}:</label>
                    <textarea id='answer' onChange={handleChange} className='w-75 p-1' name="answer" rows="4" cols="50" defaultValue={questionData.answer}></textarea></span>
                <span className='my-3'></span>

                <span className='d-flex justify-content-between'><label htmlFor="marks">Total Marks:</label><input id='marks' required className='w-75 p-1' onChange={handleChange} type="number" name='marks' value={questionData.marks} /></span>
                <span className='my-3'></span>

                <span className='d-flex justify-content-between'><label htmlFor="keywords">Keywords:</label><input id='keywords' required className='w-75 p-1' placeholder="NB: Seperate each keyword with a comma (,)" onChange={handleChange} type="text" name='keywords' value={questionData.keywords} /></span>
            </div>
            <button className='custom-btn rounded-1 text-decoration-none mt-4 text-white border border-none px-4 py-2' onClick={() => addOrRemoveQuestions(undefined, index, questions, setQuestions)}>Remove</button>
        </div>
    )
}

export default SetQuestionComponent
