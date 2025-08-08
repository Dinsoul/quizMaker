import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Result() {
    const [score, setScore] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const savedScore = localStorage.getItem('quizScore');
        const totalQuestions = localStorage.getItem('totalQuestions');

        setScore(Number(savedScore) || 0);
        setTotal(Number(totalQuestions) || 0);
    }, []);

    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    const isPassed = percentage >= 50;

    return (
        <div className="container text-center mt-5">
            <h2 className="mb-4">Результаты теста</h2>

            <div className="card shadow p-4 mx-auto" style={{ maxWidth: '400px' }}>
                <h4 className="mb-3">Вы набрали:</h4>
                <p className="display-4 text-primary">{score} / {total}</p>
                <p className={`lead ${isPassed ? 'text-success' : 'text-danger'}`}>
                    {isPassed ? 'Тест пройден!' : 'Недостаточно баллов'}
                </p>
                <p>Процент правильных ответов: <strong>{percentage}%</strong></p>
                <Link to="/" className="btn btn-outline-primary mt-3">На главную</Link>
            </div>
        </div>
    );
}
