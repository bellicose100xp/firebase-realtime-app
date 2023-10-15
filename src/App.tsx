import { db } from "./db/firebase";
import { ref, update, push, child, onValue, remove } from "firebase/database";
import { useRef, useState, useEffect } from "react";

import "./App.css";

interface Tasks {
    [key: string]: string;
}

function App() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [tasks, setTasks] = useState<Tasks>({});

    // Attach onValue listener once on page load
    useEffect(() => {
        onValue(ref(db, "list"), (snapshot) => {
            const data = snapshot.val();
            setTasks(data);
        });
    }, []);

    const addToDb = () => {
        const item = (inputRef.current as HTMLInputElement).value;

        /* Read data on every update */
        const newKey = push(child(ref(db), "list")).key;
        if (newKey) {
            update(ref(db), {
                [`list/${newKey}`]: item,
            });
        } else {
            console.error("failed to get unique key from database");
        }
    };

    const deleteItem = (e: React.MouseEvent) => {
        const target = e.target as HTMLButtonElement;
        const key = target.getAttribute("data-key");
        if (key) {
            remove(ref(db, `list/${key}`));
        }
    };

    return (
        <>
            <input type="text" ref={inputRef} />
            <button type="button" onClick={addToDb}>
                Add
            </button>
            <div>
                <ul>
                    {Object.entries(tasks).map(([key, value]) => {
                        return (
                            <li key={key}>
                                {value}{" "}
                                <button
                                    type="button"
                                    data-key={key}
                                    style={{ backgroundColor: "darkred", padding: "3px" }}
                                    onClick={deleteItem}
                                >
                                    X
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}

export default App;
