import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="site-footer page-width">
      <a
        className="footer-signature"
        href="#main-content"
        aria-label="Chris Anorga, return to top"
      >
        CHRIS ANORGA<span aria-hidden>+</span>
      </a>
      <p>
        © {new Date().getFullYear()} {site.name}
      </p>
      <span>Built with care in San Diego.</span>
      <a href="#main-content">Back to top</a>
    </footer>
  );
}
