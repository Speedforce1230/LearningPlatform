import { useState } from "react";

import Landing from "./components/Landing/Landing";

function App() {
    const [count, setCount] = useState(0);

    return <Landing></Landing>;
}

export default App;
