// FUNCTION FOR ADDING MORE QUESTION FIELDS
export const addOrRemoveQuestions = (add, index, questions, setQuestions) => {
    if (add) {
        setQuestions([...questions, { question: '', answer: '', marks: 0, keywords: '' }]);
    } else {
        if (questions.length !== 1) {
            const newQuestionList = questions.filter(question => questions.indexOf(question) !== index);
            setQuestions(newQuestionList);
        }
    }
}

// TOAST FOR SUCCESSFUL OPERATIONS
export const showSuccessMsg = (toast, msg) => {
    toast.success(msg, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: false,
        autoClose: 5000
    });
};

// TOAST FOR SUCCESSFUL OPERATIONS
export const showErrorMsg = (toast, msg) => {
    toast.error(msg, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        pauseOnHover: false,
        autoClose: 5000
    });
};

// FUNCTION FOR SUBMITTING EXAM QUESTIONS AND OTHER PARAMETERS TO THE DATABASE - EXAMINER
export const submitQuestions = (lecturerID, questions, examTitle, examDuration) => {
    const apiUrl = `${process.env.REACT_APP_API_URL}exam`;
    const examData = {
        lecturerID, examTitle, examDuration, questions
    };

    const returnedData = fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(examData),
    }).then(async (response) => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.error);
            });
        }
        return response.json();
    })
        .catch(error => {
            return error.message;
        });

    return returnedData;
}

// FUNCTION FOR EXAM ANSWER SUBMISSION
export const submitAnswers = async (studentEmail, lecturerID, examTitle, examId, examQuestions, studentAnswers) => {
    const apiUrl = `${process.env.REACT_APP_API_URL}exam/submit`;
    const studentExamParameters = {
        studentEmail, lecturerID, examTitle, examId, examQuestions, studentAnswers
    };

    console.log(studentExamParameters);

    const returnedData = fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentExamParameters),
    })
        .then(async response => {
            if (!response.ok) {
                return response.json().then(data => {
                    console.log("this is it: ", data);
                    throw new Error(data.error);
                });
            }
            return response.json();
        })
        .catch(error => {
            console.log("the catch: ", error);
            return error.message;
        });

    return returnedData;
}

// COUNTDOWN FUNCTION
export const timeCountdown = (duration) => {
    let seconds = duration * 60;

    const countInterval = setInterval(() => {
        if (seconds <= 0) {
            clearInterval(countInterval);
        } else {
            const minutes = Math.floor(seconds / 60);
            const remainingSecs = seconds % 60;
            seconds--;
            return `${minutes}:${remainingSecs}`;
        }
    }, 1000);
}
