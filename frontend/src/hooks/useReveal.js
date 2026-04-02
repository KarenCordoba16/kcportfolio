import { useEffect, useRef } from 'react';

export function useReveal(threshold = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px' // se activa un poco antes
      }
    );

    observer.observe(el);

    // 🔴 SOLUCIÓN CLAVE: si ya está visible al cargar
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
      observer.unobserve(el);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}