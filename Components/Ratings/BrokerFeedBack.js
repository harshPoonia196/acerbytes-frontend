import { Avatar, Box, Card, Grid, IconButton, Rating, Typography } from '@mui/material'
import React from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import StarIcon from "@mui/icons-material/Star";
import CustomButton from 'Components/CommonLayouts/Loading/LoadingButton';
import moment from 'moment/moment';

const BrokerFeedBack = ({ review }) => {
    const getTime = (time) => {
        const startDate = new Date(time),
            diffDate = new Date(new Date() - startDate),
            years = diffDate.toISOString().slice(0, 4) - 1970,
            months = diffDate.getMonth(),
            days = diffDate.getDate() - 1
            
        return years ? `${years + (years > 1 ? ' years ago' : ' year ago')}` : months ? `${months + (months > 1 ? ' months ago' : ' month ago')}` : `${(days === 0 ? 'Today' : days + (days > 1 ? ' days ago' : ' day ago'))}`
    }

    return (
        <Grid item xs={12}>
            <Card sx={{ display: 'flex', gap: '0.5rem', p: 2 }}>
                <Box>
                    <Avatar
                        alt="Remy Sharp"
                        src={review?.profilePic?.[0]}
                    />
                </Box>
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography variant="h6">{review?.fullName ?? ''}</Typography>
                            <Typography variant="body2">{getTime(review?.createdAt)}</Typography>
                        </Box>
                        {/* <Box>
                            <CustomButton startIcon={<ThumbUpIcon />} ButtonText='Helpful?' />
                        </Box> */}
                    </Box>
                    {/* <Box sx={{ mt: 0.5 }}>
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
                    </Box> */}
                    <Grid container spacing={1} sx={{ p: 2 }}>

                        {review?.ratings?.map((rating) => {
                            return (
                                <Grid item xs={12} sm={4} key={rating?.type}>
                                    <Typography variant="h6">{rating?.type}</Typography>
                                    <Rating
                                        name="text-feedback"
                                        value={rating?.rating}
                                        readOnly
                                        precision={0.5}
                                        sx={{ fontSize: "1rem" }}
                                        emptyIcon={
                                            <StarIcon
                                                style={{ opacity: 0.55 }}
                                                fontSize="small"
                                                sx={{ fontSize: "1rem" }}
                                            />
                                        }
                                    />
                                </Grid>
                            );
                        })}
                        {review?.note ? (
                            <Grid item xs={12} sx={{ mt: 1 }}>
                                <Box sx={{ background: "whitesmoke", p: 2 }}>
                                    <Typography variant="caption">
                                        Review given
                                        {review?.createdAt
                                            ? moment(review?.createdAt).format(
                                                " on DD MMM, YYYY"
                                            )
                                            : ""}
                                    </Typography>
                                    <Typography variant="body2">
                                        <i>{review?.note}</i>
                                    </Typography>
                                </Box>
                            </Grid>
                        ) : null}
                    </Grid>

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
