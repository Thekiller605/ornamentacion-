import { FC } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'white' | 'gold';
}

const Logo: FC<LogoProps> = ({ className = "h-12", variant = 'white' }) => {
  const primaryColor = variant === 'gold' ? '#eab308' : '#ffffff';
  const accentColor = '#eab308'; // Gold color for the signature
  
  return (
    <svg 
      viewBox="0 0 300 150" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* DO Letters - Background */}
      <text 
        x="75" 
        y="115" 
        fontFamily="Montserrat, sans-serif" 
        fontWeight="900" 
        fontSize="120" 
        fill={variant === 'white' ? '#ffffff' : '#eab308'}
        fillOpacity="0.15"
        textAnchor="middle"
        style={{ letterSpacing: '-5px' }}
      >
        D
      </text>
      <text 
        x="225" 
        y="115" 
        fontFamily="Montserrat, sans-serif" 
        fontWeight="900" 
        fontSize="120" 
        fill={variant === 'white' ? '#ffffff' : '#eab308'}
        fillOpacity="0.15"
        textAnchor="middle"
        style={{ letterSpacing: '-5px' }}
      >
        O
      </text>
      
      {/* Horizontal Line - Metal Bar Effect */}
      <line 
        x1="40" 
        y1="75" 
        x2="260" 
        y2="75" 
        stroke={accentColor} 
        strokeWidth="2" 
        strokeOpacity="0.5"
      />

      {/* David Ortiz Script - Foreground */}
      {/* We add a stroke to simulate a cutout effect against the background letters */}
      <text 
        x="150" 
        y="85" 
        fontFamily="'Great Vibes', cursive" 
        fontSize="72" 
        fill={accentColor} 
        textAnchor="middle"
        stroke="#1a1a1a"
        strokeWidth="4"
        paintOrder="stroke"
        style={{ 
          filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.5))',
          dominantBaseline: 'middle'
        }}
      >
        David Ortiz
      </text>
      
      {/* Ornamentador Text */}
      <text 
        x="150" 
        y="135" 
        fontFamily="Montserrat, sans-serif" 
        fontWeight="600" 
        fontSize="18" 
        letterSpacing="8"
        fill={variant === 'white' ? '#ffffff' : '#1a1a1a'}
        textAnchor="middle"
      >
        ORNAMENTADOR
      </text>
    </svg>
  );
};

export default Logo;
