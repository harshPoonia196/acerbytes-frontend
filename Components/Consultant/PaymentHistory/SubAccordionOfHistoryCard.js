import { Box, Typography } from '@mui/material';
import { CustomAccordion, CustomAccordionDetails, CustomAccordionSummary } from 'Components/CommonLayouts/CommonAccordion'
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React from 'react'
import colors from 'styles/theme/colors';
import { formatPoints, formatDate } from 'utills/CommonFunction';

function SubAccordionOfHistoryCard({ title, data = [], type = '', header }) {
    const [expanded, setExpanded] = React.useState(false);

    const router = useRouter()

    const handleChange = () => {
        setExpanded(!expanded);
    };

    const calculateConsumedPoints = (childTransaction = []) => {
        let totalConsumedPoints = 0;
        for (let i = 0; i < childTransaction.length; i++) {
            const { consumedPoints = 0 } = childTransaction[i];
            totalConsumedPoints = totalConsumedPoints + Number(consumedPoints);
        }
        return totalConsumedPoints;
    }


    const constructPropertyUrl = (propertyDetailsData) => {
        const overview = propertyDetailsData?.overview;
        const location = propertyDetailsData?.location;

        const projectCategory = encodeURIComponent(
            (overview?.projectCategory.trim() ?? "category")
                .replace(/\s+/g, "-")
                .replace(/\//g, "-")
        );
        let projectType;
        if (overview?.projectType?.length > 0) {
            projectType = overview.projectType
                .map((type) =>
                    encodeURIComponent(
                        type.value.trim().replace(/\s+/g, "-").replace(/\//g, "-")
                    )
                )
                .join("-");
        } else {
            projectType = "type";
        }
        const city = encodeURIComponent(
            (location?.city.trim() ?? "city").replace(/\s+/g, "-").replace(/\//g, "-")
        );
        const sector = encodeURIComponent(
            (location?.sector.trim() ?? "sector")
                .replace(/[\s,]+/g, "-")
                .replace(/\//g, "-")
        );
        const area = encodeURIComponent(
            (location?.area.trim() ?? "area")
                .replace(/[\s,]+/g, "-")
                .replace("-#", "")
                .replace(/\//g, "-")
        );
        const projectName = encodeURIComponent(
            (overview?.projectName.trim() ?? "projectName")
                .replace(/\s+/g, "-")
                .replace(/\//g, "-")
        );

        return `${projectCategory}-${projectType}-${city}-${sector}-${area}-${projectName}-${propertyDetailsData?.propertyId}`;
    };


    const handleLinkClick = (res) => {
        const url = constructPropertyUrl(res)
        router.push(`/details/${url}`)
    }

    const formatWithOrdinal = (date) => {
        return moment(date).format('Do MMMM, YYYY');
    };

    return (
        <CustomAccordion expanded={expanded} onChange={handleChange}>
            <CustomAccordionSummary>
                <Box sx={{ flex: 1, ml: 1 }}>
                    <Typography variant='subtitle2'>{title}</Typography>
                </Box>
                <Typography variant='subtitle2'>
                    {data.length + ' ' + `${data.length > 1 ? `${type}s` : type}`}, Consumed Points: {formatPoints(calculateConsumedPoints(data))}
                </Typography>
            </CustomAccordionSummary>
            <CustomAccordionDetails>
                {header}
                {data.map((res) => {
                    const { createdAt, consumedPoints, details } = res;
                    if (type === "Activation") {
                        return <Box sx={{ display: 'flex', pl: "18px" }}>
                            <Typography variant='subtitle2' sx={{ flex: 1, width: '33%' }}>{`${formatDate(createdAt)} (${details})`}</Typography>
                            <Typography variant='subtitle2' sx={{ flex: 1, width: '33%', cursor: 'pointer', color: colors.BLUE }} onClick={() => handleLinkClick(res)}>{res?.overview?.projectName}</Typography>
                            <Typography variant='subtitle2' sx={{ flex: 1, width: '33%', cursor: 'pointer' }}>
                                {`${formatWithOrdinal(res?.linkCreatedAt)} - ${formatWithOrdinal(res?.linkExpiredAt)}`}
                            </Typography>
                            {/* <Typography variant='subtitle2' sx={{ flex: 1 }}>{details + ' on ' + formatDate(createdAt)}</Typography> */}
                            <Typography variant='h6'>{formatPoints(consumedPoints)} Points</Typography>
                        </Box>
                    }
                    else if(type === "Lead"){
                        return <Box sx={{ display: 'flex', pl: "18px" }}>
                            <Typography variant='subtitle2' sx={{ flex: 1, width: '33%' }}>{`${formatDate(createdAt)} (${details})`}</Typography>
                            <Typography variant='subtitle2' sx={{ flex: 1, width: '33%', cursor: 'pointer', color: colors.BLUE }} onClick={() => handleLinkClick(res)}>{`${res?.leadUserName?.firstName} ${res?.leadUserName?.lastName}`}</Typography>
                            <Typography variant='h6'>{formatPoints(consumedPoints)} Points</Typography>
                        </Box>
                    }
                    else if(type === "Display on property subscriptions"){
                        return <Box sx={{ display: 'flex', pl: "18px" }}>
                        <Typography variant='subtitle2' sx={{ flex: 1, width: '33%' }}>{`${formatDate(createdAt)} (${details})`}</Typography>
                        <Typography variant='subtitle2' sx={{ flex: 1, width: '33%', cursor: 'pointer', color: colors.BLUE }} onClick={() => handleLinkClick(res)}>{res?.overview?.projectName}</Typography>
                        <Typography variant='subtitle2' sx={{ flex: 1, width: '33%', cursor: 'pointer' }}>
                                {`${formatWithOrdinal(res?.linkCreatedAt)} - ${formatWithOrdinal(res?.linkExpiredAt)}`}
                            </Typography>
                        <Typography variant='h6'>{formatPoints(consumedPoints)} Points</Typography>
                    </Box>
                    }
                }
                )
                }
            </CustomAccordionDetails>
        </CustomAccordion >
    )
}

export default SubAccordionOfHistoryCard