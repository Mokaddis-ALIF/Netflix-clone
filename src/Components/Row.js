import movieTrailer from 'movie-trailer';

import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import instance from '../axios';
import './Row.css';

const base_url = 'https://image.tmdb.org/t/p/w500/';

const Row = ({ title, fetchUrl, isLargeRow }) => {
	const [movies, setMovies] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState('');

	// const handleClick = (movie) => {
	// 	if (trailerUrl) {
	// 		setTrailerUrl('');
	// 	} else {
	// 		movieTrailer(movie?.name || '').then((url) => console.log(url));
	// 		// .then((url) => {
	// 		// 	const urlParams = new URLSearchParams(new URL(url).search);
	// 		// 	console.log(urlParams.get('v'));
	// 		// 	setTrailerUrl(urlParams.get('v'));
	// 		// })
	// 		// .catch((err) => console.log(err));
	// 	}
	// };

	const handleClick = (movie) => {
		if (trailerUrl) {
			setTrailerUrl('');
		} else {
			movieTrailer(movie?.name || movie?.title || movie?.original_title || '')
				.then((url) => {
					const urlParams = new URLSearchParams(new URL(url).search);
					setTrailerUrl(urlParams.get('v'));
				})
				.catch((error) => console.log(error));
		}
	};

	useEffect(() => {
		async function fetchData() {
			const request = await instance.get(fetchUrl);
			setMovies(request.data.results);
			return request;
		}

		fetchData();
	}, [fetchUrl]);

	// console.log(movies);
	const opts = {
		height: '390',
		width: '100%',
		playersVars: {
			autoplay: 1,
		},
	};

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
						onClick={() => handleClick(movie)}
					/>
				))}
			</div>

			{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
		</div>
	);
};

export default Row;
