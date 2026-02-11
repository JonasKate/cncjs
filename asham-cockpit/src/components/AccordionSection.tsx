import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { CaseModule } from '../types/models';

export const AccordionSection = ({ module }: { module: CaseModule }) => {
  const [open, setOpen] = useState(true);

  return (
    <section className="kachel">
      <button className="accordion-trigger" onClick={() => setOpen((prev) => !prev)}>
        <strong>{module.moduleKey}</strong>
        <ChevronDown className={open ? 'rotated' : ''} size={18} />
      </button>
      {open ? (
        <div className="accordion-content">
          {Object.entries(module.payload).map(([key, value]) => (
            <div key={key} className="module-row">
              <span>{key}</span>
              <strong>{String(value)}</strong>
            </div>
          ))}
          <p className="muted">Stand: {new Date(module.updatedAt).toLocaleString('de-DE')}</p>
        </div>
      ) : null}
    </section>
  );
};
