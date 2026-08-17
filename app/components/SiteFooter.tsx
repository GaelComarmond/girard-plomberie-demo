import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand-block">
          <Image
            src="/girard-plomberie/logo.png"
            alt="Girard Plomberie"
            width={1892}
            height={1224}
          />
          <p>Installation, dépannage et réparation de plomberie et d’équipements sanitaires.</p>
        </div>

        <div className="footer-column">
          <strong>Contact</strong>
          <a href="tel:+33767322704">07 67 32 27 04</a>
          <a href="mailto:girardplomberie@gmail.com">girardplomberie@gmail.com</a>
        </div>

        <div className="footer-column">
          <strong>Adresse</strong>
          <span>1–10 Avenue de France</span>
          <span>91300</span>
        </div>

        <nav className="footer-column" aria-label="Navigation de pied de page">
          <strong>Navigation</strong>
          <a href="#services">Services</a>
          <a href="#avis">Avis clients</a>
          <a href="#contact">Contact</a>
          <a href="#devis">Demande de devis</a>
        </nav>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Girard Plomberie</span>
        <span>Concept de site non officiel — démonstration commerciale</span>
      </div>
    </footer>
  );
}
