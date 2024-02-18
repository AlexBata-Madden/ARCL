import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, useTheme } from './ThemeProvider'; // Adjust the import path as necessary

const meta: Meta<typeof ThemeProvider> = {
  title: 'ThemeProvider',
  component: ThemeProvider,
  argTypes: {
    colour: {},
  },
};

export default meta;

export const Default: StoryObj<typeof ThemeProvider> = {
  args: {
    colour: 240,
  },
  render: (args) => {
    const { colour } = args;

    const ColorDisplay: React.FC = () => {
      const theme = useTheme();

      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {Object.entries(theme.palette).map(([colorName, colorValue]) => (
            <div
              key={colorName}
              style={{
                backgroundColor: colorValue,
                padding: '20px',
                margin: '5px',
                borderRadius: '5px',
                width: '150px',
                textAlign: 'center',
              }}
            >
            </div>
          ))}
        </div>
      );
    };

    return (
      <ThemeProvider colour={colour}>
        <ColorDisplay />
      </ThemeProvider>
    );
  },
};
