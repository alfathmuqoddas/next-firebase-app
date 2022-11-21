import Layout from "../../Assets/Layout";
import NewProductForm from "../../Components/NewProductForm";
import { useState } from "react";
import {
  getFirestore,
  collection,
  orderBy,
  query,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { auth, db, app } from "../../Components/Firebase";

export default function AddProduct() {
  const [formdata, setFormdata] = useState({
    productName: "",
    shortdesc: "",
    longdesc: "",
    thumbnail: "",
    category: "",
    type: "",
  });

  const handleInput = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const randomize = () => Math.floor(Math.random() * 999999);

  async function handleSubmit(e) {
    e.preventDefault();
    const { uid } = auth.currentUser;
    //const arr = imgArray.replace(/\s/g, '').match(/.{1,22}/g);
    await addDoc(collection(db, "list-of-things"), {
      name: formdata.productName,
      shortdesc: formdata.shortdesc,
      longdesc: formdata.longdesc,
      thumbnail: formdata.thumbnail,
      category: Number(formdata.category),
      type: Number(formdata.type),
      uid,
      slug: slugify(formdata.productName),
      inStock: true,
      image1: `https://picsum.photos/seed/${randomize()}/1920/1080`,
      image2: `https://picsum.photos/seed/${randomize()}/1920/1080`,
      image3: `https://picsum.photos/seed/${randomize()}/1920/1080`,
      image4: `https://picsum.photos/seed/${randomize()}/1920/1080`,
      image5: `https://picsum.photos/seed/${randomize()}/1920/1080`,
      image6: `https://picsum.photos/seed/${randomize()}/1920/1080`,
      image7: `https://picsum.photos/seed/${randomize()}/1920/1080`,
      image8: `https://picsum.photos/seed/${randomize()}/1920/1080`,
      image9: `https://picsum.photos/seed/${randomize()}/1920/1080`,
      image10: `https://picsum.photos/seed/${randomize()}/1920/1080`,
      productId: new Date().valueOf(),
      createdAt: new Date(),
    });
    alert("Add product success");
  }

  return (
    <Layout>
      {auth.currentUser ? (
        <NewProductForm onChange={handleInput} onSubmit={handleSubmit} />
      ) : (
        <>Login To Add Product</>
      )}
    </Layout>
  );
}
