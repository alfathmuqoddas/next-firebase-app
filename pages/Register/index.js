import Layout from "../../Assets/Layout"
import { useState, useEffect } from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {useRouter} from "next/router";
import Link from "next/link"
import {auth} from "../../Components/Firebase"

const Register = () => {

    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();
	const userAuth = auth.currentUser;


	const handleRegister = (e) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
	    // Signed in 
	    const user = userCredential.user;
	    console.log(user);
	    // ...
	  }).then(() => {
	  	router.push('/edit-profile');
	  })
	  .catch((error) => {
	    alert(error.message);
	    // ..
	  });
	};

    return (
		<Layout>
			{
			userAuth ?
			<div className="container my-5">
				<h3 className="text-center">You Already Logged In</h3>
			</div>
			:
			<div className="mx-auto p-3 w-100" style={{"maxWidth": "400px"}}>
			<div className="card">
				<div className="card-body">
				<h3 className="text-center mb-5">Register to Next Firebase App</h3>
				<form onSubmit={handleRegister}>
                    <label htmlFor="email">Register Email</label>
					<input type="email" name="email" className="form-control form-control-sm mt-2 mb-3" placeholder="enter email..." value={email} onChange={(e) => setEmail(e.target.value)} required />
					<label htmlFor="password">Create Password</label>
					<input type="password" name="password" className="form-control form-control-sm my-2" placeholder="enter password..." value={password} onChange={(e) => setPassword(e.target.value)} required />
					<div class="d-grid">
                        <input type="submit" className="input-group-text btn btn-primary" value="Register" />
                    </div>
				</form>
				<p className="text-center m-0 pt-2">Already have an account? Login <Link href="/Login">here</Link></p>
				</div>
			</div>
			</div>
			}
		</Layout>
	)
}

export default Register