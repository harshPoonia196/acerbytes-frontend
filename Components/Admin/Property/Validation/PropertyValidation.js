import Joi from 'joi';

export const Schema = Joi.object({
    overview: Joi.object().keys({
      builder: Joi.string().required(),
      projectName: Joi.string().required(),
      projectCategory: Joi.string().required(),
      projectType: Joi.array().items(Joi.string()).required(),
      phase: Joi.string().required(),
      launchYear: Joi.string().required(),
      completionYear: Joi.string().required(),
      status: Joi.string().required(),
      constructionProgress: Joi.string().required(),
    }),
    regulatoryClearance: Joi.object().keys({
      reraApproved: Joi.string().required(),
      reraNumber: Joi.string().required(),
      cc: Joi.string().required(),
      oc: Joi.string().required(),
      authorityRegistration: Joi.string().required(),
      governmentLoan: Joi.string().required(),
      privateBankLoan: Joi.string().required(),
      fresh: Joi.string().required(),
      resale: Joi.string().required(),
    }),
    layout: Joi.object().keys({
      numberOfBuildings: Joi.string().required(),
      layoutType: Joi.array().items(Joi.string()).required(),
      maxFloors: Joi.string().required(),
      minFloors: Joi.string().required(),
      totalUnits: Joi.string().required(),
      area: Joi.string().required(),
      greenArea: Joi.string().required(),
      unitDensity: Joi.string().required(),
      greenDensity: Joi.string().required(),
      constructionQuality: Joi.number().required(),
      interiorQuality: Joi.number().required(),
    }),
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