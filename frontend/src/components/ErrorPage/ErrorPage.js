import './ErrorPage.css'
import { useHistory } from 'react-router-dom';
function ErrorPage() {
    const history = useHistory();

    return (<>
        <div className="error-desc">It's a mystery how you got here</div>
        <div className="error-home" onClick={() => history.push('/')}>Click Here to Return Home</div>
        <div className="error-page">
            <div className="error-image" />
        </div>
    </>)
}

export default ErrorPage;