import Layout from "../../Assets/Layout";
import NewProductForm from "../../Components/NewProductForm";
import { useState } from "react";

export default function index() {
  const [state, setState] = useState({
    productName: "",
    shortdesc: "",
    longdesc: "",
    thumbnail: "",
    category: "",
    type: "",
  });

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {};

  return (
    <Layout>
      <NewProductForm onChange={handleInput} onSubmit={handleSubmit} />
    </Layout>
  );
}
