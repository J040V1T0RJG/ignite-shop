import { styled } from '@stitches/react'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'space-between',

  '.handbagBox': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0.75rem',
    gap: '0.75rem',
    cursor: 'pointer',

    width: '3rem',
    height: '3rem',

    backgroundColor: '$gray800',
    borderRadius: '6px',
  },
})
