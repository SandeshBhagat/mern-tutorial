import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	const onSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<>
			<section className='heading'>
				<h1>
					<FaSignInAlt />
					Login
				</h1>
				<p>Login to set goal</p>
			</section>

			<section className='form'>
				<form onSubmit={onSubmit}>
					{/* name */}

					{/* email */}
					<div className='form-group'>
						<input
							type='email'
							className='form-control'
							id='email'
							name='email'
							value={email}
							placeholder='Enter your email..'
							onChange={onChange}
						/>
					</div>

					{/* password */}
					<div className='form-group'>
						<input
							type='password'
							className='form-control'
							id='password'
							name='password'
							value={password}
							placeholder='Enter password..'
							onChange={onChange}
						/>
					</div>


					{/* button */}
					<div className='form-group'>
						<button className='btn btn-block' type='submit'>
							Login
						</button>
					</div>
				</form>
			</section>
		</>
	);
};

export default Login;
