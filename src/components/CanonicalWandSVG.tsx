import React from 'react';

interface CanonicalWandSVGProps {
  silhouetteType: 
    | 'dumbledore'
    | 'harry'
    | 'hermione'
    | 'ron'
    | 'neville'
    | 'ginny'
    | 'mcgonagall'
    | 'luna'
    | 'voldemort'
    | 'snape'
    | 'bellatrix';
  className?: string;
}

export const CanonicalWandSVG: React.FC<CanonicalWandSVGProps> = ({
  silhouetteType,
  className = 'w-full h-auto',
}) => {
  // Bellatrix has an angled downward sweeping handle, so it uses a taller viewBox (380x95)
  const isBellatrix = silhouetteType === 'bellatrix';
  const viewBox = isBellatrix ? '0 0 380 95' : '0 0 380 60';

  return (
    <svg viewBox={viewBox} className={className} preserveAspectRatio="xMidYMid meet">
      <defs>
        {/* Physically Accurate Longitudinal Wood Grain Filter */}
        <filter id="authenticWoodGrain" x="-5%" y="-10%" width="110%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035 0.8" numOctaves="3" result="woodNoise" />
          <feColorMatrix
            type="matrix"
            values="0.3 0.3 0.3 0 0  0.3 0.3 0.3 0 0  0.3 0.3 0.3 0 0  0 0 0 0.15 0"
            in="woodNoise"
            result="softGrain"
          />
          <feComposite in="SourceGraphic" in2="softGrain" operator="over" />
        </filter>

        {/* 1. Dumbledore Elder Wand Gradients */}
        <linearGradient id="elderWoodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4A321E" />
          <stop offset="20%" stopColor="#8A6038" />
          <stop offset="40%" stopColor="#A87747" />
          <stop offset="70%" stopColor="#694322" />
          <stop offset="90%" stopColor="#3B2310" />
          <stop offset="100%" stopColor="#1E1006" />
        </linearGradient>

        <radialGradient id="elderSphereCluster" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#D4AD7C" />
          <stop offset="30%" stopColor="#966A3D" />
          <stop offset="68%" stopColor="#54361A" />
          <stop offset="95%" stopColor="#281708" />
          <stop offset="100%" stopColor="#120803" />
        </radialGradient>

        <linearGradient id="ivoryRunicBand" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="25%" stopColor="#F5ECE0" />
          <stop offset="65%" stopColor="#CFBEA8" />
          <stop offset="100%" stopColor="#877560" />
        </linearGradient>

        {/* 2. Harry Potter Holly & Bark Gradients */}
        <linearGradient id="harryBarkGrip" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#241B14" />
          <stop offset="25%" stopColor="#4A382A" />
          <stop offset="55%" stopColor="#302318" />
          <stop offset="85%" stopColor="#1C130C" />
          <stop offset="100%" stopColor="#0D0704" />
        </linearGradient>

        <linearGradient id="harryHollyShaft" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5E2C14" />
          <stop offset="22%" stopColor="#A85226" />
          <stop offset="40%" stopColor="#C46733" />
          <stop offset="70%" stopColor="#873D17" />
          <stop offset="90%" stopColor="#451B06" />
          <stop offset="100%" stopColor="#210A02" />
        </linearGradient>

        {/* 3. Hermione Vine Gradients */}
        <linearGradient id="hermioneVineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#664624" />
          <stop offset="22%" stopColor="#B5834A" />
          <stop offset="40%" stopColor="#CCA066" />
          <stop offset="70%" stopColor="#8C5C2A" />
          <stop offset="92%" stopColor="#452A0E" />
          <stop offset="100%" stopColor="#241405" />
        </linearGradient>

        {/* 4. Ron Willow Gradients */}
        <linearGradient id="ronWillowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5E2E10" />
          <stop offset="24%" stopColor="#A85924" />
          <stop offset="42%" stopColor="#C46E31" />
          <stop offset="70%" stopColor="#8A4214" />
          <stop offset="92%" stopColor="#421C04" />
          <stop offset="100%" stopColor="#1E0A01" />
        </linearGradient>

        {/* 5. Neville Cherry Gradients */}
        <linearGradient id="nevilleCherryGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6B3518" />
          <stop offset="24%" stopColor="#B86532" />
          <stop offset="42%" stopColor="#D47D46" />
          <stop offset="70%" stopColor="#964C20" />
          <stop offset="92%" stopColor="#4D200A" />
          <stop offset="100%" stopColor="#240D03" />
        </linearGradient>

        {/* 6. Ginny Anthracite Gradients */}
        <linearGradient id="ginnyTwistGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#242120" />
          <stop offset="25%" stopColor="#47423F" />
          <stop offset="50%" stopColor="#292624" />
          <stop offset="85%" stopColor="#171514" />
          <stop offset="100%" stopColor="#0A0909" />
        </linearGradient>

        {/* 7. McGonagall Gradients */}
        <radialGradient id="mcgAmberGem" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FFF2A3" />
          <stop offset="35%" stopColor="#FFAA1E" />
          <stop offset="70%" stopColor="#CC6600" />
          <stop offset="100%" stopColor="#663300" />
        </radialGradient>

        <linearGradient id="mcgUrnWood" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4D2510" />
          <stop offset="25%" stopColor="#964B22" />
          <stop offset="45%" stopColor="#B35F30" />
          <stop offset="72%" stopColor="#6E3314" />
          <stop offset="92%" stopColor="#331405" />
          <stop offset="100%" stopColor="#140601" />
        </linearGradient>

        <linearGradient id="mcgSteelShaft" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1A1C1E" />
          <stop offset="30%" stopColor="#3D4247" />
          <stop offset="60%" stopColor="#24272B" />
          <stop offset="100%" stopColor="#0D0E0F" />
        </linearGradient>

        {/* 8. Luna Tulipwood Gradients */}
        <linearGradient id="lunaTulipGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#543015" />
          <stop offset="25%" stopColor="#9C5E2D" />
          <stop offset="45%" stopColor="#B8773E" />
          <stop offset="72%" stopColor="#75421A" />
          <stop offset="92%" stopColor="#381D0A" />
          <stop offset="100%" stopColor="#1A0B03" />
        </linearGradient>

        {/* 9. Voldemort Bone Talon Gradients */}
        <linearGradient id="voldemortBoneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="22%" stopColor="#F5EFE0" />
          <stop offset="55%" stopColor="#DDD2BD" />
          <stop offset="85%" stopColor="#A89B84" />
          <stop offset="100%" stopColor="#5E5343" />
        </linearGradient>

        {/* 10. Snape Ebony Gradients */}
        <linearGradient id="snapeEbonyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#242120" />
          <stop offset="25%" stopColor="#4A4542" />
          <stop offset="45%" stopColor="#302C2A" />
          <stop offset="80%" stopColor="#171514" />
          <stop offset="100%" stopColor="#080707" />
        </linearGradient>

        {/* 11. Bellatrix Walnut Gradients */}
        <linearGradient id="bellatrixWalnutGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#291D16" />
          <stop offset="25%" stopColor="#523B2E" />
          <stop offset="55%" stopColor="#3B281D" />
          <stop offset="85%" stopColor="#1F130B" />
          <stop offset="100%" stopColor="#0D0603" />
        </linearGradient>

        <linearGradient id="bellatrixShaftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#54331C" />
          <stop offset="25%" stopColor="#9C6239" />
          <stop offset="45%" stopColor="#B37549" />
          <stop offset="72%" stopColor="#754421" />
          <stop offset="92%" stopColor="#381D0C" />
          <stop offset="100%" stopColor="#1A0B04" />
        </linearGradient>
      </defs>

      {/* RENDER THE SPECIFIC WAND MATCHING THE DESENIO/WARNER BROS POSTER */}
      <>
        
        {/* 1. ALBUS DUMBLEDORE (THE ELDER WAND) */}
        {silhouetteType === 'dumbledore' && (
          <g filter="url(#authenticWoodGrain)">
            {/* Flared elderberry pommel butt with 3 carved oval slots */}
            <path
              d="M 12,30 C 12,18 22,15 32,19 L 32,41 C 22,45 12,42 12,30 Z"
              fill="url(#elderWoodGrad)"
              stroke="#1C0F06"
              strokeWidth="0.8"
            />
            {/* 3 oval slots */}
            <ellipse cx="18" cy="30" rx="2.5" ry="4.5" fill="#0D0602" />
            <ellipse cx="25" cy="23" rx="1.8" ry="2.6" fill="#0D0602" />
            <ellipse cx="25" cy="37" rx="1.8" ry="2.6" fill="#0D0602" />

            {/* Shaft Segment 1 */}
            <path d="M 32,26 L 56,26.5 L 56,33.5 L 32,34 Z" fill="url(#elderWoodGrad)" />
            <line x1="32" y1="27.5" x2="56" y2="28" stroke="#BA9268" strokeWidth="0.7" opacity="0.65" />

            {/* Node 1 (Large Elderberry Sphere) */}
            <circle cx="58" cy="30" r="10" fill="url(#elderSphereCluster)" stroke="#1C0F06" strokeWidth="0.7" />
            {/* Carved stippled pits */}
            <circle cx="54" cy="26" r="1.8" fill="#120803" opacity="0.85" />
            <circle cx="61" cy="32" r="2" fill="#120803" opacity="0.85" />
            <circle cx="59" cy="25" r="1.3" fill="#120803" opacity="0.75" />

            {/* White Bone/Ivory Collar with Ancient Runes */}
            <rect x="71" y="23" width="14" height="14" rx="1.2" fill="url(#ivoryRunicBand)" stroke="#2E1D0F" strokeWidth="0.8" />
            <path d="M 75,26 L 75,34 M 75,29 L 80,26 M 75,31 L 80,34" stroke="#3D2917" strokeWidth="0.9" strokeLinecap="round" />
            <line x1="82" y1="26" x2="82" y2="34" stroke="#3D2917" strokeWidth="0.9" />

            {/* Node 2 */}
            <circle cx="94" cy="30" r="8.5" fill="url(#elderSphereCluster)" stroke="#1C0F06" strokeWidth="0.7" />
            <circle cx="92" cy="27" r="1.5" fill="#120803" opacity="0.8" />

            {/* Segment 2 */}
            <path d="M 102,26.5 L 152,27.2 L 152,32.8 L 102,33.5 Z" fill="url(#elderWoodGrad)" />
            <line x1="102" y1="28" x2="152" y2="28.5" stroke="#BA9268" strokeWidth="0.6" opacity="0.65" />

            {/* Node 3 */}
            <circle cx="155" cy="30" r="7.2" fill="url(#elderSphereCluster)" stroke="#1C0F06" strokeWidth="0.6" />

            {/* Segment 3 */}
            <path d="M 162,27.5 L 210,28 L 210,32 L 162,32.5 Z" fill="url(#elderWoodGrad)" />

            {/* Node 4 */}
            <circle cx="213" cy="30" r="6.0" fill="url(#elderSphereCluster)" stroke="#1C0F06" strokeWidth="0.5" />

            {/* Segment 4 */}
            <path d="M 219,28 L 264,28.5 L 264,31.5 L 219,32 Z" fill="url(#elderWoodGrad)" />

            {/* Node 5 */}
            <circle cx="267" cy="30" r="4.8" fill="url(#elderSphereCluster)" stroke="#1C0F06" strokeWidth="0.5" />

            {/* Tapering Tip */}
            <path d="M 272,28.8 L 368,29.5 L 368,30.5 L 272,31.2 Z" fill="url(#elderWoodGrad)" stroke="#1C0F06" strokeWidth="0.4" />
            <line x1="272" y1="29.5" x2="364" y2="29.9" stroke="#E2C7A8" strokeWidth="0.6" opacity="0.7" />
          </g>
        )}

        {/* 2. HARRY POTTER (HOLLY & CHARRRED TREE BARK) */}
        {silhouetteType === 'harry' && (
          <g filter="url(#authenticWoodGrain)">
            {/* Rough, gnarly charred tree-bark handle */}
            <path
              d="M 12,22 C 16,18 28,16 45,18 C 65,15 88,17 122,21 L 122,39 C 88,43 65,44 45,42 C 28,43 16,42 12,38 Z"
              fill="url(#harryBarkGrip)"
              stroke="#0D0704"
              strokeWidth="0.9"
            />
            {/* Tree-bark ridges, deep wood knots, and organic fissures */}
            <path d="M 22,20 Q 34,28 46,20" stroke="#0D0704" strokeWidth="1.6" fill="none" opacity="0.9" />
            <path d="M 52,22 Q 68,30 84,23" stroke="#0D0704" strokeWidth="1.6" fill="none" opacity="0.9" />
            <path d="M 90,21 Q 104,29 118,22" stroke="#0D0704" strokeWidth="1.6" fill="none" opacity="0.9" />
            <circle cx="36,30" r="3" fill="#0D0704" />
            <circle cx="75,32" r="3.2" fill="#0D0704" />
            <circle cx="106,28" r="2.6" fill="#0D0704" />
            <line x1="16" y1="23" x2="118" y2="24.5" stroke="#7A563C" strokeWidth="0.8" opacity="0.6" />

            {/* Stepped transition collar */}
            <path d="M 122,22 L 132,24 L 132,36 L 122,38 Z" fill="#5E2C14" stroke="#1A0701" strokeWidth="0.8" />

            {/* Smooth warm reddish-chestnut tapering holly shaft */}
            <path d="M 132,24.5 L 368,29.3 L 368,30.7 L 132,35.5 Z" fill="url(#harryHollyShaft)" stroke="#1A0701" strokeWidth="0.7" />
            <line x1="133" y1="26.5" x2="362" y2="29.7" stroke="#EAA478" strokeWidth="0.9" opacity="0.75" />
          </g>
        )}

        {/* 3. HERMIONE GRANGER (GOLDEN VINE WOOD) */}
        {silhouetteType === 'hermione' && (
          <g filter="url(#authenticWoodGrain)">
            {/* Flat base butt collar */}
            <rect x="12" y="24" width="4" height="12" rx="0.5" fill="#4D3216" stroke="#241405" strokeWidth="0.8" />

            {/* Tapering Honey Vine Shaft */}
            <path d="M 16,24.5 L 368,29.3 L 368,30.7 L 16,35.5 Z" fill="url(#hermioneVineGrad)" stroke="#241405" strokeWidth="0.7" />
            <line x1="16" y1="26" x2="364" y2="29.7" stroke="#F0CA92" strokeWidth="0.8" opacity="0.7" />

            {/* Raised Intertwining Botanical Ivy Vine Relief */}
            <path
              d="M 18,30 Q 36,21 54,30 Q 72,39 90,30 Q 108,21 126,30 Q 144,39 162,30 Q 180,21 198,30 Q 216,39 234,30"
              fill="none"
              stroke="#40250E"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 18,30 Q 36,21 54,30 Q 72,39 90,30 Q 108,21 126,30 Q 144,39 162,30 Q 180,21 198,30 Q 216,39 234,30"
              fill="none"
              stroke="#A87236"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* Raised relief leaves */}
            <ellipse cx="36" cy="22" rx="5" ry="2.5" transform="rotate(-25 36 22)" fill="#A87236" stroke="#241405" strokeWidth="0.6" />
            <ellipse cx="72" cy="38" rx="5" ry="2.5" transform="rotate(25 72 38)" fill="#A87236" stroke="#241405" strokeWidth="0.6" />
            <ellipse cx="108" cy="22" rx="4.5" ry="2.2" transform="rotate(-25 108 22)" fill="#A87236" stroke="#241405" strokeWidth="0.6" />
            <ellipse cx="144" cy="38" rx="4.5" ry="2.2" transform="rotate(25 144 38)" fill="#A87236" stroke="#241405" strokeWidth="0.6" />
            <ellipse cx="180" cy="23" rx="4" ry="2" transform="rotate(-20 180 23)" fill="#A87236" stroke="#241405" strokeWidth="0.6" />
          </g>
        )}

        {/* 4. RON WEASLEY (FACETED RED WILLOW) */}
        {silhouetteType === 'ron' && (
          <g filter="url(#authenticWoodGrain)">
            {/* Chunky bulbous rough bark pommel */}
            <path
              d="M 12,30 C 12,20 24,16 42,18 C 60,20 74,24 88,25 L 88,35 C 74,36 60,40 42,42 C 24,44 12,40 12,30 Z"
              fill="url(#ronWillowGrad)"
              stroke="#1E0A01"
              strokeWidth="0.9"
            />
            {/* Hand-carved whittled facet gouges along the shaft */}
            <path d="M 28,21 Q 48,27 70,22" stroke="#421C04" strokeWidth="1.5" fill="none" />
            <path d="M 30,39 Q 50,33 72,38" stroke="#421C04" strokeWidth="1.5" fill="none" />

            <path d="M 88,25.5 L 368,29.2 L 368,30.8 L 88,34.5 Z" fill="url(#ronWillowGrad)" stroke="#1E0A01" strokeWidth="0.7" />
            <line x1="89" y1="27.5" x2="362" y2="29.8" stroke="#EFA56D" strokeWidth="0.9" opacity="0.7" />
            {/* Faceted plane lines */}
            <path d="M 98,28.5 Q 160,26 230,29.5 Q 290,28.5 350,29.8" stroke="#421C04" strokeWidth="0.8" fill="none" opacity="0.6" />
          </g>
        )}

        {/* 5. NEVILLE LONGBOTTOM (BRAIDED ROPE CHERRY WOOD) */}
        {silhouetteType === 'neville' && (
          <g filter="url(#authenticWoodGrain)">
            {/* Thick Braided Triple-Rope Twist Handle */}
            <ellipse cx="15" cy="30" rx="4" ry="8" fill="#4D200A" stroke="#1E0A01" strokeWidth="0.8" />
            
            {/* Braided strands */}
            <path d="M 17,21 Q 28,19 39,31 Q 50,43 61,42 Q 72,38 83,27 Q 94,16 105,28 L 105,28" fill="none" stroke="#4D200A" strokeWidth="7" strokeLinecap="round" />
            <path d="M 17,39 Q 28,41 39,29 Q 50,17 61,18 Q 72,22 83,33 Q 94,44 105,32 L 105,32" fill="none" stroke="#B86532" strokeWidth="6.2" strokeLinecap="round" />
            <path d="M 17,21 Q 28,19 39,31 Q 50,43 61,42" fill="none" stroke="#F5A775" strokeWidth="1.4" opacity="0.75" />

            {/* Distinct Turned Ring Collar */}
            <rect x="105" y="25" width="5" height="10" rx="1" fill="#C49F58" stroke="#4D200A" strokeWidth="0.7" />

            {/* Smooth Straight Warm Cherry Shaft */}
            <path d="M 110,26.5 L 368,29.4 L 368,30.6 L 110,33.5 Z" fill="url(#nevilleCherryGrad)" stroke="#1E0A01" strokeWidth="0.7" />
            <line x1="111" y1="27.8" x2="362" y2="29.8" stroke="#F5A775" strokeWidth="0.9" opacity="0.75" />
          </g>
        )}

        {/* 6. GINNY WEASLEY (BARLEY-TWIST ANTHRACITE) */}
        {silhouetteType === 'ginny' && (
          <g filter="url(#authenticWoodGrain)">
            {/* Rounded Pommel Bead */}
            <circle cx="16" cy="30" r="4.8" fill="#242120" stroke="#080707" strokeWidth="0.8" />
            
            {/* Segmented carved barley twist handle */}
            <ellipse cx="26" cy="30" rx="5.5" ry="7.5" transform="rotate(32 26 30)" fill="#47423F" stroke="#080707" strokeWidth="0.8" />
            <ellipse cx="38" cy="30" rx="5.5" ry="7.5" transform="rotate(-32 38 30)" fill="#292624" stroke="#080707" strokeWidth="0.8" />
            <ellipse cx="50" cy="30" rx="5.2" ry="7" transform="rotate(32 50 30)" fill="#47423F" stroke="#080707" strokeWidth="0.8" />
            <ellipse cx="62" cy="30" rx="5.2" ry="7" transform="rotate(-32 62 30)" fill="#292624" stroke="#080707" strokeWidth="0.8" />
            <ellipse cx="74" cy="30" rx="4.8" ry="6.5" transform="rotate(32 74 30)" fill="#47423F" stroke="#080707" strokeWidth="0.8" />
            <ellipse cx="86" cy="30" rx="4.8" ry="6.5" transform="rotate(-32 86 30)" fill="#292624" stroke="#080707" strokeWidth="0.8" />
            <ellipse cx="98" cy="30" rx="4.2" ry="5.8" transform="rotate(32 98 30)" fill="#47423F" stroke="#080707" strokeWidth="0.8" />

            {/* Very sleek, thin straight matte black shaft */}
            <path d="M 103,28 L 368,29.6 L 368,30.4 L 103,32 Z" fill="url(#ginnyTwistGrad)" stroke="#080707" strokeWidth="0.6" />
            <line x1="104" y1="28.8" x2="362" y2="29.9" stroke="#756E68" strokeWidth="0.6" opacity="0.65" />
          </g>
        )}

        {/* 7. MINERVA MCGONAGALL (AMBER GEMSTONE & TURNED BALUSTER URN WITH BLACK NEEDLE SHAFT) */}
        {silhouetteType === 'mcgonagall' && (
          <g filter="url(#authenticWoodGrain)">
            {/* Amber Gemstone Rounded Finial */}
            <ellipse cx="16" cy="30" rx="4.5" ry="3.5" fill="url(#mcgAmberGem)" stroke="#663300" strokeWidth="0.7" />

            {/* Spool rings */}
            <rect x="21" y="27" width="4" height="6" fill="#331405" />
            <rect x="25" y="26" width="3" height="8" fill="#B35F30" />

            {/* Prominent Architectural Turned Urn Bead in Reddish Scottish Fir */}
            <ellipse cx="42" cy="30" rx="12" ry="10" fill="url(#mcgUrnWood)" stroke="#140601" strokeWidth="0.9" />
            <circle cx="38" cy="27" r="2.8" fill="#FFAA66" opacity="0.65" />

            {/* Turned spool waist and brass collar */}
            <rect x="54" y="27.5" width="6" height="5" fill="#331405" />
            <ellipse cx="68" cy="30" rx="8" ry="7.5" fill="url(#mcgUrnWood)" stroke="#140601" strokeWidth="0.8" />
            <rect x="76" y="27" width="4" height="6" fill="#C49F58" />

            {/* Turned Wood Collar */}
            <path d="M 80,26.5 L 105,27.5 L 105,32.5 L 80,33.5 Z" fill="url(#mcgUrnWood)" stroke="#140601" strokeWidth="0.7" />

            {/* DISTINCTIVE SLEEK DARK BLACK/STEEL NEEDLE SHAFT (Matches poster!) */}
            <path d="M 105,28.2 L 368,29.7 L 368,30.3 L 105,31.8 Z" fill="url(#mcgSteelShaft)" stroke="#0D0E0F" strokeWidth="0.5" />
            <line x1="106" y1="28.9" x2="364" y2="29.9" stroke="#6C757D" strokeWidth="0.6" opacity="0.8" />
          </g>
        )}

        {/* 8. LUNA LOVEGOOD (SCULPTED TULIP / BELLFLOWER BLOSSOM) */}
        {silhouetteType === 'luna' && (
          <g filter="url(#authenticWoodGrain)">
            {/* Carved 4-Petal Tulip/Bellflower Blossom Handle */}
            <path
              d="M 14,30 C 14,19 26,14 42,16 C 58,18 72,22 88,24 L 88,36 C 72,38 58,42 42,44 C 26,46 14,41 14,30 Z"
              fill="url(#lunaTulipGrad)"
              stroke="#1A0B03"
              strokeWidth="0.8"
            />
            {/* Scalloped Bellflower Petals flaring outward at the pommel */}
            <path d="M 14,24 Q 28,16 42,16" stroke="#1A0B03" strokeWidth="1.2" fill="none" />
            <path d="M 14,36 Q 28,44 42,44" stroke="#1A0B03" strokeWidth="1.2" fill="none" />
            <path d="M 32,18 Q 48,30 68,22" stroke="#381D0A" strokeWidth="1.2" fill="none" />
            <path d="M 32,42 Q 48,30 68,38" stroke="#381D0A" strokeWidth="1.2" fill="none" />
            <circle cx="48" cy="30" r="3" fill="#DFA875" opacity="0.6" />

            {/* Turned Ring Collar */}
            <rect x="88" y="26" width="5" height="8" rx="0.5" fill="#543015" stroke="#1A0B03" strokeWidth="0.6" />

            {/* Straight Tulipwood Shaft */}
            <path d="M 93,27 L 368,29.4 L 368,30.6 L 93,33 Z" fill="url(#lunaTulipGrad)" stroke="#1A0B03" strokeWidth="0.6" />
            <line x1="94" y1="28.2" x2="362" y2="29.8" stroke="#F5C49A" strokeWidth="0.8" opacity="0.7" />
          </g>
        )}

        {/* 9. LORD VOLDEMORT (BLEACHED BONE BIRD SKULL TALON WITH SPURS) */}
        {silhouetteType === 'voldemort' && (
          <g filter="url(#authenticWoodGrain)">
            {/* Hooked Bird Skull / Talon Pommel with downward curved spurs */}
            <path
              d="M 14,44 C 10,32 16,14 34,16 C 54,18 72,24 96,25 L 96,33 C 74,32 54,29 36,25 C 26,23 20,30 24,38 C 26,43 20,47 14,44 Z"
              fill="url(#voldemortBoneGrad)"
              stroke="#3B3429"
              strokeWidth="0.9"
            />
            {/* Upward pointed bone spur at the collar (authentic to movie prop!) */}
            <path d="M 92,25 L 98,16 L 96,26 Z" fill="url(#voldemortBoneGrad)" stroke="#3B3429" strokeWidth="0.8" />
            
            {/* Mottled dark grey/speckled transitional throat */}
            <path d="M 96,26 L 145,27 L 145,31 L 96,32 Z" fill="#474139" stroke="#2B2722" strokeWidth="0.7" />
            {/* Mottled speckles */}
            <circle cx="106" cy="28" r="1.2" fill="#24211D" />
            <circle cx="118" cy="30" r="1.3" fill="#24211D" />
            <circle cx="132" cy="28.5" r="1.2" fill="#24211D" />

            {/* Pale Chalky Bone Tapering Shaft */}
            <path d="M 145,27 L 368,29.4 L 368,30.6 L 145,31 Z" fill="url(#voldemortBoneGrad)" stroke="#3B3429" strokeWidth="0.6" />
            <line x1="145" y1="28" x2="362" y2="29.8" stroke="#FFFFFF" strokeWidth="0.9" opacity="0.95" />
          </g>
        )}

        {/* 10. SEVERUS SNAPE (EBONY WITH GOTHIC ARCHITECTURAL TRACERY PANELS) */}
        {silhouetteType === 'snape' && (
          <g filter="url(#authenticWoodGrain)">
            {/* Flat Ebony End Butt */}
            <rect x="12" y="24" width="6" height="12" rx="1" fill="#141312" stroke="#050505" strokeWidth="0.9" />

            {/* Gothic Architectural Relief Panels */}
            <path
              d="M 18,23 L 95,24.5 L 95,35.5 L 18,37 Z"
              fill="url(#snapeEbonyGrad)"
              stroke="#080707"
              strokeWidth="0.9"
            />
            {/* Raised Rectangular Tracery Relief */}
            <rect x="24" y="25" width="28" height="10" fill="none" stroke="#7A736D" strokeWidth="0.9" />
            <line x1="38" y1="25" x2="38" y2="35" stroke="#7A736D" strokeWidth="0.9" />
            <rect x="58" y="25.5" width="28" height="9" fill="none" stroke="#7A736D" strokeWidth="0.9" />
            <line x1="72" y1="25.5" x2="72" y2="34.5" stroke="#7A736D" strokeWidth="0.9" />

            {/* Stepped Collar */}
            <rect x="95" y="26.5" width="5" height="7" fill="#6B645E" rx="0.5" />

            {/* Smooth, Razor-Straight Piano-Black Shaft */}
            <path d="M 100,27.5 L 368,29.5 L 368,30.5 L 100,32.5 Z" fill="url(#snapeEbonyGrad)" stroke="#080707" strokeWidth="0.6" />
            <line x1="101" y1="28.5" x2="362" y2="29.8" stroke="#8A827B" strokeWidth="0.75" opacity="0.75" />
          </g>
        )}

        {/* 11. BELLATRIX LESTRANGE (ANGULAR CURVED PISTOL GRIP IN DARK WALNUT) */}
        {silhouetteType === 'bellatrix' && (
          <g filter="url(#authenticWoodGrain)">
            {/* Dramatic Curved Downward Pistol Grip (Authentic to poster!) */}
            <path
              d="M 28,84 C 20,80 18,68 32,54 C 54,34 92,25 145,26 L 145,34 C 94,33 60,42 42,60 C 34,70 34,78 38,82 Z"
              fill="url(#bellatrixWalnutGrad)"
              stroke="#0D0603"
              strokeWidth="1"
            />
            {/* Bark/leather knurling on curved handle */}
            <path d="M 46,55 Q 65,42 90,34" stroke="#1F130B" strokeWidth="1.4" fill="none" />
            <path d="M 52,65 Q 75,50 102,40" stroke="#1F130B" strokeWidth="1.4" fill="none" />

            {/* Prominent Knurled Elbow Joint */}
            <circle cx="145" cy="30" r="6" fill="#3B281D" stroke="#0D0603" strokeWidth="0.8" />

            {/* Straight Walnut Shaft extending forward */}
            <path d="M 148,27.5 L 368,29.4 L 368,30.6 L 148,32.5 Z" fill="url(#bellatrixShaftGrad)" stroke="#0D0603" strokeWidth="0.6" />
            <line x1="149" y1="28.5" x2="362" y2="29.8" stroke="#DCA074" strokeWidth="0.8" opacity="0.7" />
          </g>
        )}
      </>
    </svg>
  );
};
