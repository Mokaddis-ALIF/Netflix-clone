import React, { useEffect, useState } from 'react';
import './Banner.css';
import requests from '../requests';
import instance from '../axios';

const Banner = () => {
	const [movie, setMovie] = useState([]);

	const truncate = (str, n) =>
		str?.length > n ? str.substr(0, n - 1) + '...' : str;

	useEffect(() => {
		async function fetchData() {
			const request = await instance.get(requests.fetchNetflixOriginals);
			// setMovies(
			// 	request.data.results[Math.random() * request.data.results.length - 1]
			// );
			setMovie(request.data.results[Math.floor(Math.random() * 10)]);

			return request;
		}

		fetchData();
	}, []);

	return (
		<header
			className="banner"
			style={{
				backgroundSize: 'cover',
				backgroundImage: `url("https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}")`,
				backgroundPosition: 'center center',
			}}
		>
			<div className="banner__contents">
				<h1 className="banner__title">
					{movie?.title || movie?.name || movie?.original_name}
				</h1>

				<div className="banner__buttons">
					<button className="banner__button">Play</button>
					<button className="banner__button">My List</button>
				</div>

				<h1 className="banner__description">
					{truncate(movie?.overview, 150)}
				</h1>
			</div>
		</header>
	);
};

export default Banner;
