const socials = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/ike-hu/posts/?feedView=all",
    icon: (
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1s2.5 1.12 2.5 2.5ZM.35 8h4.25v14H.35V8Zm7.35 0h4.08v1.91h.06c.57-1.08 1.96-2.22 4.04-2.22 4.32 0 5.12 2.84 5.12 6.54V22h-4.25v-6.88c0-1.64-.03-3.75-2.28-3.75-2.29 0-2.64 1.79-2.64 3.63V22H7.7V8Z" />
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/ikehu_in/?__pwa=1",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1.1" />
      </>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@ikehu_in?si=WzkzV8qKexjotUMw",
    icon: (
      <>
        <path d="M22 12s0-3.2-.41-4.74a2.8 2.8 0 0 0-1.97-1.98C17.88 4.8 12 4.8 12 4.8s-5.88 0-7.62.48A2.8 2.8 0 0 0 2.4 7.26C2 8.8 2 12 2 12s0 3.2.4 4.74a2.8 2.8 0 0 0 1.98 1.98c1.74.48 7.62.48 7.62.48s5.88 0 7.62-.48a2.8 2.8 0 0 0 1.97-1.98C22 15.2 22 12 22 12Z" />
        <path d="m10 15.4 5.2-3.4L10 8.6v6.8Z" className="social-icon-cut" />
      </>
    ),
  },
  {
    name: "X",
    href: "https://x.com/ikehu_in",
    icon: (
      <path d="M14.2 10.2 22.4 1h-1.95l-7.12 8.01L7.64 1H1.08l8.6 12.1L1.08 23h1.95l7.52-8.46L16.56 23h6.56l-8.92-12.8Zm-2.66 3-.87-1.2L3.74 2.42h2.97l5.6 7.75.87 1.2 7.27 10.06h-2.97l-5.94-8.23Z" />
    ),
  },
];

export default function SocialLinks({ className = "", showLabels = false }) {
  return (
    <div className={`social-links ${className}`} aria-label="Ikehu social links">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          aria-label={social.name}
          title={social.name}
          data-cursor-hover="true"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {social.icon}
          </svg>
          {showLabels && <span>{social.name}</span>}
        </a>
      ))}
    </div>
  );
}
