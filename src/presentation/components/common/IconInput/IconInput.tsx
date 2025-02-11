import type { ChangeEventHandler, InputHTMLAttributes, ReactNode } from 'react';
import './IconInput.css';

interface InputWithIconProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: ChangeEventHandler<HTMLInputElement>;
  children: ReactNode;
}

export function IconInput({ onChange, children, ...rest }: InputWithIconProps) {
  return (
    <div className="input-container">
      <div className="input-icon">{children}</div>
      <input
        type="search"
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}
