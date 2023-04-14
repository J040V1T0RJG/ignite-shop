import { styled } from '@stitches/react'
import * as Dialog from '@radix-ui/react-dialog'

export const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.75)',
})

export const Content = styled(Dialog.Content, {
  minWidth: '30rem',
  height: '100%',

  borderRadius: '6px',
  paddingTop: '4.5rem',
  paddingBottom: '3rem',
  paddingRight: '3rem',
  paddingLeft: '3rem',

  backgroundColor: '$gray800',

  position: 'fixed',
  top: 0,
  right: 0,

  footer: {
    position: 'absolute',
    width: 'calc(100% - 6rem)',
    bottom: '3rem',

    '.secondaryGeneralSummary': {
      display: 'flex',
      justifyContent: 'space-between',

      p: {
        fontWeight: 400,
        fontSize: '$md',
        lineHeight: '160%',

        color: '$gray100',
      },
    },
    '.primaryGeneralSummary': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',

      p: {
        fontWeight: 700,
        fontSize: '$lg',
        lineHeight: '160%',

        color: '$gray100',

        strong: {
          fontSize: '$xl',
        },
      },
    },

    button: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      width: '100%',
      height: '69px',
      padding: '20px 32px',
      gap: '10px',

      background: '$green500',
      borderRadius: '8px',
      border: 'none',
      marginTop: '3.5rem',
      cursor: 'pointer',

      p: {
        fontWeight: '700',
        fontSize: '$md',
        lineHeight: '160%',

        color: '$white',
      },

      '&:not(:disabled):hover': {
        backgroundColor: '$green300',
      },

      '&:disabled': {
        cursor: 'not-allowed',
      },
    },
  },
})

export const CloseButton = styled(Dialog.Close, {
  position: 'absolute',
  background: 'transparent',

  border: 0,
  top: '1.5rem',
  right: '1.5rem',
  lineHeight: 0,
  cursor: 'pointer',
  color: '$gray500',
})

export const ClothingParts = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  gap: '1.5rem',
  marginTop: '2rem',
  maxHeight: '38rem',

  '.pieceOfClothing': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1.25rem',

    '.productImageBackground': {
      background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
      borderRadius: 8,
    },

    '.infoSummary': {
      width: '100%',

      span: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: '100%',

        '.incrementAndDecrement': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: '0.5rem',

          button: {
            color: '$green500',
            cursor: 'pointer',

            '&:hover': {
              color: '$green300',
            },
          },
        },

        button: {
          fontFamily: 'Roboto',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '$md',
          lineHeight: '160%',
          background: 'transparent',
          border: 'none',

          p: {
            color: '$green500',
            cursor: 'pointer',
          },

          '&:hover': {
            p: {
              color: '$green300',
            },
          },
        },
      },

      p: {
        fontWeight: 400,
        fontSize: '$md',
        lineHeight: '160%',

        color: '$gray300',
        alignSelf: 'stretch',
      },
    },
  },
})
