import Layout from "../../Assets/Layout";
import { useEffect, useState } from "react";
//import Link from "next/link";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../Components/Firebase";
import { lowBadge, medBadge, hiBadge } from "../../Components/Firebase";
import ProductTable from "../../Components/ProductTable";
import ProfileInfo from "../../Components/ProfileInfo";

const Profile = () => {
  const user = auth.currentUser;

  //belw to delete task
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "list-of-things", id));
  };
  //above to delete task
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // below is for diplaying task / data from db
      const q = query(collection(db, "list-of-things"), orderBy("createdAt"));
      const unsub = onSnapshot(q, (querySnapshot) => {
        let productArray = [];
        querySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
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
      {user ? (
        <>
          <ProfileInfo
            photoURL={user.photoURL}
            displayName={user.displayName}
            email={user.email}
          />
          <ProductTable
            body={products.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.productId}</th>
                <td>{product.name}</td>
                <td>{product.shortdesc.substring(0, 50) + "..."}</td>
                <td>
                  <a href={product.thumbnail}>thumbnail link</a>
                </td>
                <td>{product.category}</td>
                <td>{product.type}</td>
                <td>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-sm btn-danger"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          />
        </>
      ) : (
        <>
          <div className="my-5">
            <h3>You need to login to see your profile</h3>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Profile;
