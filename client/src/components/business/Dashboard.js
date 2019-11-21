import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { getMeals } from '../../actions/mealActions';
import { Table, Button, Container, Row, Col, Card } from 'react-bootstrap';

import BusinessNav from './BusinessNav';
import Chicken from '../../img/chicken.jpg';

class Dashboard extends Component {
	static propTypes = {
		getMeals: PropTypes.func.isRequired,
		meal: PropTypes.object.isRequired,
		isAuthenticated: PropTypes.bool
	};

	// componentDidMount() {
	// 	this.props.getMeals();
	// }

	onLogoutClick = (e) => {
		e.preventDefault();
		this.props.logoutUser();
	};

	render() {
		const { user } = this.props.auth;
		//	const { meals } = this.props.meal;

		return (
			<div>
				<BusinessNav />
				<Container fluid>
					<row style={{ width: '3000px' }}>
						<Col>
							<h4>
								<b>Hey there,</b> {user.name}
								<p className="flow-text grey-text text-darken-1">
									You are logged into{' '}
									<span style={{ fontFamily: 'monospace' }}>ReadyEats Business</span> as a {user.role}
								</p>
							</h4>
						</Col>
					</row>
				</Container>
				<div>
					<Row>
						<Col md={8}>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th className="center-align">Picture</th>
										<th className="center-align">Description</th>
										<th className="center-align">Vegan</th>
										<th className="center-align">Select</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="center-align">Picture here </td>
										<td className="center-align">Description here</td>
										<td className="center-align">Vegan or not</td>
										<td className="center-align">
											<Button>Select</Button>
										</td>
									</tr>
								</tbody>
							</Table>
						</Col>
						<Col md={{ span: 4 }}>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th className="center-align">Meal of the day</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="center">
											<Card style={{ width: '18rem' }}>
												<Card.Img variant="top" src={Chicken} />
												<Card.Body>
													<Card.Title>Meal Name</Card.Title>
													<Card.Text>Description</Card.Text>
													<Button variant="primary">Remove</Button>
												</Card.Body>
											</Card>
										</td>
									</tr>
								</tbody>
							</Table>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);