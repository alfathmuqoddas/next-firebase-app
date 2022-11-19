import {useState} from 'react';
import Layout from '../../Assets/Layout';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../Components/Firebase';

export default function Login() {
	const userAuth = auth.currentUser;
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
	    // Signed in 
	  	router.push('/');
	    //const user = userCredential.user;
	    // ...
	  })
	  .catch((error) => {
	    alert(error.message);
	    // ..
	  });
	  setEmail('');
	  setPassword('');
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
				<h3 className="text-center mb-5">Login to Next Firebase App</h3>
				<form onSubmit={handleLogin}>
					<label htmlFor="email">Email</label>
					<input type="email" name="email" className="form-control form-control-sm mt-2 mb-3" placeholder="enter email..." value={email} onChange={(e) => setEmail(e.target.value)} required />
					<label htmlFor="password">Password</label>
					<input type="password" name="password" className="form-control form-control-sm my-2" placeholder="enter password..." value={password} onChange={(e) => setPassword(e.target.value)} required />
					<div class="d-grid">
						<input type="submit" className="btn btn-primary" value="Login" />
					</div>
				</form>
				<p className="text-center m-0 pt-2">Doesn't have an account? Register <Link href="/Register">here</Link></p>
				</div>
			</div>
			</div>
			}
		</Layout>
	)
}