import {Routes, Route} from 'react-router-dom';

import {Filmes} from '../features/Filmes';
import {Salas} from '../features/Salas';
import {Sessoes} from '../features/Sessoes';
import { Ingressos } from '../features/Ingressos';

export function AppRoutes() {
    return (
        <Routes>
        <Route path="/" element={<h1>Bem-vindo ao CineTech</h1>} />
        <Route path="/filmes" element={<Filmes />} />
        <Route path="/salas" element={<Salas />} />
        <Route path="/sessoes" element={<Sessoes />} />
        <Route path="/ingressos" element={<Ingressos />} />
        <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
    );
}