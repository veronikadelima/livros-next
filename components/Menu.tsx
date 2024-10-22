import React from 'react';
import Link from 'next/link';

export const Menu: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link href="/" passHref legacyBehavior>
          <a className="navbar-brand">Loja Next</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href='/' passHref legacyBehavior>
                <a className="nav-link">Página Inicial</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/livrolista" passHref legacyBehavior>
                <a className="nav-link">Lista de Livros</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/livrodados" passHref legacyBehavior>
                <a className="nav-link">Cadastro de Livros</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
