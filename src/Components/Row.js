import React, { useEffect, useState } from 'react';
import instance from '../axios';
import './Row.css';

const base_url = 'https://image.tmdb.org/t/p/w500/';

const Row = ({ title, fetchUrl, isLargeRow }) => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const request = await instance.get(fetchUrl);
			setMovies(request.data.results);
			return request;
		}

		fetchData();
	}, [fetchUrl]);

	// console.log(movies);

	return (
		<div className="row">
			<h2>{title}</h2>
			<div className="row__posters">
				{movies.map((movie) => (
					<img
						className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
						src={`${base_url}${
							isLargeRow ? movie.poster_path : movie.backdrop_path
						}`}
						alt={movie.name}
						key={movie.id}
					/>
				))}
			</div>
		</div>
	);
};

export default Row;
