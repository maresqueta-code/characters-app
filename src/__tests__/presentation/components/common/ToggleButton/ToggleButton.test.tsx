import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToggleButton } from '@/presentation/components/common/ToggleButton/ToggleButton';

const MockActiveIcon = () => <svg data-testid="active-icon" />;
const MockInactiveIcon = () => <svg data-testid="inactive-icon" />;

const onToggleMock = vi.fn();

describe('ToggleButton tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders initial state', () => {
    render(
      <ToggleButton
        isActive={false}
        onToggle={() => {}}
        ActiveIcon={MockActiveIcon}
        InactiveIcon={MockInactiveIcon}
        label="Toggle btn"
      />,
    );

    const button = screen.getByRole('button', { name: 'Toggle btn' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByTestId('inactive-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('active-icon')).not.toBeInTheDocument();
  });

  it('call onToggle fn when clicking on button', () => {
    render(
      <ToggleButton
        isActive={false}
        onToggle={onToggleMock}
        ActiveIcon={MockActiveIcon}
        InactiveIcon={MockInactiveIcon}
        label="Toggle btn"
      />,
    );

    const button = screen.getByRole('button', { name: 'Toggle btn' });
    fireEvent.click(button);

    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });

  it("call onToggle fn when 'Enter' or 'Espacio' is pressed", () => {
    render(
      <ToggleButton
        isActive={false}
        onToggle={onToggleMock}
        ActiveIcon={MockActiveIcon}
        InactiveIcon={MockInactiveIcon}
        label="Toggle btn"
      />,
    );

    const button = screen.getByRole('button', { name: 'Toggle btn' });
    fireEvent.keyDown(button, { key: 'Enter' });
    fireEvent.keyDown(button, { key: ' ' });

    expect(onToggleMock).toHaveBeenCalledTimes(2);
  });

  it('shows the icon according to btn active or inactive state', () => {
    const { rerender } = render(
      <ToggleButton
        isActive={false}
        onToggle={() => {}}
        ActiveIcon={MockActiveIcon}
        InactiveIcon={MockInactiveIcon}
        label="Toggle btn"
      />,
    );

    expect(screen.getByTestId('inactive-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('active-icon')).not.toBeInTheDocument();

    rerender(
      <ToggleButton
        isActive={true}
        onToggle={() => {}}
        ActiveIcon={MockActiveIcon}
        InactiveIcon={MockInactiveIcon}
        label="Toggle btn"
      />,
    );

    expect(screen.getByTestId('active-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('inactive-icon')).not.toBeInTheDocument();
  });

  it('has the aria-pressed value according to btn state', () => {
    const { rerender } = render(
      <ToggleButton
        isActive={false}
        onToggle={() => {}}
        ActiveIcon={MockActiveIcon}
        InactiveIcon={MockInactiveIcon}
        label="Toggle btn"
      />,
    );

    const button = screen.getByRole('button', { name: 'Toggle btn' });
    expect(button).toHaveAttribute('aria-pressed', 'false');

    rerender(
      <ToggleButton
        isActive={true}
        onToggle={() => {}}
        ActiveIcon={MockActiveIcon}
        InactiveIcon={MockInactiveIcon}
        label="Toggle btn"
      />,
    );

    expect(button).toHaveAttribute('aria-pressed', 'true');
  });
});
