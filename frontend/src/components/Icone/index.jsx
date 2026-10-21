export default function Icone({ nome }) {
    const desenhos = {
        jogos: <><path d="M7 7h10c2 0 3 1 3.5 3l1 6c.5 3-2 4-4 1l-1-1h-9l-1 1c-2 3-4.5 2-4-1l1-6C4 8 5 7 7 7Z" /><path d="M7 10v5M4.5 12.5h5M16 11h.01M18 14h.01" /></>,
        grade: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
        mais: <path d="M12 5v14M5 12h14" />,
        caixa: <><path d="m12 3 9 5v8l-9 5-9-5V8l9-5ZM3 8l9 5 9-5M12 13v8M7.5 5.5l9 5" /></>,
        valor: <><rect x="3" y="5" width="18" height="15" rx="2" /><path d="M3 9h18M16 15h2M6 5V3h11" /></>,
        busca: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
        editar: <path d="m15 4 5 5M4 20l5-1L21 7a2 2 0 0 0-4-4L5 15l-1 5Z" />,
        excluir: <path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7" />,
        seta: <path d="M5 12h14M13 6l6 6-6 6" />,
        voltar: <path d="M19 12H5M11 6l-6 6 6 6" />,
        alerta: <><path d="m12 3 10 18H2L12 3ZM12 9v5M12 17h.01" /></>,
    };

    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{desenhos[nome] || desenhos.jogos}</svg>;
}
