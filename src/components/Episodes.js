import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FaExclamationCircle } from 'react-icons/lib/fa';
import Search from './Search';
import CardList from '../containers/CardList';
import { getEpisodes, search } from "../actions/index";
import { Container, Nothing } from '../containers/PageContainer';

class Episodes extends Component {
	constructor(props) {
		super(props);

		this.state = {
			term: "",
		};

		this.submitSearch = this.submitSearch.bind(this);
		this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this);
	}

	componentDidMount() {
		this.props.getEpisodes();
		this.props.getEpisodes(2);
	}

	onChangeSearchTerm(event) {
		this.setState({ term: event.target.value });
		console.log(this.props.episodes);
	}

	submitSearch(event) {
		// Redux action
		event.preventDefault();
		this.props.search("episodes", this.state.term);
	}

	render() {
		return (
			<Container className="contanier-fluid">
				<Search
					searchName="Episodes (By Name)"
					searchTerm={this.state.term}
					onChangeSearchTerm={this.onChangeSearchTerm}
					submitSearch={this.submitSearch} />

				{this.props.episodes.length > 0 ?
					<CardList type="episode" items={this.props.episodes} />
				: <Nothing> <FaExclamationCircle /> No Data </Nothing>}

			</Container>
		);
	}
}

const mapStateToProps = ({ episodes }) => {
	return { episodes };
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ getEpisodes }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Episodes);
