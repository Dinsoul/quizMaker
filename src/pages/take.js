// src/pages/TakeTest.js

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TakeTest() {
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [search, setSearch] = useState('');
    const [filterTag, setFilterTag] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 5;

    const navigate = useNavigate();

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('quizQuestions')) || [];
        setQuestions(saved);
    }, []);

    const filtered = questions.filter(q =>
        q.question.toLowerCase().includes(search.toLowerCase()) &&
        (filterTag === '' || q.tag?.toLowerCase() === filterTag.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / questionsPerPage);
    const displayed = filtered.slice(
        (currentPage - 1) * questionsPerPage,
        currentPage * questionsPerPage
    );

    const handleChange = (questionId, value, type) => {
        setUserAnswers(prev => {
            if (type === 'multiple') {
                const current = prev[questionId] || [];
                const updated = current.includes(value)
                    ? current.filter(v => v !== value)
                    : [...current, value];
                return { ...prev, [questionId]: updated };
            } else {
                return { ...prev, [questionId]: value };
            }
        });
    };

    const checkResults = () => {
        let score = 0;

        filtered.forEach(q => {
            const answer = userAnswers[q.id];

            if (q.type === 'single' && answer === q.correctAnswer) score += 1;

            if (q.type === 'multiple') {
                const correct = (q.correctAnswer || []).sort().join(',');
                const given = (answer || []).sort().join(',');
                if (correct === given) score += 1;
            }

            if (q.type === 'text' && answer?.trim().toLowerCase() === q.correctAnswer?.toLowerCase()) {
                score += 1;
            }
        });

        localStorage.setItem('quizScore', score);
        localStorage.setItem('totalQuestions', filtered.length);
        navigate('/result');
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Пройти тест</h2>

            <div className="row mb-3">
                <div className="col-md-6 mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Поиск по вопросу..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div className="col-md-6 mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Фильтр по тегу..."
                        value={filterTag}
                        onChange={e => setFilterTag(e.target.value)}
                    />
                </div>
            </div>

            {displayed.map(q => (
                <div key={q.id} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{q.question}</h5>

                        {q.type === 'single' &&
                            q.options.map(opt => (
                                <div className="form-check" key={opt}>
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name={`q-${q.id}`}
                                        value={opt}
                                        checked={userAnswers[q.id] === opt}
                                        onChange={() => handleChange(q.id, opt, 'single')}
                                    />
                                    <label className="form-check-label">{opt}</label>
                                </div>
                            ))}

                        {q.type === 'multiple' &&
                            q.options.map(opt => (
                                <div className="form-check" key={opt}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name={`q-${q.id}`}
                                        value={opt}
                                        checked={userAnswers[q.id]?.includes(opt)}
                                        onChange={() => handleChange(q.id, opt, 'multiple')}
                                    />
                                    <label className="form-check-label">{opt}</label>
                                </div>
                            ))}

                        {q.type === 'text' && (
                            <input
                                type="text"
                                className="form-control"
                                value={userAnswers[q.id] || ''}
                                onChange={e => handleChange(q.id, e.target.value, 'text')}
                            />
                        )}
                    </div>
                </div>
            ))}

            {/* Пагинация */}
            <nav className="mb-4">
                <ul className="pagination">
                    {[...Array(totalPages)].map((_, i) => (
                        <li
                            key={i}
                            className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            <button className="page-link">{i + 1}</button>
                        </li>
                    ))}
                </ul>
            </nav>

            <button className="btn btn-success" onClick={checkResults}>
                Завершить и проверить
            </button>
        </div>
    );
}
