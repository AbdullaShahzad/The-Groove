import React from 'react';

export const EditorialFooter: React.FC = () => {
  return (
    <footer className="border-t border-[#E2DBD0] bg-[#ECE8DF] text-[#1C1917] py-14 sm:py-18 select-none">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#DDD5C7]">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-serif text-2xl font-bold tracking-[0.2em] uppercase text-[#1C1917]">
              THE GROOVE
            </span>
            <p className="text-xs font-mono uppercase tracking-widest text-[#7A7165]">
              INDEPENDENT ARCHIVAL BOOKSELLERS · EST. MMXXVI
            </p>
            <p className="text-xs text-[#524A40] leading-relaxed max-w-sm pt-2">
              Preserving classic and contemporary literature in bespoke clothbound editions. Hand-stamped in 24kt gold foil on archival Swedish wove paper.
            </p>
          </div>

          {/* Physical Locations */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-[10px] tracking-[0.2em] text-[#BC472A] uppercase font-semibold block">
              BOOKSHOP ATELIERS
            </span>
            <div className="space-y-1 text-[#473F35]">
              <p className="font-bold text-[#1C1917]">THE GROOVE SOHO</p>
              <p>84 Mercer Street</p>
              <p>New York, NY 10012</p>
              <p className="text-[#7A7165] text-[11px] pt-1">Tue–Sun, 10am–8pm</p>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-[10px] tracking-[0.2em] text-[#BC472A] uppercase font-semibold block">
              LONDON STACKS
            </span>
            <div className="space-y-1 text-[#473F35]">
              <p className="font-bold text-[#1C1917]">THE GROOVE BLOOMSBURY</p>
              <p>14 Great Russell Street</p>
              <p>London WC1B 3BA</p>
              <p className="text-[#7A7165] text-[11px] pt-1">Mon–Sat, 11am–7pm</p>
            </div>
          </div>

          {/* Guarantees */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs">
            <span className="text-[10px] tracking-[0.2em] text-[#BC472A] uppercase font-semibold block">
              CURATORIAL PROMISE
            </span>
            <ul className="space-y-1.5 text-[#524A40] text-[11px]">
              <li>· Acid-free cloth bindings</li>
              <li>· 24kt blind gold foil</li>
              <li>· Carbon-neutral courier</li>
              <li>· Archival tissue wrap</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] sm:text-[11px] font-mono text-[#7A7165] gap-2">
          <span>THE GROOVE ARCHIVE © MMXXVI · ALL RIGHTS RESERVED</span>
          <span>OCTAVO &amp; FOLIO PRESS · PRINTED IN SWEDEN</span>
        </div>

      </div>
    </footer>
  );
};
