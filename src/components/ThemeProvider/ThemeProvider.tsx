import React, { createContext, useContext, useMemo, ReactNode } from 'react';

export function adjustLightness(lightness: number, amount: number): number {
    return Math.max(0, Math.min(100, lightness + amount * 100));
}

export function generateHSLColor(h: number, s: number, l: number): string {
    return `hsl(${h}, ${s}%, ${l}%)`;
}

export function generateColorPalette(hue: number): ThemePalette {
    const baseSaturation = 100;
    const baseLightness = 50;
    
    const palette: ThemePalette = {
        primaryColour1: generateHSLColor(hue, baseSaturation, adjustLightness(baseLightness, 0.2)),
        primaryColour2: generateHSLColor(hue, baseSaturation, adjustLightness(baseLightness, 0.1)),
        primaryColour3: generateHSLColor(hue, baseSaturation, baseLightness),
        primaryColour4: generateHSLColor(hue, baseSaturation, adjustLightness(baseLightness, -0.1)),
        primaryColour5: generateHSLColor(hue, baseSaturation, adjustLightness(baseLightness, -0.2)),
        secondaryColour1: generateHSLColor((hue + 180) % 360, baseSaturation, adjustLightness(baseLightness, 0.2)),
        secondaryColour2: generateHSLColor((hue + 180) % 360, baseSaturation, adjustLightness(baseLightness, 0.1)),
        secondaryColour3: generateHSLColor((hue + 180) % 360, baseSaturation, baseLightness),
        secondaryColour4: generateHSLColor((hue + 180) % 360, baseSaturation, adjustLightness(baseLightness, -0.1)),
        secondaryColour5: generateHSLColor((hue + 180) % 360, baseSaturation, adjustLightness(baseLightness, -0.2)),
        danger: generateHSLColor(0, baseSaturation, baseLightness),
        success: generateHSLColor(120, baseSaturation, baseLightness),
        info: generateHSLColor(240, baseSaturation, baseLightness),
        warning: generateHSLColor(60, baseSaturation, baseLightness),
        white: generateHSLColor(0, 0, 100),
        grey1: generateHSLColor(0, 0, 80),
        grey2: generateHSLColor(0, 0, 60),
        grey3: generateHSLColor(0, 0, 40),
        grey4: generateHSLColor(0, 0, 20),
        black: generateHSLColor(0, 0, 0),
    };

    return palette;
}

export function generateTheme(hue:number): Theme {
    return {
        palette: generateColorPalette(hue)
    }
}

export type ThemePalette = {
    primaryColour1: string,
    primaryColour2: string,
    primaryColour3: string,
    primaryColour4: string,
    primaryColour5: string,
    secondaryColour1: string,
    secondaryColour2: string,
    secondaryColour3: string,
    secondaryColour4: string,
    secondaryColour5: string,
    danger: string,
    success: string,
    info: string,
    warning: string,
    white: string,
    grey1: string,
    grey2: string,
    grey3: string,
    grey4: string,
    black: string,
};

export type Theme = {
    palette: ThemePalette,
}

interface ThemeProviderProps {
    children: ReactNode;
    colour: number; // Assuming 'colour' is a hue value (0-360)
}

export const DEFAULT_THEME = generateColorPalette(60);

const ThemeContext = createContext<Theme | undefined>(undefined);

export const useTheme = (): Theme => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, colour }) => {
    const theme: Theme = useMemo(() => generateTheme(colour), [colour]);

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};
