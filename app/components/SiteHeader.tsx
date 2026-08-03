"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const PHONE_LINK = "+33767322704";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <a className="brand-link" href="#accueil" aria-label="Girard Plomberie — accueil">
        <Image
          src="/girard-plomberie/logo.png"
          alt="Girard Plomberie — installations et dépannages"
          width={1892}
          height={1224}
          priority
        />
      </a>

      <nav className="desktop-nav" aria-label="Navigation principale">
        <a href="#services">Services</a>
        <a href="#realisations">Réalisations</a>
        <a href="#avis">Avis</a>
        <a href="#devis">Devis</a>
      </nav>

      <a className="header-phone" href={`tel:${PHONE_LINK}`}>
        <span>Appeler</span>
        <strong>07 67 32 27 04</strong>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span />
        <span />
      </button>

      <div className={`mobile-menu ${open ? "is-open" : ""}`}>
        <div className="mobile-menu-inner">
          <p className="mobile-menu-label">Navigation</p>
          <a href="#services" onClick={close}>Services</a>
          <a href="#realisations" onClick={close}>Réalisations</a>
          <a href="#avis" onClick={close}>Avis clients</a>
          <a href="#devis" onClick={close}>Demander un devis</a>
          <a className="mobile-phone" href={`tel:${PHONE_LINK}`} onClick={close}>
            07 67 32 27 04
          </a>
        </div>
      </div>
    </header>
  );
}
