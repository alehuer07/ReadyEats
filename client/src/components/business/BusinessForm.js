import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap';

import { useSelector } from 'react-redux';

import axios from 'axios';

export default function Upload(props) {

	const business = useSelector((state) => state.auth.user);
	const [item, setItem] = React.useState({
		shopName: business.name,
		shopID: business.id,
		name: '',
		description: '',
		type: 'meat'
	});
	const [mealImg, setmealImg] = React.useState(null);
	const [validated, setValidated] = React.useState(false);

	const onChange = (event) => {
		event.persist();
		setItem({ ...item, [event.target.name]: event.target.value });
	};

	const onFileChange = (event) => {
		setmealImg(event.target.files[0]);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.currentTarget;

		if (form.checkValidity() === true) {
			setValidated(true);
			const newItem = new FormData();

			newItem.append('imageData', mealImg);

			for (let [key, value] of Object.entries(item)) {
				newItem.append(key, value);
			}

			axios
				.post('/api/menu/upload', newItem)
				.then((res) => {
					props.addItem(res.data.document);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			console.log('missing form fields');
		}
	};

	return (
		<Form validated={validated} onSubmit={handleSubmit}>
			<Form.Row>
				<Col>
					<Form.Control
						type="text"
						value={item.name}
						onChange={onChange}
						name="name"
						id="name"
						placeholder="Meal Name"
						required
					/>{' '}
				</Col>
				<Col>
					<Form.Group>
						<Form.Label>Meal Image</Form.Label>
						<Form.Control
							type="file"
							value={item.file}
							onChange={onFileChange}
							name="file"
							id="file"
							required
						/>
						<Form.Control.Feedback type="invalid">Please provide a meal image.</Form.Control.Feedback>
					</Form.Group>
				</Col>
				<Col>
					<Form.Control
						placeholder="Description"
						as="textarea"
						rows="2"
						value={item.description}
						onChange={onChange}
						name="description"
						id="description"
						required
					/>
				</Col>
				<Col>
					<Form.Control as="select" value={item.type} onChange={onChange} name="type" id="type">
						<option>meat</option>
						<option>vegetarian</option>
						<option>vegan</option>
					</Form.Control>
				</Col>
				<Col>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Col>
			</Form.Row>
		</Form>
	);
}
