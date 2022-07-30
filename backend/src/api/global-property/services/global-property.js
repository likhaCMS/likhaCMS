'use strict';

/**
 * global-property service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::global-property.global-property');
