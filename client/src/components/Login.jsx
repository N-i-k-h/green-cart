import React from 'react';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';

const Login = () => {
    const { setShowUserLogin, login, register, navigate } = useAppContext();
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (state === "login") {
            const success = await login(email, password);
            if (success) {
                setShowUserLogin(false);
                navigate('/');
            } else {
                toast.error("Login failed. Please check your credentials.");
            }
        } else {
            const success = await register(name, email, password);
            if (success) {
                setShowUserLogin(false);
                navigate('/');
            } else {
                toast.error("Registration failed. Please try again.");
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <form
                onSubmit={onSubmitHandler}
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {state === "login" ? "Login" : "Register"}
                </h2>

                {state === "register" && (
                    <div className="mb-4">
                        <label className="block mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                )}

                <div className="mb-4">
                    <label className="block mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    {state === "login" ? "Login" : "Register"}
                </button>

                <p className="mt-4 text-center">
                    {state === "login" ? (
                        <>Don't have an account? <button type="button" onClick={() => setState("register")} className="text-blue-600">Register</button></>
                    ) : (
                        <>Already have an account? <button type="button" onClick={() => setState("login")} className="text-blue-600">Login</button></>
                    )}
                </p>
            </form>
        </div>
    );
};

export default Login;
