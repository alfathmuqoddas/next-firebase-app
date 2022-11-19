import Layout from "../../Assets/Layout"
import { useState } from 'react';
import Link from 'next/link';
import { collection, orderBy, query, onSnapshot, doc, deleteDoc, where } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../Components/Firebase";
import { lowBadge, medBadge, hiBadge } from "../../Components/Firebase";

const Profile = () => {

    const user = auth.currentUser;

	//belw to delete task
	const handleDelete = async (id) => {
		await deleteDoc(doc(db, "tasks", id));
	};
	//above to delete task
	const [tasks, setTasks ] = useState([]);

	onAuthStateChanged(auth, (user) => {
	  if (user) {
    	// below is for diplaying task / data from db
		const q = query(collection(db, "tasks"), where("uid", "==", user.uid), orderBy("createdAt", "desc"));
		const unsub = onSnapshot(q, (querySnapshot) => {
			let taskArray = [];
			querySnapshot.forEach((doc) => {
				taskArray.push({...doc.data(), id: doc.id});
			});
			setTasks(taskArray);
		});
		return () => unsub();
		// above is for diplaying task / data from db
	  } else {
	    // User is signed out
	    // ...
	  }
	});

    return (
        <Layout>
          { user ? 
				<>
					<div className="container my-5">
						<h3 className="text-center">User Profile</h3>
						<p>{user.displayName}</p>
						<img src={user.photoURL} alt="profile-picture" />
						<p>{user.email}</p>
						<Link href="/edit-profile"><button className="btn btn-primary text-light">Edit Profile</button></Link>
					</div>
                    <div className="table-responsive">
                    <table className="table container">
                        <thead>
                            <tr>
                                <th scope="col">Issue ID</th>
                                <th scope="col">Description</th>
                                <th scope="col">Status</th>
                                <th scope="col">Asignee</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { tasks.map((task) =>(
                            <tr key={task.id}>
                                <th scope="row">{task.IssueID}</th>
                                <td>{task.title}</td>
                                <td><p className={task.sev === 'Low' ? lowBadge : task.sev === 'Medium' ? medBadge : hiBadge }>{task.sev}</p></td>
                                <td>{task.desc}</td>
                                <td><button onClick={() => handleDelete(task.id)} className="btn btn-sm btn-danger">🗑️</button></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
				</>
			  	:
			  	<>
				  	<div className="my-5">
				  		<h3>You need to login to see your profile</h3>
				  	</div>
			  	</>
			}
        </Layout>
    )
}

export default Profile