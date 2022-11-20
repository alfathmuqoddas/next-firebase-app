import Layout from "../../Assets/Layout"
import { useState } from 'react';
import Link from 'next/link';
import { collection, orderBy, query, onSnapshot, doc, deleteDoc, where } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../Components/Firebase";
import { lowBadge, medBadge, hiBadge } from "../../Components/Firebase";
import ProductTable from "../../Components/ProductTable";
import ProfileInfo from "../../Components/ProfileInfo";

const Profile = () => {

    const user = auth.currentUser;

	//belw to delete task
	const handleDelete = async (id) => {
		await deleteDoc(doc(db, "tasks", id));
	};
	//above to delete task
	const [products, setProducts ] = useState([]);
	const [loading, setLoading] = useState(true);

	onAuthStateChanged(auth, (user) => {
	  if (user) {
    	// below is for diplaying task / data from db
		const q = query(collection(db, "list-of-things"), orderBy("createdAt", "shortdesc"));
		const unsub = onSnapshot(q, (querySnapshot) => {
			let productArray = [];
			querySnapshot.forEach((doc) => {
				productArray.push({...doc.data(), id: doc.id});
			});
			setProducts(productArray);
			setLoading(false);
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
					<ProfileInfo 
						photoURL={user.photoURL}
						displayName={user.displayName}
						email={user.email}
					/>	
                    <ProductTable body=
						{ products.map((product) =>(
						<tr key={product.id}>
							<th scope="row">{product.productId}</th>
							<td>{product.name}</td>
							<td>{product.shortdesc}</td>
							<td>{product.thumbnail}</td>
							<td>{product.category}</td>
							<td>{product.type}</td>
							<td><button onClick={() => handleDelete(task.id)} className="btn btn-sm btn-danger">🗑️</button></td>
						</tr>
						))}
					/>
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