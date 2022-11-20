import { useState, useEffect } from 'react';
import {collection, orderBy, query, onSnapshot, addDoc} from 'firebase/firestore';
import {app, db, auth, } from './Firebase'
import { lowBadge, medBadge, hiBadge } from "./Firebase";
import CardView from '../Assets/CardView';

const Home = () => {

    const [products, setProducts ] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
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
	}, []);

    return (
        <div className="container-fluid">
      		<div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 row-cols-xxl-6">
				{ loading ? 
					<div className="text-center py-5"><h1>Loading...</h1></div>
					 :
					products.map((product) =>(
                        <CardView key={product.id} title={product.name} desc={product.shortdesc.substring(0, 100) + "..."} thumbnail={product.thumbnail} />
					))
				}
			</div>
		</div>
    )
}

export default Home;