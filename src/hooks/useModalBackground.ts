import { useEffect } from 'react';

export default function useModalBackground(isOpen: boolean, targets: string[] = ['.app-content']) {
  useEffect(() => {
    const els = targets
      .map(sel => document.querySelector<HTMLElement>(sel))
      .filter((el): el is HTMLElement => !!el);

    const className = 'blurred';

    if (isOpen) {
      els.forEach(el => el.classList.add(className));
    } else {
      els.forEach(el => el.classList.remove(className));
    }

    return () => {
      els.forEach(el => el.classList.remove(className));
    };
  }, [isOpen, JSON.stringify(targets)]);
}
