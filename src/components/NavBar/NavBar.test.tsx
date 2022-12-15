import NavBar from './NavBar';
import { renderWithProviders } from '../../utils/test';
import { getAllByRole } from '@testing-library/react';

describe('NavBar', () => {
  const defaultProps = {
    links: [
      { text: 'Link1', href: '/link1' },
      { text: 'Link2', href: '/link2' },
      { text: 'Link3', href: '/link3' },
    ],
  };

  it('should render NavBar links', () => {
    const { getByText } = renderWithProviders(<NavBar {...defaultProps} />);

    expect(getByText('Link1')).toBeInTheDocument();
    expect(getByText('Link2')).toBeInTheDocument();
    expect(getByText('Link3')).toBeInTheDocument();
  });

  it('should have an href attribute on all NavBar links', () => {
    const { getByText } = renderWithProviders(<NavBar {...defaultProps} />);

    expect(getByText('Link1')).toHaveAttribute('href');
    expect(getByText('Link2')).toHaveAttribute('href');
    expect(getByText('Link3')).toHaveAttribute('href');
  });

  // TODO: Challenge 2
  it('should render an `href` attribute for each link', () => {});
});
