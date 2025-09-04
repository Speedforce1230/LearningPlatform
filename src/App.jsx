import { useState } from "react";

import Landing from "./components/Landing/Landing";
import { useLocation } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Quiz from "./components/Quiz/Quiz";
import QuizPost from "./components/QuizPost/QuizPost";
import NavBar from "./components/NavBar/NavBar";

function App() {
    const [count, setCount] = useState(0);
    const location = useLocation();
    return (
        <>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Landing></Landing>}></Route>
                <Route path="/quiz" element={<Quiz></Quiz>}></Route>
                <Route
                    path="/quiz:slug"
                    element={<QuizPost></QuizPost>}
                ></Route>
            </Routes>
        </>
    );
}

export default App;
