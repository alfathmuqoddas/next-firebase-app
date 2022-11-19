import { useState, useEffect } from 'react';
import {collection, orderBy, query, onSnapshot, addDoc} from 'firebase/firestore';
import {app, db, auth, } from './Firebase'
import { lowBadge, medBadge, hiBadge } from "./Firebase";

const Home = () => {

    const [tasks, setTasks ] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
		const unsub = onSnapshot(q, (querySnapshot) => {
			let taskArray = [];
			querySnapshot.forEach((doc) => {
				taskArray.push({...doc.data(), id: doc.id});
			});
			setTasks(taskArray);
			setLoading(false);
		});
		return () => unsub();
	}, []);

    return (
        <div className="mx-auto p-3 w-100" style={{maxWidth: "500px"}}>
				{ loading ? 
					<div className="text-center py-5"><h1>Loading...</h1></div>
					 :
					tasks.map((task) =>(
                        <div className="card" key={task.id}>
                        <div className="card-body">
                            <p>Issue ID: {task.IssueID}</p>
                            <h4>Description: {task.title}</h4>
                            <p className={task.sev === 'Low' ? lowBadge : task.sev === 'Medium' ? medBadge : hiBadge }>{task.sev}</p>
                            <p>Assigned To: {task.desc}</p>
                        </div>
                        </div>
					))
				}
		</div>
    )
}

export default Home;