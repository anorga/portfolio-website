import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="site-footer page-width">
      <a
        className="footer-signature"
        href="#main-content"
        aria-label="Chris Anorga, return to top"
      >
        <span className="footer-name" aria-hidden>
          {Array.from(site.name.toUpperCase(), (letter, index) => (
            <span
              className="footer-letter"
              key={index}
              style={{ animationDelay: `${index * 22}ms` }}
            >
              {letter}
            </span>
          ))}
        </span>
        <span className="return-arrow" aria-hidden>
          ↑
        </span>
      </a>
      <p>
        © {new Date().getFullYear()} {site.name}
      </p>
      <span>Built with care in San Diego.</span>
      <a href="#main-content">Back to top</a>
    </footer>
  );
}
