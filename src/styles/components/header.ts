import { styled } from '@stitches/react'

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',

  button: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0.75rem',
    gap: '0.75rem',
    cursor: 'pointer',
    border: 'none',

    width: '3rem',
    height: '3rem',

    backgroundColor: '$gray800',
    borderRadius: '6px',

    '.cartProductCountCicle': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0.125rem',

      position: 'absolute',
      minWidth: '1.5rem',
      minHeight: '1.5rem',
      right: '-0.5rem',
      top: '-0.5rem',

      background: '$green500',
      color: 'white',

      border: '3px solid $gray900',
      borderRadius: '100%',
    },

    '&:hover': {
      '.cartProductCount': {
        background: '$green300',
      },
    },
  },
})
