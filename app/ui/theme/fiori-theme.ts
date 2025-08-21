// SAP Fiori 3 Theme Configuration
// This file contains the design tokens and theme configuration for SAP Fiori 3

export const fioriTheme = {
  // SAP Fiori 3 Color Palette
  colors: {
    // Primary Colors
    sapBrandColor: '#0070f3', // SAP Blue
    sapHighlightColor: '#0070f3',
    sapBaseColor: '#ffffff',
    sapShellColor: '#354a5f',
    
    // Semantic Colors
    sapPositiveColor: '#30914c',
    sapNegativeColor: '#bb0000',
    sapCriticalColor: '#e76500',
    sapNeutralColor: '#6a6d70',
    sapInformationColor: '#0070f3',
    
    // Background Colors
    sapBackgroundColor: '#fafafa',
    sapShellBackgroundColor: '#354a5f',
    sapTileBackgroundColor: '#ffffff',
    sapListBackgroundColor: '#ffffff',
    
    // Text Colors
    sapTextColor: '#32363a',
    sapLinkColor: '#0070f3',
    sapCompanyLogo: '#000000',
    sapTitleColor: '#32363a',
    sapNegativeTextColor: '#bb0000',
    sapPositiveTextColor: '#30914c',
    sapCriticalTextColor: '#e76500',
    sapNeutralTextColor: '#6a6d70',
    
    // Border Colors
    sapList_BorderColor: '#e5e5e5',
    sapList_TableGroupHeaderBorderColor: '#d9d9d9',
    sapList_FooterBackground: '#fafafa',
    
    // Button Colors
    sapButton_Background: '#ffffff',
    sapButton_BorderColor: '#0070f3',
    sapButton_TextColor: '#0070f3',
    sapButton_Hover_Background: '#ebf8ff',
    sapButton_Active_Background: '#0070f3',
    sapButton_Active_TextColor: '#ffffff',
    
    // Emphasized Button
    sapButton_Emphasized_Background: '#0070f3',
    sapButton_Emphasized_BorderColor: '#0070f3',
    sapButton_Emphasized_TextColor: '#ffffff',
    sapButton_Emphasized_Hover_Background: '#0040b0',
    
    // Input Field Colors
    sapField_Background: '#ffffff',
    sapField_BorderColor: '#89919a',
    sapField_HelpBackground: '#ffffff',
    sapField_Hover_Background: '#f7f7f7',
    sapField_Focus_Background: '#ffffff',
    sapField_Focus_BorderColor: '#0070f3',
    sapField_InvalidColor: '#bb0000',
    sapField_InvalidBackground: '#ffffff',
    sapField_WarningColor: '#e76500',
    sapField_WarningBackground: '#ffffff',
    sapField_SuccessColor: '#30914c',
    sapField_SuccessBackground: '#ffffff',
    
    // Selection Colors
    sapSelectedColor: '#0070f3',
    sapActiveColor: '#0070f3',
    sapHoverColor: '#ebf8ff',
  },
  
  // Typography
  typography: {
    fontFamily: '"72", "72full", Arial, Helvetica, sans-serif',
    fontSize: {
      small: '0.75rem',    // 12px
      medium: '0.875rem',  // 14px
      large: '1rem',       // 16px
      xlarge: '1.125rem',  // 18px
      xxlarge: '1.25rem',  // 20px
      xxxlarge: '1.5rem',  // 24px
    },
    fontWeight: {
      normal: '400',
      medium: '600',
      bold: '700',
    },
    lineHeight: {
      normal: '1.4',
      medium: '1.5',
      large: '1.6',
    },
  },
  
  // Spacing
  spacing: {
    tiny: '0.25rem',     // 4px
    small: '0.5rem',     // 8px
    medium: '1rem',      // 16px
    large: '1.5rem',     // 24px
    xlarge: '2rem',      // 32px
    xxlarge: '3rem',     // 48px
  },
  
  // Border Radius
  borderRadius: {
    small: '0.25rem',    // 4px
    medium: '0.375rem',  // 6px
    large: '0.5rem',     // 8px
  },
  
  // Shadows
  shadows: {
    level0: 'none',
    level1: '0 0.125rem 0.5rem 0 rgba(0, 0, 0, 0.1)',
    level2: '0 0.625rem 2rem 0 rgba(0, 0, 0, 0.1)',
    level3: '0 1.25rem 5rem 0 rgba(0, 0, 0, 0.1)',
  },
  
  // Z-Index
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
  
  // Component Specific
  components: {
    card: {
      backgroundColor: '#ffffff',
      borderColor: '#e5e5e5',
      borderRadius: '0.5rem',
      padding: '1rem',
      shadow: '0 0.125rem 0.5rem 0 rgba(0, 0, 0, 0.1)',
    },
    table: {
      headerBackground: '#fafafa',
      rowHoverBackground: '#f7f7f7',
      borderColor: '#e5e5e5',
    },
    navigation: {
      backgroundColor: '#354a5f',
      textColor: '#ffffff',
      activeColor: '#0070f3',
      hoverBackground: 'rgba(255, 255, 255, 0.1)',
    },
  },
};

// CSS Custom Properties for SAP Fiori 3
export const fioriCSSVariables = `
  :root {
    /* Colors */
    --sap-brand-color: ${fioriTheme.colors.sapBrandColor};
    --sap-highlight-color: ${fioriTheme.colors.sapHighlightColor};
    --sap-base-color: ${fioriTheme.colors.sapBaseColor};
    --sap-shell-color: ${fioriTheme.colors.sapShellColor};
    
    /* Semantic Colors */
    --sap-positive-color: ${fioriTheme.colors.sapPositiveColor};
    --sap-negative-color: ${fioriTheme.colors.sapNegativeColor};
    --sap-critical-color: ${fioriTheme.colors.sapCriticalColor};
    --sap-neutral-color: ${fioriTheme.colors.sapNeutralColor};
    --sap-information-color: ${fioriTheme.colors.sapInformationColor};
    
    /* Background Colors */
    --sap-background-color: ${fioriTheme.colors.sapBackgroundColor};
    --sap-shell-background-color: ${fioriTheme.colors.sapShellBackgroundColor};
    --sap-tile-background-color: ${fioriTheme.colors.sapTileBackgroundColor};
    
    /* Text Colors */
    --sap-text-color: ${fioriTheme.colors.sapTextColor};
    --sap-link-color: ${fioriTheme.colors.sapLinkColor};
    --sap-title-color: ${fioriTheme.colors.sapTitleColor};
    
    /* Typography */
    --sap-font-family: ${fioriTheme.typography.fontFamily};
    --sap-font-size-medium: ${fioriTheme.typography.fontSize.medium};
    --sap-font-size-large: ${fioriTheme.typography.fontSize.large};
    
    /* Spacing */
    --sap-spacing-small: ${fioriTheme.spacing.small};
    --sap-spacing-medium: ${fioriTheme.spacing.medium};
    --sap-spacing-large: ${fioriTheme.spacing.large};
    
    /* Border Radius */
    --sap-border-radius-medium: ${fioriTheme.borderRadius.medium};
    
    /* Shadows */
    --sap-shadow-level1: ${fioriTheme.shadows.level1};
    --sap-shadow-level2: ${fioriTheme.shadows.level2};
  }
`;

export default fioriTheme;
