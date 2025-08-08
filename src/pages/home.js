export default function Home() {
    return (
        <div className="text-center">
            <h1 className="display-4 mb-4">Добро пожаловать в QuizMaker</h1>
            <p className="lead mb-4">Создавайте, проходите и делитесь интерактивными тестами</p>
            <div className="d-flex justify-content-center gap-3">
                <a href="/create" className="btn btn-primary btn-lg">Создать тест</a>
                <a href="/take" className="btn btn-success btn-lg">Пройти тест</a>
            </div>
        </div>
    );
}
