
import  Box  from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import TextField from "@mui/material/TextField";

import Divider from '@mui/material/Divider';


import styled from 'styled-components';

const TopContainer = styled(Box)`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ApartmentProfile = styled(Card)`
  flex-basis: 360px;
  padding: 10px;

`;
const BottomContainer = styled(Box)`

`;

const ApartmentPictureWrapper = styled(Card)`
  padding: 10px;
  display: flex;
  flex:1;
`;


const ApartmentWrapper = styled(Box)`
display: flex;
padding-top: 1rem;
`;

const LeftContainer = styled(Box)`
  flex: 1;
`;
const SubWayContainer = styled(Box)`
flex-basis: 350px;
padding: 10px;
`;

const StatusBadge = styled(Typography)` 
    background-color: #1674d1; 
    padding: 6px 12px; 
    border-radius: 20px;
    color: #fff;
    cursor: pointer;
`;

export const ApartmentDetailComponent=()=>{
  return (
    <div>
      <ApartmentWrapper>
  <LeftContainer >
      <TopContainer>
        <ApartmentProfile>
        <Typography sx={{ fontSize: 18, fontWeight: 'bold' }} gutterBottom>
            Квартира #1
          </Typography>
          <Box style={{display:'flex'}}>
            <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} gutterBottom>Название:&nbsp;</Typography> 
            <Typography> Шукинская набережная дом 9</Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} gutterBottom >Описание:</Typography>
            <TextField
          id="outlined-multiline-static"
          multiline
          rows={5}
          sx={{width:'100%'}}
          defaultValue="Default Value"
          value={'Хорошая квартира, двухкомнатная рядом с метро хорошие соседи, не пьют не курят, не ругаются матом знают все песни Доры'}
/>
      </Box>
          <Box style={{display:'flex'}}>
          <Typography sx={{ fontSize: 16, fontWeight: 'bold' }} gutterBottom>Цена в обычные дни: &nbsp;</Typography>
          <Typography>3800</Typography>
          </Box>
        </ApartmentProfile>
        <ApartmentPictureWrapper>
          <Typography  sx={{ fontSize: 18, fontWeight: 'bold' }}>Фотографии</Typography>
          {/* TODO: список фотографий */}
          <Box></Box>
          <Box></Box>
          <Box></Box>
        </ApartmentPictureWrapper>
      </TopContainer>
    <BottomContainer>
      {/* Характеристики */}
        <Card>
          <CardContent>
          <Typography  sx={{ fontSize: 18, fontWeight: 'bold' }}>
                Характеристики
              </Typography>
              <Divider style={{ marginBottom: '1rem' }} />
            <Box style={{display:'flex', alignItems:'center'}} >
             <Box><Typography>Наличие санузла </Typography></Box>
             <Box>
               <Checkbox/>
             </Box>
            </Box>
            <Box style={{display:'flex', alignItems:'center', gap: '0.5rem'}}>
              <Box>
              <Typography>Что можно делать </Typography>
              </Box>
              <Box style={{display:'flex', gap:'1rem'}}>
              <StatusBadge>Смотреть тв</StatusBadge> 
              <StatusBadge>играть в приставку</StatusBadge> 
              <StatusBadge>кушать чипсы</StatusBadge>
              </Box>
            </Box>
          </CardContent>
        </Card>
    </BottomContainer>
  </LeftContainer>
  <SubWayContainer>
    <Typography>Ближайшие метро</Typography>
    <Box>
    
    </Box>
  </SubWayContainer>
  </ApartmentWrapper>
  </div>
  );
}

/**
 * 
 */