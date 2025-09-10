'use client'

interface ClientLogoProps {
  logoUrl: string
  clientName: string
  websiteUrl?: string | null
}

export default function ClientLogo({ logoUrl, clientName, websiteUrl }: ClientLogoProps) {
  const LogoImage = () => (
    <div className="relative group">
      <img
        src={logoUrl}
        alt={`${clientName} logo`}
        className="max-w-full h-16 object-contain mx-auto filter brightness-90 group-hover:brightness-100 transition-all duration-300"
      />
      {websiteUrl && (
        <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
      )}
    </div>
  )

  if (websiteUrl) {
    return (
      <a
        href={websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
        title={`Visit ${clientName}'s website`}
      >
        <LogoImage />
        <div className="mt-2 text-center">
          <span className="text-xs text-gray-400 group-hover:text-gold transition-colors duration-300">
            Visit Website
          </span>
        </div>
      </a>
    )
  }

  return (
    <div className="p-4 bg-white/5 rounded-lg">
      <LogoImage />
    </div>
  )
}