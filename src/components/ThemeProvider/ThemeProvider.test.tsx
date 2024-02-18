import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, useTheme, adjustLightness, generateColorPalette } from './ThemeProvider';

// Tests for adjustLightness function
describe('adjustLightness', () => {
  it('increases lightness correctly', () => {
    expect(adjustLightness(50, 0.1)).toBe(60);
  });

  it('decreases lightness correctly', () => {
    expect(adjustLightness(50, -0.1)).toBe(40);
  });

  it('does not exceed the maximum lightness', () => {
    expect(adjustLightness(95, 0.1)).toBe(100);
  });

  it('does not drop below the minimum lightness', () => {
    expect(adjustLightness(5, -0.1)).toBe(0);
  });
});

// Tests for generateColorPalette function
describe('generateColorPalette', () => {
  it('generates the correct color palette for a given hue', () => {
    const hue = 180;
    const palette = generateColorPalette(hue);
    expect(palette.primaryColour1).toBe('hsl(180, 100%, 70%)');
    expect(palette.primaryColour2).toBe('hsl(180, 100%, 60%)');
    expect(palette.primaryColour3).toBe('hsl(180, 100%, 50%)');
    expect(palette.primaryColour4).toBe('hsl(180, 100%, 40%)');
    expect(palette.primaryColour5).toBe('hsl(180, 100%, 30%)');

    expect(palette.secondaryColour1).toBe('hsl(0, 100%, 70%)');
    expect(palette.secondaryColour2).toBe('hsl(0, 100%, 60%)');
    expect(palette.secondaryColour3).toBe('hsl(0, 100%, 50%)');
    expect(palette.secondaryColour4).toBe('hsl(0, 100%, 40%)');
    expect(palette.secondaryColour5).toBe('hsl(0, 100%, 30%)');

    expect(palette.danger).toBe('hsl(0, 100%, 50%)');
    expect(palette.success).toBe('hsl(120, 100%, 50%)');
    expect(palette.info).toBe('hsl(240, 100%, 50%)');
    expect(palette.warning).toBe('hsl(60, 100%, 50%)');

    expect(palette.white).toBe('hsl(0, 0%, 100%)');
    expect(palette.grey1).toBe('hsl(0, 0%, 80%)');
    expect(palette.grey2).toBe('hsl(0, 0%, 60%)');
    expect(palette.grey3).toBe('hsl(0, 0%, 40%)');
    expect(palette.grey4).toBe('hsl(0, 0%, 20%)');
    expect(palette.black).toBe('hsl(0, 0%, 0%)');
  });
});

// Tests for ThemeProvider and useTheme hook
describe('ThemeProvider and useTheme hook', () => {
  const TestComponent = () => {
    const theme = useTheme();
    return <div data-testid="theme">{JSON.stringify(theme)}</div>;
  };

  it('provides the theme context to consuming components', () => {
    render(
      <ThemeProvider colour={180}>
        <TestComponent />
      </ThemeProvider>
    );

    const themeDiv = screen.getByTestId('theme');
    const theme = JSON.parse(themeDiv.textContent || '{}');
    expect(theme.palette.primaryColour1).toBe('hsl(180, 100%, 70%)');
    expect(theme.palette.primaryColour2).toBe('hsl(180, 100%, 60%)');
    expect(theme.palette.primaryColour3).toBe('hsl(180, 100%, 50%)');
    expect(theme.palette.primaryColour4).toBe('hsl(180, 100%, 40%)');
    expect(theme.palette.primaryColour5).toBe('hsl(180, 100%, 30%)');

    expect(theme.palette.secondaryColour1).toBe('hsl(0, 100%, 70%)');
    expect(theme.palette.secondaryColour2).toBe('hsl(0, 100%, 60%)');
    expect(theme.palette.secondaryColour3).toBe('hsl(0, 100%, 50%)');
    expect(theme.palette.secondaryColour4).toBe('hsl(0, 100%, 40%)');
    expect(theme.palette.secondaryColour5).toBe('hsl(0, 100%, 30%)');

    expect(theme.palette.danger).toBe('hsl(0, 100%, 50%)');
    expect(theme.palette.success).toBe('hsl(120, 100%, 50%)');
    expect(theme.palette.info).toBe('hsl(240, 100%, 50%)');
    expect(theme.palette.warning).toBe('hsl(60, 100%, 50%)');

    expect(theme.palette.white).toBe('hsl(0, 0%, 100%)');
    expect(theme.palette.grey1).toBe('hsl(0, 0%, 80%)');
    expect(theme.palette.grey2).toBe('hsl(0, 0%, 60%)');
    expect(theme.palette.grey3).toBe('hsl(0, 0%, 40%)');
    expect(theme.palette.grey4).toBe('hsl(0, 0%, 20%)');
    expect(theme.palette.black).toBe('hsl(0, 0%, 0%)');
  });
});
