import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import CreateTest from './pages/create';
import TakeTest from './pages/take';
import ResultTest from './pages/result';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return (
        <BrowserRouter>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Link className="navbar-brand" to="/">QuizMaker</Link>
                    <div>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row gap-3">
                            <li className="nav-item">
                                <Link className="nav-link" to="/create">Создать тест</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/take">Пройти тест</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/result">Результат</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <main className="container py-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<CreateTest />} />
                    <Route path="/take" element={<TakeTest />} />
                    <Route path="/result" element={<ResultTest />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;


