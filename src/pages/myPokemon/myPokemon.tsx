import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { releaseAllPokemon } from '../../reducers/pokemon';
import { Pagination } from '@material-ui/lab';
import PokemonList from '../../components/pokemonList/pokemonList';
import IPokemon from '../../types/pokemon';
import styles from './myPokemon.module.css';

const MyPokemonPage = () => {
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	const [list, setList] = useState<IPokemon['id'][]>([]);
	const itemPerPage = 10;

	const handlePagination = (e: ChangeEvent<unknown>, newValue: number) => {
		setPage(newValue);
	}

	const releaseAll = () => {
		dispatch(releaseAllPokemon());
	}

	const {caught} = useSelector((state: RootState) => ({
		caught: state.pokemon.caught,
	}));

	useEffect(() => {
		const skip = (page - 1) * itemPerPage;
		const newList = caught.slice(skip, skip + itemPerPage);
		setList(newList);
	}, [page, caught, dispatch]);

	return (
		<>
			<div className={styles.header}>
				<Typography variant={'h4'}>Caught Pokemon <small>({caught.length} total)</small></Typography>
				<Button
					variant={'contained'}
					disabled={!caught.length}
					size={'small'}
					color={'default'}
					onClick={releaseAll}
				>Release All</Button>
			</div>
			<div className={styles.main}>
				<PokemonList list={list}/>
			</div>
			<div className={styles.pagination}>
				<Pagination
					count={Math.ceil(caught.length / itemPerPage)}
					page={page}
					onChange={handlePagination}
					color={'primary'}
					size={'small'}
				/>
			</div>
		</>
	);
}

export default MyPokemonPage;
