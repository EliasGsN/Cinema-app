import {Routes, Route} from 'react-router-dom';
import {Filmes} from '../features/Filmes';
import {Salas} from '../features/Salas';
import {Sessoes} from '../features/Sessoes';
import { Ingressos } from '../features/Ingressos';

export function AppRoutes() {
    return (
        <Routes>
        <Route path="/" element={<main><h1>Bem-vindo ao CineTech</h1></main>} />
        <Route path="/filmes" element={<main><Filmes /></main>} />
        <Route path="/salas" element={<main><Salas /></main>} />
        <Route path="/sessoes" element={<main><Sessoes /></main>} />
        <Route path="/ingressos" element={<main><Ingressos /></main>} />
        <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
    );
}