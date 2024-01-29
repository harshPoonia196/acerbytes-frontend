import Joi from 'joi';


const overviewSchema = Joi.object({
  builder: Joi.string().required(),
  projectName: Joi.string().required(),
  projectCategory: Joi.string().required(),
  projectType: Joi.array().min(1).items(Joi.object({
    label: Joi.string().required(),
    value: Joi.string().required(),
  })).required(),
  phase: Joi.string().allow('').optional(),
  launchYear: Joi.string().allow(''),
  completionYear: Joi.string().min(1).required(),
  status: Joi.string().required(),
  constructionProgress: Joi.string().required(),
});

const layoutSchema = Joi.object({
  numberOfBuildings: Joi.number()
  .custom((value, helpers) => {
    const projectType = helpers.state.parent.overview.projectType;

    const isFlatSelected = projectType.some(option => option.label === 'Flat');
    if (isFlatSelected) {
      return helpers.error('layout.numberOfBuildings.custom');
    }

    return value;
  })
  .when(Joi.ref('...overview.projectType'), {
    is: Joi.array().items(
      Joi.object({
        label: Joi.string().valid('Flat').required(),
        value: Joi.string().valid('Flat').required(),
      })
    ).required(),
    then: Joi.number().allow('').optional(),
    otherwise: Joi.number().required(),
  }),
  layoutType: Joi.array()
  .when(Joi.ref('...overview.projectCategory'), {
    is: 
      Joi.string().valid('Commercial')
    ,
    then: Joi.array().allow(),
    otherwise: Joi.array().min(1).items(
      Joi.string()
    ).required(),
  }),
  maxFloors: Joi.number().max(34).required(),
  minFloors: Joi.number().min(24).required(),
  totalUnits: Joi.number().required(),
  area: Joi.string().required(),
  greenArea: Joi.string().allow('').optional(),
  unitDensity: Joi.string().required(),
  greenDensity: Joi.string().required(),
  constructionQuality: Joi.number().required(),
  interiorQuality: Joi.number().required(),
});


export const Schema = Joi.object({
    overview: overviewSchema,
    regulatoryClearance: Joi.object().keys({
      reraApproved: Joi.string().required(),
      reraNumber: Joi.string().when('reraApproved', {
        is: "Yes",
        then: Joi.string().required(),
        otherwise: Joi.string().allow('').optional(),
      }),
      cc: Joi.string().required(),
      oc: Joi.string().required(),
      authorityRegistration: Joi.string().required(),
      governmentLoan: Joi.string().required(),
      privateBankLoan: Joi.string().required(),
      fresh: Joi.string().required(),
      resale: Joi.string().required(),
    }),
    
    layout: layoutSchema,
    unitsPlan: Joi.array().items(
      Joi.object().keys({
        propertyType: Joi.string().required(),
        propertyLayout: Joi.string().required(),
        name: Joi.string().required(),
        areaUnit: Joi.string().required(),
        areaValue: Joi.string().required(),
        bsp: Joi.string().required(),
        applicableMonth: Joi.string().required(),
        applicableYear: Joi.string().required(),
      })
    ),
    amenitiesData: Joi.object().keys({
      Basic: Joi.object().pattern(/./, Joi.object().keys({
        isApplicable: Joi.boolean().required(),
        rating: Joi.number().required(),
      })),
      Expected: Joi.object().pattern(/./, Joi.object().keys({
        isApplicable: Joi.boolean().required(),
        rating: Joi.number().required(),
      })),
      Desired: Joi.object().pattern(/./, Joi.object().keys({
        isApplicable: Joi.boolean().required(),
        rating: Joi.number().required(),
      })),
      Unique: Joi.object().pattern(/./, Joi.object().keys({
        isApplicable: Joi.boolean().required(),
        rating: Joi.number().required(),
      })),
    }),
    location: Joi.object().keys({
      state: Joi.string().required(),
      city: Joi.string().required(),
      sector: Joi.string().required(),
      area: Joi.string().required(),
      pinCode: Joi.string().required(),
      googleMapLink: Joi.string().required(),
      longitude: Joi.string().required(),
      latitude: Joi.string().required(),
    }),
    valueForMoney: Joi.object().keys({
      appTillNow: Joi.number().required(),
      expectedFurtherApp: Joi.number().required(),
      forEndUse: Joi.number().required(),
    }),
    consultants: Joi.array().items(
      Joi.object().keys({
        id: Joi.string().required(),
        name: Joi.string().required(),
        profilePic: Joi.string().required(),
        rating: Joi.number().required(),
        ratingTag: Joi.string().required(),
        clientsServed: Joi.number().required(),
        number: Joi.string().required(),
      })
    ),
    marketing: Joi.object().keys({
      tagLine: Joi.string().required(),
      description: Joi.string().required(),
    }),
  })