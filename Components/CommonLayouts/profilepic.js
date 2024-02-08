import styled from "@emotion/styled";
export const ProfilePic = styled('div')({
    position: 'relative',
    borderRadius: '50%',
    overflow: 'hidden',
    backgroundColor: 'whitesmoke',
    cursor: 'pointer',
  
    '&:hover .profilepic__content': {
      opacity: 1,
    },
  
    '&:hover .profilepic__image': {
      opacity: 0.5,
    },
  
    '.profilepic__image': {
      objectFit: 'cover',
      opacity: 1,
      transition: 'opacity 0.2s ease-in-out',
    },
  
    '.profilepic__content': {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'black',
      opacity: 0,
      transition: 'opacity 0.2s ease-in-out',
      backgroundColor: 'gainsboro',
    },
  
    '.profilepic__text': {
      textTransform: 'uppercase',
      fontSize: '12px',
      textAlign: 'center',
      margin: 0,
    },
  });