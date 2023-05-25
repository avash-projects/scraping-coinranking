import { Link } from "react-router-dom";
import { Button } from 'antd';

const Login = () => {
    const loginUser = () => {
        localStorage.setItem('jwt_token', "never_gonna_give_you_up");
    }

    return (
        <>
            <h2 style={{ textAlign: 'center' }}>Scraper Login</h2 >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Link to="/">
                    <Button onClick={loginUser} type="primary">Login</Button>
                </Link>
            </div>
        </>
    );
};

export { Login };
