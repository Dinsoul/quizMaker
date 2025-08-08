// src/pages/Create.js

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Create() {
    const [questionText, setQuestionText] = useState('');
    const [questionType, setQuestionType] = useState('single');
    const [options, setOptions] = useState(['', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [tag, setTag] = useState('');
    const navigate = useNavigate();

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, '']);
    };

    const saveQuestionToLocalStorage = (newQuestion) => {
        const existing = JSON.parse(localStorage.getItem('quizQuestions')) || [];
        existing.push(newQuestion);
        localStorage.setItem('quizQuestions', JSON.stringify(existing));
    };

    const handleAddQuestion = () => {
        if (!questionText.trim()) return alert('Введите текст вопроса');

        const newQuestion = {
            id: Date.now(),
            type: questionType,
            question: questionText,
            options: questionType !== 'text' ? options.filter(opt => opt.trim() !== '') : [],
            correctAnswer:
                questionType === 'multiple'
                    ? correctAnswer.split(',').map(s => s.trim())
                    : correctAnswer,
            tag: tag.trim(),
        };

        saveQuestionToLocalStorage(newQuestion);

        // Очистка формы
        setQuestionText('');
        setQuestionType('single');
        setOptions(['', '']);
        setCorrectAnswer('');
        setTag('');
        alert('Вопрос добавлен!');
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Создать вопрос</h2>

            <div className="mb-3">
                <label className="form-label">Текст вопроса</label>
                <input
                    type="text"
                    className="form-control"
                    value={questionText}
                    onChange={e => setQuestionText(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Тип вопроса</label>
                <select
                    className="form-select"
                    value={questionType}
                    onChange={e => setQuestionType(e.target.value)}
                >
                    <option value="single">Один ответ</option>
                    <option value="multiple">Множественный выбор</option>
                    <option value="text">Текстовый ответ</option>
                </select>
            </div>

            {questionType !== 'text' && (
                <div className="mb-3">
                    <label className="form-label">Варианты ответов</label>
                    {options.map((opt, i) => (
                        <input
                            key={i}
                            type="text"
                            className="form-control mb-1"
                            value={opt}
                            onChange={e => handleOptionChange(i, e.target.value)}
                        />
                    ))}
                    <button className="btn btn-secondary mt-2" onClick={addOption}>
                        Добавить вариант
                    </button>
                </div>
            )}

            <div className="mb-3">
                <label className="form-label">Правильный ответ{questionType === 'multiple' ? ' (через запятую)' : ''}</label>
                <input
                    type="text"
                    className="form-control"
                    value={correctAnswer}
                    onChange={e => setCorrectAnswer(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Тег (например: математика, основы)</label>
                <input
                    type="text"
                    className="form-control"
                    value={tag}
                    onChange={e => setTag(e.target.value)}
                />
            </div>

            <button className="btn btn-primary" onClick={handleAddQuestion}>
                Добавить вопрос
            </button>
        </div>
    );
}
