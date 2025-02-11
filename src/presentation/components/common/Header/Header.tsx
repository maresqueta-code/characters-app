import type { ReactNode } from 'react';
import './Header.css';

export interface HeaderProps {
  children?: ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="header">
      <div className="items-container">{children}</div>
    </header>
  );
}
