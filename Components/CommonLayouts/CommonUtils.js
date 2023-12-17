const listOfTabsInAddProperty = [{
    label: 'Overview',
    value: 'project'
}, {
    label: 'Regulatory clearance',
    value: 'regulatory'
}, {
    label: 'Layout',
    value: 'landscape'
}, {
    label: 'Units plan',
    value: 'floorplans'
}, {
    label: 'Amenities',
    value: 'facilities'
}, {
    label: 'Location',
    value: 'location'
}, {
    label: 'Resale price',
    value: 'resalePrice'
}, {
    label: 'Builder price',
    value: 'builderPrice'
}, {
    label: 'Construction',
    value: 'construction'
}, {
    label: 'Investment',
    value: 'investment'
},
// {
//     label: 'Bank',
//     value: 'bank'
// },
{
    label: 'Marketing',
    value: 'marketing'
}
]

const disablePersonalizeAdsOption = ['For this page', 'For 1 week', 'For 1 month', 'Disable (can enable later)']

const listOfProfileTab = [
    { label: 'User details', value: 'userDetails' },
    { label: 'Service details', value: 'serviceDetails' },
    { label: 'Interested cities', value: 'interestedCities' },
    { label: 'Budget', value: 'budget' },
    { label: 'Enquiries', value: 'enquiries' },
    { label: 'Property Consultants', value: 'propertyConsultants' },
    { label: 'Current address', value: 'currentAddress' },
    { label: 'Setting', value: 'setting' },
]


const listOfPropertyDetailsTab = [
    {
        label: 'Project',
        value: 'project'
    }, {
        label: 'Builder',
        value: 'builder'
    }, {
        label: 'Landscape',
        value: 'landscape'
    }, {
        label: 'Amenities',
        value: 'amenities'
    }, {
        label: 'Clearance',
        value: 'clearance'
    }, {
        label: 'Pricing',
        value: 'pricing'
    }, {
        label: 'Value for money',
        value: 'value'
    }, {
        label: 'Units',
        value: 'units'
    }, {
        label: 'Floor design',
        value: 'floordesign'
    }, {
        label: 'Floor area',
        value: 'floorarea'
    }, {
        label: 'Location',
        value: 'location'
    }, {
        label: 'Assesment',
        value: 'assesment'
    }
]


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export { listOfTabsInAddProperty, listOfProfileTab, disablePersonalizeAdsOption, listOfPropertyDetailsTab, descendingComparator, getComparator, stableSort }