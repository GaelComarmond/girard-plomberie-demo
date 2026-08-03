import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <Image
          src="/girard-plomberie/logo.png"
          alt="Girard Plomberie"
          width={1892}
          height={1224}
        />

        <div className="footer-links">
          <a href="tel:+33767322704">07 67 32 27 04</a>
          <a href="mailto:girardplomberie@gmail.com">girardplomberie@gmail.com</a>
          <span>1–10 Avenue de France, 91300</span>
        </div>

        <div className="footer-nav">
          <a href="#services">Services</a>
          <a href="#realisations">Réalisations</a>
          <a href="#avis">Avis</a>
          <a href="#devis">Devis</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Girard Plomberie</span>
        <span>Concept de site non officiel — démonstration commerciale</span>
      </div>
    </footer>
  );
}
