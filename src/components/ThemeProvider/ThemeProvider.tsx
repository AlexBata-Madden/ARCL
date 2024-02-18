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
    
    const primaryColour1 = generateHSLColor(hue, baseSaturation, adjustLightness(baseLightness, 0.2));
    const primaryColour2 = generateHSLColor(hue, baseSaturation, adjustLightness(baseLightness, 0.1));
    const primaryColour3 = generateHSLColor(hue, baseSaturation, baseLightness);
    const primaryColour4 = generateHSLColor(hue, baseSaturation, adjustLightness(baseLightness, -0.1));
    const primaryColour5 = generateHSLColor(hue, baseSaturation, adjustLightness(baseLightness, -0.2));

    const complementaryHue = (hue + 180) % 360;
    const secondaryColour1 = generateHSLColor(complementaryHue, baseSaturation, adjustLightness(baseLightness, 0.2));
    const secondaryColour2 = generateHSLColor(complementaryHue, baseSaturation, adjustLightness(baseLightness, 0.1));
    const secondaryColour3 = generateHSLColor(complementaryHue, baseSaturation, baseLightness);
    const secondaryColour4 = generateHSLColor(complementaryHue, baseSaturation, adjustLightness(baseLightness, -0.1));
    const secondaryColour5 = generateHSLColor(complementaryHue, baseSaturation, adjustLightness(baseLightness, -0.2));

    const danger = generateHSLColor(0, baseSaturation, baseLightness);
    const success = generateHSLColor(120, baseSaturation, baseLightness);
    const info = generateHSLColor(240, baseSaturation, baseLightness);
    const warning = generateHSLColor(60, baseSaturation, baseLightness);

    const white = generateHSLColor(0, 0, 100);
    const grey1 = generateHSLColor(0, 0, 80);
    const grey2 = generateHSLColor(0, 0, 60);
    const grey3 = generateHSLColor(0, 0, 40);
    const grey4 = generateHSLColor(0, 0, 20);
    const black = generateHSLColor(0, 0, 0);

    return {
        primaryColour1,
        primaryColour2,
        primaryColour3,
        primaryColour4,
        primaryColour5,
        secondaryColour1,
        secondaryColour2,
        secondaryColour3,
        secondaryColour4,
        secondaryColour5,
        danger,
        success,
        info,
        warning,
        white,
        grey1,
        grey2,
        grey3,
        grey4,
        black,
    };
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

interface ThemeProviderProps {
    children: ReactNode;
    colour: number; // Assuming 'colour' is a hue value (0-360)
}

export const DEFAULT_THEME = generateColorPalette(60);

const ThemeContext = createContext<ThemePalette | undefined>(undefined);

export const useTheme = (): ThemePalette => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, colour }) => {
    const palette: ThemePalette = useMemo(() => generateColorPalette(colour), [colour]);

    return (
        <ThemeContext.Provider value={palette}>
            {children}
        </ThemeContext.Provider>
    );
};
