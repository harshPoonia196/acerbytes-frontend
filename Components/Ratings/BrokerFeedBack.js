import { Avatar, Box, Card, Grid, IconButton, Rating, Typography } from '@mui/material'
import React from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import StarIcon from "@mui/icons-material/Star";
import CustomButton from 'Components/CommonLayouts/Loading/LoadingButton';

const BrokerFeedBack = ({ review }) => {
    const getTime = (time) => {
        const startDate = new Date(time),
            diffDate = new Date(new Date() - startDate),
            years = diffDate.toISOString().slice(0, 4) - 1970,
            months = diffDate.getMonth(),
            days = diffDate.getDate() - 1
        return years ? `${years + (years > 1 ? ' years' : ' years')}` : months ? `${months + (months > 1 ? ' months' : ' month')}` : `${(days === 0 ? 'Today' : days + days > 1 ? ' days' : ' day')}`
    }

    return (
        <Grid item xs={12}>
            <Card sx={{ display: 'flex', gap: '0.5rem', p: 2 }}>
                <Box>
                    <Avatar
                        alt="Remy Sharp"
                        src={review?.profilePic}
                    />
                </Box>
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography variant="h6">{review?.fullName ?? ''}</Typography>
                            <Typography variant="body2">{getTime(review?.updatedAt)}</Typography>
                        </Box>
                        {/* <Box>
                            <CustomButton startIcon={<ThumbUpIcon />} ButtonText='Helpful?' />
                        </Box> */}
                    </Box>
                    <Box sx={{ mt: 0.5 }}>
                        <Rating
                            readOnly
                            size="small"
                            name="hover-feedback"
                            precision={0.5}
                            sx={{ fontSize: '0.875rem' }}
                            value={review?.overallRating ?? 0}
                        />
                        <Typography variant="p" sx={{ ml: 0.5 }}>
                            {review?.note}
                        </Typography>
                    </Box>

                    {/* <Card sx={{ borderLeft: '2px solid gray', mt: '0.5rem', p: 2 }}>
                        <Typography variant="h6">Response from Anand <Typography sx={{ fontWeight: 300, display: 'inline' }} variant="body2">a month ago</Typography></Typography>
                        <Typography variant="body2" sx={{}}>
                            Let nam vitae possimus dignissimos recusandae esse. Aperiam, quia!
                        </Typography>
                    </Card> */}
                </Box>
            </Card>
        </Grid>
    )
}

export default BrokerFeedBack
